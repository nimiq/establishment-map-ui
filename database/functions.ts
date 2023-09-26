import type { DatabaseAuthenticateUserArgs, InsertWithPlaceIdArgs } from '../types/database.ts'
import { AuthDbFunction } from '../types/database.ts'
import type { InsertLocationsClustersSetParams, InsertWithPlaceIdResponse, Location, RawLocation } from '../types/index.ts'
import { authenticateUser } from './auth.ts'
import { fetchDb } from './fetch.ts'

export async function addLocation(dbArgs: DatabaseAuthenticateUserArgs, location: Omit<RawLocation, 'uuid'>) {
  return await fetchDb<Location>(AuthDbFunction.UpsertRawLocation, await authenticateUser(dbArgs), { body: { location } })
}

export async function addLocationWithPlaceId(dbArgs: DatabaseAuthenticateUserArgs, locations: InsertWithPlaceIdArgs[]): Promise<InsertWithPlaceIdResponse | undefined> {
  return await fetchDb<InsertWithPlaceIdResponse>(AuthDbFunction.UpsertLocationsWithGMaps, await authenticateUser(dbArgs), { body: { locations } })
}

export async function deleteLocation(dbArgs: DatabaseAuthenticateUserArgs, location_uuid: string) {
  return await fetchDb<Location>(AuthDbFunction.DeleteLocation, await authenticateUser(dbArgs), { body: { location_uuid } })
}

export async function insertLocationsClusterSet(dbArgs: DatabaseAuthenticateUserArgs, data: InsertLocationsClustersSetParams) {
  return await fetchDb<Location>(AuthDbFunction.InsertLocationsClustersSet, await authenticateUser(dbArgs), { body: { data } })
}

export async function flushClusterTable(dbArgs: DatabaseAuthenticateUserArgs) {
  return await fetchDb<Location>(AuthDbFunction.FlushClustersTable, await authenticateUser(dbArgs))
}
