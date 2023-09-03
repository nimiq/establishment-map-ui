import type { Currency } from '@nimiq/utils'
import type { Category } from './database'
import type { Location } from './location'

export interface BoundingBox {
  swLat: number
  swLng: number
  neLat: number
  neLng: number
}

export interface Point {
  lat: number
  lng: number
}

export interface EstimatedMapPosition {
  center: Point
  accuracy: number // in meters
}

export interface MapPosition {
  center: Point
  zoom: number
}

export interface Cluster {
  center: Point
  clusterId: number
  count: number
}

export interface MemoizedCluster {
  boundingBox: BoundingBox
  clusters: Cluster[]
  singles: Location[]
  categories: Category[]
  currencies: Currency[]
}
