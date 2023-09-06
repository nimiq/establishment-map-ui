import bboxPolygon from '@turf/bbox-polygon'
import { type MultiPolygon, featureCollection, multiPolygon, point } from '@turf/helpers'
import booleanWithin from '@turf/boolean-within'
import pointsWithinPolygon from '@turf/points-within-polygon'
import union from '@turf/union'
import type { BoundingBox, Point } from '../types/index.ts'

/**
 * Returns a GeoJSON Point from a location. You can pass an object like a Location which will be stored as a property of the point
 * so you can retrieve it later
 */
export const toPoint = <T extends Point>(data: T) => point([data.lng, data.lat], data)

/**
 * Converts a bounding box to a GeoJSON Polygon
 */
export const toPolygon = ({ swLat, neLat, neLng, swLng }: BoundingBox) => bboxPolygon([swLng, swLat, neLng, neLat])

/**
 * A mutlipolygon is a list of polygons.
 * In the following example, we have a multipolygon with two polygons:
┌───────────┐
│          │    ┌──────┐
│          └┐   │      │
│           │   └──────┘
└────────┐   │
        │   │
        └───┘
 */

/**
 * Converts a bounding box to a GeoJSON MultiPolygon
 */
export const toMultiPolygon = (bbox: BoundingBox) => multiPolygon([toPolygon(bbox).geometry.coordinates])

/**
 * Checks if a bounding box is within a multipolygon
 */
export const bBoxIsWithinArea = (bbox: BoundingBox, multiPoly?: MultiPolygon) => !multiPoly ? false : booleanWithin(toPolygon(bbox), multiPoly)

/**
 * Adds a polygon (from a bounding box) to a multipolygon
 */
export function addBBoxToArea(bbox: BoundingBox, multiPoly?: MultiPolygon) {
  return !multiPoly ? toMultiPolygon(bbox).geometry : union(multiPoly, toPolygon(bbox))?.geometry as MultiPolygon || multiPoly
}

/**
 * Given a list of items (anything that has {lat, lng}, e.g.: locations or clusters) and a bounding box,
 * returns the items that are within the bounding box
 *
 * 1. We create a list of points (using multiPoint) from the items
 *    - In the properties of each point, we store the items data
 * 2. We create a polygon from the bounding box
 * 3. We check which points are within the polygon
 * 4. We return the origina item data from the points that are within the polygon
 */
export function getItemsWithinBBox<T extends Point>(items: T[], bbox: BoundingBox) {
  return pointsWithinPolygon(featureCollection(items.map(toPoint)), toPolygon(bbox)).features.flatMap(f => f.properties)
}
