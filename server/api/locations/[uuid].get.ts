import { object, safeParse, string } from 'valibot'
import type { Database } from '~~/types/supabase'
import { serverSupabaseClient } from '#supabase/server'

const ParamsSchema = object({
  uuid: string(),
})

export default defineEventHandler(async (event) => {
  const { output: query, issues, success } = await getValidatedRouterParams(event, query => safeParse(ParamsSchema, query))
  if (!success || !query)
    throw createError({ statusCode: 400, message: 'Invalid query parameters', cause: JSON.stringify(issues) })

  const key = `location:${query.uuid}`

  const kv = hubKV()
  if (await kv.has(key))
    return await kv.get(key)

  const supabase = await serverSupabaseClient<Database>(event)
  const { data, error } = await supabase.rpc('get_location_by_uuid', { location_uuid: query.uuid })
  if (error || !data)
    return createError({ statusCode: 404, message: `Location with UUID ${query.uuid} not found` })

  // Download image
  const blob = await hubBlob().get(key)
  if (!blob) {
    // Go to google
  }

  return {
    message: `Fetching location with UUID: ${query.uuid}`,
    // Add the actual location data here once implemented
  }
})
