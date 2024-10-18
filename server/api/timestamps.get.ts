import type { LastUpdatedAt } from '~~/types/database'
import type { Database } from '~~/types/supabase'
import { serverSupabaseClient } from '#supabase/server'

export default defineCachedEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)
  const { data: timestamps, error } = await supabase.rpc('get_timestamps')
  if (error || !timestamps)
    return createError({ statusCode: 404, message: `Timestamps not found` })
  return timestamps as unknown as LastUpdatedAt
}, { maxAge: 60 * 60 /* 1 hour */ })
