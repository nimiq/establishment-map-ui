import type { DatabaseAuthArgs, InsertLocationsClustersSetParams, InsertWithPlaceIdResponse, Location, RawLocation } from '../types/index.ts'
import type { InsertWithPlaceIdArgs } from '../types/database.ts'
import { DbWriteFunction } from '../types/database.ts'
import { fetchDb, getAuth } from './fetch.ts'

export async function addLocation(dbArgs: DatabaseAuthArgs, location: Omit<RawLocation, 'uuid'>) {
  const token = await getAuth(dbArgs)
  return await fetchDb<Location>(DbWriteFunction.UpsertRawLocation, { ...dbArgs, token }, JSON.stringify({ location }))
}

export async function addLocationWithPlaceId(dbArgs: DatabaseAuthArgs, locations: InsertWithPlaceIdArgs[]): Promise<InsertWithPlaceIdResponse | undefined> {
  const token = await getAuth(dbArgs)
  return await fetchDb<InsertWithPlaceIdResponse>(DbWriteFunction.UpsertLocationsWithGMaps, { ...dbArgs, token }, JSON.stringify({ locations }))
}

export async function deleteLocation(dbArgs: DatabaseAuthArgs, uuid: string) {
  const token = await getAuth(dbArgs)
  return await fetchDb<Location>(DbWriteFunction.DeleteLocation, { ...dbArgs, token }, JSON.stringify({ location_uuid: uuid }))
}

export async function insertLocationsClusterSet(dbArgs: DatabaseAuthArgs, data: InsertLocationsClustersSetParams) {
  const token = await getAuth(dbArgs)
  return await fetchDb<Location>(DbWriteFunction.InsertLocationsClustersSet, { ...dbArgs, token }, JSON.stringify(data))
}

export async function flushClusterTable(dbArgs: DatabaseAuthArgs) {
  const token = await getAuth(dbArgs)
  return await fetchDb<Location>(DbWriteFunction.FlushClustersTable, { ...dbArgs, token })
}
