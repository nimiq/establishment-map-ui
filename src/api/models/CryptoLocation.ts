/* tslint:disable */
/* eslint-disable */
/**
 * Crypto Map API documentation
 * The Shop Directory API is serves a list of shops that accept crypto as a payment method.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { CryptoCurrency } from './CryptoCurrency';
import {
    CryptoCurrencyFromJSON,
    CryptoCurrencyFromJSONTyped,
    CryptoCurrencyToJSON,
} from './CryptoCurrency';
import type { CryptoLocationGeoLocation } from './CryptoLocationGeoLocation';
import {
    CryptoLocationGeoLocationFromJSON,
    CryptoLocationGeoLocationFromJSONTyped,
    CryptoLocationGeoLocationToJSON,
} from './CryptoLocationGeoLocation';

/**
 * 
 * @export
 * @interface CryptoLocation
 */
export interface CryptoLocation {
    /**
     * 
     * @type {number}
     * @memberof CryptoLocation
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof CryptoLocation
     */
    place_id: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoLocation
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoLocation
     */
    photo_reference: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoLocation
     */
    category: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoLocation
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof CryptoLocation
     */
    rating: number;
    /**
     * 
     * @type {string}
     * @memberof CryptoLocation
     */
    address: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoLocation
     */
    gmaps_url: string;
    /**
     * 
     * @type {CryptoLocationGeoLocation}
     * @memberof CryptoLocation
     */
    geo_location: CryptoLocationGeoLocation;
    /**
     * 
     * @type {Array<CryptoCurrency>}
     * @memberof CryptoLocation
     */
    currencies: Array<CryptoCurrency>;
}

/**
 * Check if a given object implements the CryptoLocation interface.
 */
export function instanceOfCryptoLocation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "place_id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "photo_reference" in value;
    isInstance = isInstance && "category" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "rating" in value;
    isInstance = isInstance && "address" in value;
    isInstance = isInstance && "gmaps_url" in value;
    isInstance = isInstance && "geo_location" in value;
    isInstance = isInstance && "currencies" in value;

    return isInstance;
}

export function CryptoLocationFromJSON(json: any): CryptoLocation {
    return CryptoLocationFromJSONTyped(json, false);
}

export function CryptoLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): CryptoLocation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'place_id': json['place_id'],
        'name': json['name'],
        'photo_reference': json['photo_reference'],
        'category': json['category'],
        'type': json['type'],
        'rating': json['rating'],
        'address': json['address'],
        'gmaps_url': json['gmaps_url'],
        'geo_location': CryptoLocationGeoLocationFromJSON(json['geo_location']),
        'currencies': ((json['currencies'] as Array<any>).map(CryptoCurrencyFromJSON)),
    };
}

export function CryptoLocationToJSON(value?: CryptoLocation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'place_id': value.place_id,
        'name': value.name,
        'photo_reference': value.photo_reference,
        'category': value.category,
        'type': value.type,
        'rating': value.rating,
        'address': value.address,
        'gmaps_url': value.gmaps_url,
        'geo_location': CryptoLocationGeoLocationToJSON(value.geo_location),
        'currencies': ((value.currencies as Array<any>).map(CryptoCurrencyToJSON)),
    };
}

