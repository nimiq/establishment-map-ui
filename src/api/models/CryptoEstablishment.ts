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
import type { CryptoEstablishmentGeoLocation } from './CryptoEstablishmentGeoLocation';
import {
    CryptoEstablishmentGeoLocationFromJSON,
    CryptoEstablishmentGeoLocationFromJSONTyped,
    CryptoEstablishmentGeoLocationToJSON,
} from './CryptoEstablishmentGeoLocation';

/**
 * 
 * @export
 * @interface CryptoEstablishment
 */
export interface CryptoEstablishment {
    /**
     * 
     * @type {number}
     * @memberof CryptoEstablishment
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    gmaps_place_id: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    updated_at: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    category: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    gmaps_type: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    gmaps_url: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    photo_reference?: string;
    /**
     * 
     * @type {string}
     * @memberof CryptoEstablishment
     */
    address: string;
    /**
     * 
     * @type {number}
     * @memberof CryptoEstablishment
     */
    rating: number;
    /**
     * 
     * @type {boolean}
     * @memberof CryptoEstablishment
     */
    enabled?: boolean;
    /**
     * 
     * @type {CryptoEstablishmentGeoLocation}
     * @memberof CryptoEstablishment
     */
    geo_location: CryptoEstablishmentGeoLocation;
    /**
     * 
     * @type {Array<string>}
     * @memberof CryptoEstablishment
     */
    currencies: Array<string>;
}

/**
 * Check if a given object implements the CryptoEstablishment interface.
 */
export function instanceOfCryptoEstablishment(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "gmaps_place_id" in value;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "updated_at" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "category" in value;
    isInstance = isInstance && "gmaps_type" in value;
    isInstance = isInstance && "gmaps_url" in value;
    isInstance = isInstance && "address" in value;
    isInstance = isInstance && "rating" in value;
    isInstance = isInstance && "geo_location" in value;
    isInstance = isInstance && "currencies" in value;

    return isInstance;
}

export function CryptoEstablishmentFromJSON(json: any): CryptoEstablishment {
    return CryptoEstablishmentFromJSONTyped(json, false);
}

export function CryptoEstablishmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): CryptoEstablishment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'gmaps_place_id': json['gmaps_place_id'],
        'created_at': json['created_at'],
        'updated_at': json['updated_at'],
        'name': json['name'],
        'category': json['category'],
        'gmaps_type': json['gmaps_type'],
        'gmaps_url': json['gmaps_url'],
        'photo_reference': !exists(json, 'photo_reference') ? undefined : json['photo_reference'],
        'address': json['address'],
        'rating': json['rating'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'geo_location': CryptoEstablishmentGeoLocationFromJSON(json['geo_location']),
        'currencies': json['currencies'],
    };
}

export function CryptoEstablishmentToJSON(value?: CryptoEstablishment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'gmaps_place_id': value.gmaps_place_id,
        'created_at': value.created_at,
        'updated_at': value.updated_at,
        'name': value.name,
        'category': value.category,
        'gmaps_type': value.gmaps_type,
        'gmaps_url': value.gmaps_url,
        'photo_reference': value.photo_reference,
        'address': value.address,
        'rating': value.rating,
        'enabled': value.enabled,
        'geo_location': CryptoEstablishmentGeoLocationToJSON(value.geo_location),
        'currencies': value.currencies,
    };
}
