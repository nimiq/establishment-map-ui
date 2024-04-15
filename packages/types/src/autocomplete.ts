import { Location } from "./location.ts"

export enum AutocompleteStatus {
  Initial = 'initial',
  Loading = 'loading',
  WithResults = 'with-results',
  NoResults = 'no-results',
  Error = 'error',
}

export interface SearchFor {
  searchForLocation?: boolean
  searchForRegions?: boolean
}

export interface PredictionSubstring {
  /**
   * The length of the substring.
   */
  length: number
  /**
   * The offset to the substring start within the description string.
   */
  offset: number
}

export type LocationSuggestion = Pick<Location, 'uuid' | 'name'> & { matchedSubstrings: PredictionSubstring[] }
export type GoogleSuggestion = { label: string, placeId: string, matchedSubstrings: PredictionSubstring[] }
