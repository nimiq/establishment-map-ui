/* tslint:disable */
/* eslint-disable */
/**
 * Crypto Map API documentation
 * The Establishments map API is serves a list of establishments that accept crypto as a payment method.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CryptoEstablishmentGeoLocation
 */
export interface CryptoEstablishmentGeoLocation {
    /**
     * 
     * @type {number}
     * @memberof CryptoEstablishmentGeoLocation
     */
    lat: number;
    /**
     * 
     * @type {number}
     * @memberof CryptoEstablishmentGeoLocation
     */
    lng: number;
}

/**
 * Check if a given object implements the CryptoEstablishmentGeoLocation interface.
 */
export function instanceOfCryptoEstablishmentGeoLocation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "lat" in value;
    isInstance = isInstance && "lng" in value;

    return isInstance;
}

export function CryptoEstablishmentGeoLocationFromJSON(json: any): CryptoEstablishmentGeoLocation {
    return CryptoEstablishmentGeoLocationFromJSONTyped(json, false);
}

export function CryptoEstablishmentGeoLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): CryptoEstablishmentGeoLocation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lat': json['lat'],
        'lng': json['lng'],
    };
}

export function CryptoEstablishmentGeoLocationToJSON(value?: CryptoEstablishmentGeoLocation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lat': value.lat,
        'lng': value.lng,
    };
}

