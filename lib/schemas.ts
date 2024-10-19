import { intersect, maxValue, minValue, number, object, pipe, string, uuid } from 'valibot'

export const UuidSchema = pipe(string(), uuid('The UUID is badly formatted'))
export const UuidObjectSchema = object({ uuid: UuidSchema })

export const LatSchema = pipe(number(), minValue(-90, 'Latitude must be greater than or equal to -90'), maxValue(90, 'Latitude must be less than or equal to 90'))
export const LngSchema = pipe(number(), minValue(-180, 'Longitude must be greater than or equal to -180'), maxValue(180, 'Longitude must be less than or equal to 180'))
export const BoundingBoxSchema = object({ nelat: LatSchema, nelng: LngSchema, swlat: LatSchema, swlng: LngSchema })
export const BoundingBoxObjectSchema = object({ boundingBox: BoundingBoxSchema })

export const ZoomSchema = pipe(
  number(),
  minValue(0, 'Zoom level must be greater than or equal to 0'),
  maxValue(21, 'Zoom level must be less than or equal to 21'),
)
export const ZoomObjectSchema = object({ zoom: ZoomSchema })

export const MapViewportSchema = intersect([BoundingBoxObjectSchema, ZoomObjectSchema])
