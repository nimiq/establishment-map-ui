import bboxPolygon from '@turf/bbox-polygon'
import { type MultiPolygon, multiPoint, multiPolygon, point } from '@turf/helpers'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import booleanWithin from '@turf/boolean-within'
import pointsWithinPolygon from '@turf/points-within-polygon'
import union from '@turf/union'
import type { BoundingBox, Location, Point } from 'types'

export const toPoint = <T extends Point>(data: T) => point([data.lng, data.lat], data)
export const toMultiPoint = <T extends Point>(data: T[]) => multiPoint(data.map(toPoint).map(d => d.geometry.coordinates))
export const toPolygon = ({ swLat, neLat, neLng, swLng }: BoundingBox) => bboxPolygon([swLng, swLat, neLng, neLat])
export const toMultiPolygon = (bbox: BoundingBox) => multiPolygon([toPolygon(bbox).geometry.coordinates])
export const bBoxIsWithinArea = (bbox: BoundingBox, area: MultiPolygon) => booleanWithin(toPolygon(bbox), area)
export const pointWithingBbox = ({ lat, lng }: Point, bbox: BoundingBox) => booleanPointInPolygon([lng, lat], toPolygon(bbox))
export const addBBoxToArea = (bbox: BoundingBox, multiPoly: MultiPolygon) => union(multiPoly, toPolygon(bbox))?.geometry as MultiPolygon || multiPoly
export const getLocationsWithinBBox = (locations: Location[], bbox: BoundingBox) => pointsWithinPolygon(toMultiPoint(locations), toPolygon(bbox)).features.map(f => f.properties as Location)
