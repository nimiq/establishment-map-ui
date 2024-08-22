import { z } from 'zod'
import { createConsola } from 'consola'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/supabase'
import { cryptocityRegex, getGeoJson, getOsmDetails } from '~~/server/lib/cryptocity-utils'

const consola = createConsola({ level: 3 })

const requestSchema = z.object({
  countryCode: z.string(),
  // CamelCase with underscores
  city: z.string().regex(cryptocityRegex, '`city` must be in CamelCase with underscores'),
})

export default defineEventHandler(async (event) => {
  const params = await readValidatedBody(event, body => requestSchema.parse(body))

  consola.info(`Inserting city ${params.city} in ${params.countryCode}`)

  const client = await serverSupabaseClient<Database>(event)
  const { supabaseAdminEmail: email, supabaseAdminPassword: password } = useRuntimeConfig()
  await client.auth.signInWithPassword({ email, password })
  consola.debug('Signed in as admin')

  const { data: cityAlreadyInserted } = await client.from('cryptocities').select('id').eq('name', params.city)
  if (cityAlreadyInserted && cityAlreadyInserted?.length > 0) {
    const { error } = await client.from('cryptocities').delete().eq('name', params.city)
    if (error)
      return createError({ message: `Failed to delete data: ${error.message}`, status: 500 })
  }

  const { data: osmDetails, error: errorGetOsmDetails } = await getOsmDetails(params)
  if (errorGetOsmDetails)
    return createError({ message: errorGetOsmDetails, status: 500 })

  // We need to wait a bit before fetching the GeoJSON
  await new Promise(resolve => setTimeout(resolve, 2_500))
  consola.info(`Fetching GeoJSON for ${params.city}, ${params.countryCode}: ${JSON.stringify(osmDetails)}`)

  const { data: geojson, error: geojsonError } = await getGeoJson(osmDetails!)
  if (geojsonError)
    return createError({ message: geojsonError, status: 500 })

  const newCity = {
    name: params.city,
    shape: geojson,
  }
  const { data, error } = await client.from('cryptocities').insert(newCity)

  if (error) {
    return createError({ message: `Failed to insert data: ${error.message}`, status: 500 })
  }

  return { message: `City ${params.city} inserted successfully`, data, newCity }
})
