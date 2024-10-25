<script setup lang="ts">
import type { Database } from '~~/types/supabase'

// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer'
import { addProtocol, type CircleLayerSpecification, LngLat } from 'maplibre-gl'

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh'
const center = new LngLat(-1.559482, 47.21322)
const zoom = 4

const client = useSupabaseClient<Database>()

const sourceId = 'markers'
addProtocol(sourceId, async (params: { url: string }) => {
  const re = /markers:\/\/(?<bucket>.+)\/(?<z>\d+)\/(?<x>\d+)\/(?<y>\d+)/
  const match = params.url.match(re)
  if (!match || !match.groups)
    throw new Error('Invalid tile URL format')

  const { x, y, z } = match.groups
  const { data, error } = await client.rpc('mvt', { x: Number(x), y: Number(y), z: Number(z) })
  if (error || !data)
    throw new Error(`Tile fetch error: ${error}`)
  return { data: Buffer.from(data, 'base64') }
  // The server return a base64 encoded string
  // const data = await $fetch(`/tiles/${z}/${x}/${y}`, { responseType: 'arrayBuffer' })
  // return { data }
})

const { url, key } = useRuntimeConfig().public.supabase
// const tiles = [`${url}/rest/v1/rpc/mvt?apikey=${key}&x={x}&y={y}&z={z}`]

const librariesLayerCirclesPaint = {
  'circle-radius': [
    'interpolate',
    ['linear'],
    ['get', 'count'],
    1,
    5,
    10,
    10,
    100,
    20,
  ],
  'circle-color': [
    'step',
    ['get', 'count'],
    '#1b5e20', // count <= 10
    10,
    '#f57f17', // count > 10
    100,
    '#b71c1c', // count > 100
  ],
  'circle-stroke-width': 1,
  'circle-stroke-color': '#ffffff',
} as CircleLayerSpecification['paint']

const a = {
  version: 8,
  glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
  sources: {
    supabase: {
      type: 'vector',
      tiles: ['supabase://boston/{z}/{x}/{y}'],
      attribution: '© <a href="https://overturemaps.org">Overture Maps Foundation</a>',
    },
    protomaps: {
      type: 'vector',
      url: 'https://api.protomaps.com/tiles/v3.json?key=cQX2iET1gmOW38bedbUh',
      attribution: 'Basemap © <a href="https://openstreetmap.org">OpenStreetMap</a>',
    },
  },
}
const layers = [
  // ...protomaps_themes_base.noLabels('protomaps', 'black'),
  {
    'id': 'overture-pois',
    'type': 'circle',
    'source': 'supabase',
    'source-layer': 'places',
    'paint': {
      'circle-color': [
        'case',
        ['==', ['get', 'main_category'], 'beauty_salon'],
        '#fb9a99',
        ['==', ['get', 'main_category'], 'hotel'],
        '#33a02c',
        [
          '==',
          ['get', 'main_category'],
          'landmark_and_historical_building',
        ],
        '#a6cee3',
        ['==', ['get', 'main_category'], 'professional_services'],
        '#fdbf6f',
        ['==', ['get', 'main_category'], 'shopping'],
        '#e31a1c',
        ['==', ['get', 'main_category'], 'restaurant'],
        '#1f78b4',
        ['==', ['get', 'main_category'], 'school'],
        '#ff7f00',
        ['==', ['get', 'main_category'], 'accommodation'],
        '#b2df8a',
        '#cab2d6',
      ],
      'circle-radius': [
        'interpolate',
        ['exponential', 2],
        ['zoom'],
        0,
        1,
        19,
        8,
      ],
      'circle-stroke-width': [
        'interpolate',
        ['exponential', 2],
        ['zoom'],
        12,
        0,
        14,
        2,
      ],
      'circle-stroke-color': 'black',
    },
  },
  {
    'id': 'overture-pois-text',
    'type': 'symbol',
    'source': 'supabase',
    'source-layer': 'places',
    'layout': {
      'text-field': '{primary_name}',
      'text-font': ['Noto Sans Regular'],
      'text-size': 10,
    },
    'paint': {
      'text-color': [
        'case',
        ['==', ['get', 'main_category'], 'beauty_salon'],
        '#fb9a99',
        ['==', ['get', 'main_category'], 'hotel'],
        '#33a02c',
        [
          '==',
          ['get', 'main_category'],
          'landmark_and_historical_building',
        ],
        '#a6cee3',
        ['==', ['get', 'main_category'], 'professional_services'],
        '#fdbf6f',
        ['==', ['get', 'main_category'], 'shopping'],
        '#e31a1c',
        ['==', ['get', 'main_category'], 'restaurant'],
        '#1f78b4',
        ['==', ['get', 'main_category'], 'school'],
        '#ff7f00',
        ['==', ['get', 'main_category'], 'accommodation'],
        '#b2df8a',
        '#cab2d6',
      ],
      'text-halo-width': 1,
      'text-halo-color': 'black',
    },
  },
]
</script>

<template>
  <div size-screen>
    <MglMap
      :map-style="a"
      :layers
      :center="center"
      :zoom="zoom"
    >
      <MglNavigationControl />

      <MglVectorSource
        source-id="markers-source"
        :tiles="[`${sourceId}://boston/{z}/{x}/{y}`]"
      >
        <MglCircleLayer
          layer-id="markers-layer"
          source-layer="markers"
          source="markers-source"
          :paint="librariesLayerCirclesPaint"
        />
      </MglVectorSource>
    </MglMap>
  </div>
</template>
