import { maxValue, minValue, number, object, pipe, string, uuid } from 'valibot'

export const UuidSchema = object({ uuid: pipe(string(), uuid('The UUID is badly formatted')) })

const CoordSchema = pipe(
  number(),
  minValue(-180, 'Coordinate must be greater than or equal to -180'),
  maxValue(180, 'Coordinate must be less than or equal to 180'),
)

export const BoundingBoxSchema = object({
  nelat: pipe(CoordSchema, maxValue(90, 'Latitude must be less than or equal to 90')),
  nelng: CoordSchema,
  swlat: pipe(CoordSchema, minValue(-90, 'Latitude must be greater than or equal to -90')),
  swlng: CoordSchema,
})

export const ZoomSchema = pipe(
  number(),
  minValue(0, 'Zoom level must be greater than or equal to 0'),
  maxValue(21, 'Zoom level must be less than or equal to 21'),
)
