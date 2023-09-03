/* eslint-disable no-console */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Supercluster from 'https://esm.sh/supercluster'
import type { AnyProps } from 'https://esm.sh/supercluster'
import { load } from 'https://deno.land/std/dotenv/mod.ts'

const env = await load()

const dbUrl = env.DB_URL
const apiKey = env.DB_AUTH_KEY || ''

if (!dbUrl) {
  console.error(
    'Error Fetch Auth Token. `DB_URL` not set. Please set it in your environment variables.',
  )
  Deno.exit(1)
}
if (!apiKey) {
  console.error(
    'Error Fetch Auth Token. `DB_AUTH_KEY` not set. Please set it in your environment variables.',
  )
  Deno.exit(1)
}

const supabase = createClient(dbUrl, apiKey)

interface Location {
  uuid: string
  geo_location: {
    type: string
    coordinates: [number, number]
  }
}

// Get all establishments from db
const { data, error: getError } = await supabase.rpc('get_all_locations')

if (getError) {
  console.error(getError)
  Deno.exit(1)
}
else {
  console.log(`Downloaded ${data.length} locations`)
}

const locations = data as Location[]

// Converts the lat,long to geometry. This is the format that supercluster expects
function locationToPoint(
  location: Location,
): Supercluster.PointFeature<AnyProps> {
  return {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: location.geo_location.coordinates },
    properties: { location },
  }
}

const BASE_RADIUS = 140
const DECAY_FACTOR = 1.05
const minZoom = Number(env.MIN_ZOOM) || 3
const maxZoom = Number(env.MAX_ZOOM) || 14
const computedClusters: {
  zoom: number
  clusters: (
    | Supercluster.PointFeature<Supercluster.AnyProps>
    | Supercluster.ClusterFeature<Supercluster.AnyProps>
  )[]
}[] = []

// Compute clusters for each zoom level
for (let zoom = minZoom; zoom <= maxZoom; zoom++) {
  const clusterAlgorithm = new Supercluster({
    radius: BASE_RADIUS / DECAY_FACTOR ** zoom,
  })

  clusterAlgorithm.load(locations.map(locationToPoint))

  // Get clusters for the whole world
  const clusters = clusterAlgorithm.getClusters([-180, -90, 180, 90], zoom)
  console.log(`Computed ${clusters.length} clusters at zoom level ${zoom}`)
  computedClusters.push({ zoom, clusters })
}

// Save clusters to database
/**
 * Format:
 * {
 *  zoom: number;
 *  geo_location: geography;
 *  count: number;
 *  location_uuid: string | null;
 * }
 */

const clustersToSave = computedClusters.map(({ zoom, clusters }) => {
  return clusters.map((cluster) => {
    if (cluster.properties.cluster) {
      return {
        zoom,
        geo_location: cluster.geometry,
        count: cluster.properties.point_count,
        location_uuid: null,
      }
    }
    else {
      return {
        zoom,
        geo_location: cluster.geometry,
        count: 1,
        location_uuid: cluster.properties.location.uuid,
      }
    }
  })
})

const flattenedClusters = clustersToSave.flat()
console.log(`Saving ${flattenedClusters.length} clusters to database`)

// Save clusters to database
// TODO

// const { error: insertError } = await supabase
//   .from("clusters")
//   .insert(flattenedClusters);

// if (insertError) {
//   console.error(insertError);
//   Deno.exit(1);
// } else {
//   console.log("Successfully saved clusters to database");
// }
