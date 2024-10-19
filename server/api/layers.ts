import type { LayerFeature, TileData } from '~~/types/layers'
import type { MapViewport, Markers } from '~~/types/map'
import type { Database } from '~~/types/supabase'
import type { FeatureCollection, Point } from 'geojson'
import type { H3Event } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { feature, geometry } from '@turf/turf'
import { MapViewportSchema } from '~~/lib/schemas'
import { createError } from 'h3'
import { safeParse } from 'valibot'

// TODO Rename compute to cluster

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export default defineEventHandler(async (event) => {
  const { output: mapViewport, issues, success } = await getValidatedQuery(event, query => safeParse(MapViewportSchema, query))
  if (!success || !mapViewport)
    throw createError({ statusCode: 400, message: 'Invalid path parameters', cause: JSON.stringify(issues) })

  const { nelat, nelng, swlat, swlng, zoom } = mapViewport

  const kv = hubKV()

  const tiles = await getTiles(kv, swlng, nelng, nelat, swlat, zoom)
  const missingTiles = tiles.filter(tile => !tile.data)

  if (missingTiles.length === 0)
    return { type: 'FeatureCollection', features: tiles.flatMap(tile => tile.data!.features) } as FeatureCollection

  const layerData = await fetchLayerData(event, { boundingBox: { nelat, nelng, swlat, swlng }, zoom })
  await Promise.all(missingTiles.map(tile => kv.set(tile.key, JSON.stringify(layerData), { ttl: CACHE_DURATION })))
  return layerData
})

async function getTiles(kv: ReturnType<typeof hubKV>, swlng: number, nelng: number, nelat: number, swlat: number, zoom: number): Promise<TileData[]> {
  const minX = lonToTileX(swlng, zoom)
  const maxX = lonToTileX(nelng, zoom)
  const minY = latToTileY(nelat, zoom)
  const maxY = latToTileY(swlat, zoom)

  const tilePromises: Promise<TileData>[] = []

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++)
      tilePromises.push(getTile(kv, x, y, zoom))
  }

  return Promise.all(tilePromises)
}

async function getTile(kv: ReturnType<typeof hubKV>, x: number, y: number, zoom: number): Promise<TileData> {
  const key = `tile:${x}:${y}:${zoom}` as const
  const data = await kv.get(key)
  return { key, data: data ? JSON.parse(data as string) as LayerFeature : undefined }
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

function lonToTileX(lon: number, zoom: number): number {
  return Math.floor((lon + 180) / 360 * 2 ** zoom)
}

function latToTileY(lat: number, zoom: number): number {
  const latRad = lat * Math.PI / 180
  return Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * 2 ** zoom)
}
