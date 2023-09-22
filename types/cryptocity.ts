import type { MultiPolygon } from '@turf/helpers'
import type { BoundingBox, Point } from './index.ts'

export enum Cryptocity {
  SanJose = 'San Jose',
  SanJose2 = 'San Jose2',
}

export interface CryptocityData {
  cryptocity: Cryptocity
  name: string
  description: string[]
  url: string
  centroid: Point
  boundingBox: BoundingBox
}

export type CryptocityMarker = Map<number /* id of the cluster OR -1 not attached  */, CryptocityData[]>

export interface CryptocityMemoized { area: MultiPolygon; markers: CryptocityMarker }
