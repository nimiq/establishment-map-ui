import type { FeatureCollection } from '@turf/helpers'
import type { BoundingBox, ComputedClusterSet, DatabaseArgs, DatabaseAuthArgs, Location, Suggestion } from '../types/index.ts'
import { Category, Cryptocity, Currency, DbReadFunction, Provider } from '../types/index.ts'
import { fetchDb } from './fetch.ts'

/**
 * We hardcode these values here, because they are rarely updated.
 * Even if we update those values in the database, we always need to update UI regardless.
 */
export const CURRENCIES = Object.values(Currency)
export const CATEGORIES = Object.values(Category)
export const PROVIDERS = Object.values(Provider)
export const CRYPTOCITIES = Object.values(Cryptocity)

// Maximum number of rows from the database
const MAX_N_ROWS = 1000

export async function getLocations(dbArgs: DatabaseArgs | DatabaseAuthArgs, bbox: BoundingBox, parseLocations: (l: Location) => Location = l => l): Promise<Location[]> {
  const params = new URLSearchParams()
  Object.entries(bbox).forEach(([key, value]) => params.append(key.toLocaleLowerCase(), value.toString()))
  let page = 0
  const locations: Location[] = []
  while (locations.length % MAX_N_ROWS === 0) {
    params.set('page_num', page.toString())
    const newLocations = await fetchDb<Location[]>(DbReadFunction.GetLocations, dbArgs, params.toString()) ?? []
    locations.push(...newLocations)
    page++
  }
  return locations.map(parseLocations)
}

export async function getLocation(dbArgs: DatabaseArgs | DatabaseAuthArgs, uuid: string, parseLocation: (l: Location) => Location): Promise<Location | undefined> {
  const params = new URLSearchParams()
  params.append('location_uuid', uuid)
  const location = await fetchDb<Location>(DbReadFunction.GetLocation, dbArgs, params.toString())
  if (!location) {
    console.warn(`Location ${uuid} not found`)
    return undefined
  }
  return parseLocation(location)
}

export async function searchLocations(dbArgs: DatabaseArgs | DatabaseAuthArgs, query: string) {
  const params = new URLSearchParams()
  params.append('p_query', query)
  return await fetchDb<Omit<Suggestion, 'type'>[]>(DbReadFunction.SearchLocations, dbArgs, params.toString()) ?? []
}

export async function getClusters(dbArgs: DatabaseArgs | DatabaseAuthArgs, bbox: BoundingBox, zoom: number, parseLocation: (l: Location) => Location = l => l): Promise<ComputedClusterSet> {
  const params = new URLSearchParams()
  Object.entries(bbox).forEach(([key, value]) => params.append(key.toLocaleLowerCase(), value.toString()))
  params.append('zoom_level', zoom.toString())
  const res = await fetchDb<ComputedClusterSet>(DbReadFunction.GetLocationsClustersSet, dbArgs, params.toString())
  return {
    clusters: res?.clusters ?? [],
    singles: res?.singles.map(parseLocation) ?? [],
  }
}

/**
 * The maximum zoom level at which the clusters are computed in the database.
 * If the user zooms in more than this, the clusters will be computed in the client.
 */
export async function getClusterMaxZoom(dbArgs: DatabaseArgs | DatabaseAuthArgs): Promise<number> {
  return await fetchDb<number>(DbReadFunction.GetMaxZoom, dbArgs) ?? -1 // FIXME: Show error to user instead of using -1
}

export async function getCryptocityPolygon(dbArgs: DatabaseArgs | DatabaseAuthArgs, city: Cryptocity): Promise<FeatureCollection | undefined> {
  const params = new URLSearchParams()
  params.append('city', city)
  return await fetchDb<FeatureCollection>(DbReadFunction.GetCryptocityPolygon, dbArgs, params.toString())
}
