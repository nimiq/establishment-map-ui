import type { Feature, FeatureCollection, Point } from 'geojson'
import type { BoundingBox } from './map'

export interface MapViewport {
  zoom: number
  boundingBox: BoundingBox
}

export type LayerFeature = FeatureCollection<Point, FeatureClusterProperties | FeatureSingleProperties>

export interface FeatureClusterProperties {
  kind: 'cluster'
  expansionZoom: number
  count: number
  diameter: number
  cryptocities: CryptocityType[]
}

export interface FeatureSingleProperties {
  kind: 'single'
  name: string
}

export type FeatureProperties = FeatureClusterProperties | FeatureSingleProperties

export type FeatureCluster = Feature<Point, FeatureClusterProperties>
export type FeatureSingle = Feature<Point, FeatureSingleProperties>

export interface TileData {
  key: `tile:${number}:${number}:${number}`
  data: LayerFeature | undefined
}
