import type { MapLocation } from '~~/types/location'
import type { Database } from '~~/types/supabase'
import { serverSupabaseClient } from '#supabase/server'
import { any, safeParse } from 'valibot'

export default defineEventHandler(async (event) => {
  // TODO Create a schema for the query
  const { output: query, issues, success } = await getValidatedQuery(event, query => safeParse(any(), query))
  if (!success || !query)
    throw createError({ statusCode: 400, message: 'Invalid path parameters', cause: JSON.stringify(issues) })

  // If not in cache, fetch the location data from Supabase
  const supabase = await serverSupabaseClient<Database>(event)
  const { data, error } = await supabase.rpc('get_cryptocity_locations', query) as unknown as { data: { data: MapLocation[] }, error: any }
  if (error || !data)
    return createError({ statusCode: 404, message: `Locations not found` })
  const locations = data.data as MapLocation[]

  // event.waitUntil(() => {
  // locations
  // })

  return locations
})
