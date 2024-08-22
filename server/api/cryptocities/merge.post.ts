import { z } from 'zod'
import { createConsola } from 'consola'
import type { Polygon } from 'geojson'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import { getGeoJson } from '~~/server/lib/cryptocity-utils'
import { mergeMultiPolygons } from '~~/packages/geo/src'

const cityRe = /^[A-Z][a-z]*(?:_[A-Z][a-z]*)*$/

const consola = createConsola({ level: 3 })

const requestSchema = z.object({
  // CamelCase with underscores
  city: z.string().regex(cityRe, '`city` must be in CamelCase with underscores'),

  osmId: z.string({ message: 'Go to https://nominatim.openstreetmap.org/ui/search.html to find the OSM ID' }),
  osmClass: z.string({ message: 'Go to https://nominatim.openstreetmap.org/ui/search.html to find the OSM class' }),
  osmType: z.string({ message: 'Go to https://nominatim.openstreetmap.org/ui/search.html to find the OSM type' }),
  osmPlaceId: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const params = await readValidatedBody(event, body => requestSchema.parse(body))

  const client = await serverSupabaseClient<Database>(event)
  const { data: city } = await client.from('cryptocities').select('id,shape').eq('name', params.city)
  if (!city || city?.length === 0) {
    return createError({ message: `City ${params.city} not found`, status: 404 })
  }

  consola.info(`Merging city ${params.city}`)

  const { supabaseAdminEmail: email, supabaseAdminPassword: password } = useRuntimeConfig()
  await client.auth.signInWithPassword({ email, password })
  consola.debug('Signed in as admin')

  const { data: newGeoJson, error: geojsonError } = await getGeoJson({
    osmClass: params.osmClass,
    osmId: params.osmId,
    osmPlaceId: params.osmPlaceId,
    osmType: params.osmType,
  })
  if (geojsonError)
    return createError({ message: geojsonError, status: 500 })

  const originalGeojson = city[0].shape as Polygon
  const mergedGeoJson = mergeMultiPolygons(originalGeojson, newGeoJson)

  const { error: errUpdatingPolygon } = await client.from('cryptocities').update({ shape: mergedGeoJson.geometry }).eq('name', params.city)
  if (errUpdatingPolygon) {
    return createError({ message: `Failed to update data: ${errUpdatingPolygon.message}`, status: 500 })
  }

  return mergedGeoJson
})
