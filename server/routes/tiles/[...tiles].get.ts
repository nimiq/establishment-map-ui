import type { LayerFeature } from '~~/types/layers'
import type { MapViewport, Markers } from '~~/types/map'
import type { Database } from '~~/types/supabase'
import type { Point } from 'geojson'
import type { H3Event } from 'h3'
import { Buffer } from 'node:buffer'
import { serverSupabaseClient } from '#supabase/server'
import { feature, geometry } from '@turf/turf'
import geobuf from 'geobuf'
import { createError } from 'h3'
import Pbf from 'pbf'
import { object, pipe, rawTransform, safeParse, string } from 'valibot'

const PathSchema = object({
  tiles: pipe(
    string(),
    rawTransform(({ dataset: str, addIssue }) => {
      const [z, x, y] = str.value.split('/').map(Number)
      if (z === undefined || x === undefined || y === undefined || Number.isNaN(z) || Number.isNaN(x) || Number.isNaN(y))
        return addIssue({ expected: 'z/x/y as numbers' })
      return { z, x, y }
    }),
  ),
})

export default defineEventHandler(async (event) => {
  const { output: coords, issues, success } = await getValidatedRouterParams(event, query => safeParse(PathSchema, query))
  if (!success || !coords)
    throw createError({ statusCode: 400, message: 'Invalid query parameters', cause: JSON.stringify(issues) })

  const { x, y, z } = coords.tiles!

  const key = `tile:${z}:${x}:${y}` as const
  const kv = hubKV()

  let pbfBuffer: Buffer

  if (await kv.has(key)) {
    const base64String = await kv.get(key) as string
    pbfBuffer = Buffer.from(base64String, 'base64')
  }
  else {
    const [nelng, swlat, swlng, nelat] = tileToBBox(x, y, z)
    const featureCollection = await fetchLayerData(event, { boundingBox: { nelat, nelng, swlat, swlng }, zoom: z })
    pbfBuffer = Buffer.from(geobuf.encode(featureCollection, new (Pbf as any)()))
    await kv.set(key, pbfBuffer.toString('base64'))
  }

  console.log('------------')
  console.log(pbfBuffer.toString('base64'))
  console.log('------------')
  setHeader(event, 'Content-Type', 'application/x-protobuf')
  return pbfBuffer
})

function tileToBBox(x: number, y: number, z: number): [number, number, number, number] {
  const n = Math.PI - 2 * Math.PI * y / 2 ** z
  const west = x / 2 ** z * 360 - 180
  const north = (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))))
  const east = (x + 1) / 2 ** z * 360 - 180
  const south = (180 / Math.PI * Math.atan(0.5 * (Math.exp(n - 2 * Math.PI / 2 ** z) - Math.exp(-n + 2 * Math.PI / 2 ** z))))
  return [west, south, east, north]
}

async function fetchLayerData(event: H3Event, { boundingBox, zoom }: MapViewport): Promise<LayerFeature> {
  // Get the markers from the database
  const supabase = await serverSupabaseClient<Database>(event)
  const { data: markers, error } = await supabase.rpc('get_markers', { ...boundingBox, zoom_level: zoom }) as { data: Markers | null, error: any }
  if (error || !markers)
    throw createError({ statusCode: 500, message: 'Failed to fetch data', cause: error?.message || 'Unknown error' })

  // Convert the markers to GeoJSON features
  const singlesFeatures = markers.singles.map(({ lat, lng, name }) => feature(geometry('Point', [lng, lat]) as Point, { kind: 'single', name } as const))
  const clustersFeatures = markers.clusters.map(({ lat, lng, ...properties }) => feature(geometry('Point', [lng, lat]) as Point, { kind: 'cluster', ...properties } as const))
  return { type: 'FeatureCollection', features: [...singlesFeatures, ...clustersFeatures] }
}
