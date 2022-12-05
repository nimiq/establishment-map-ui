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
 * @interface AutocompleteApiEstablishmentsInner
 */
export interface AutocompleteApiEstablishmentsInner {
    /**
     * 
     * @type {string}
     * @memberof AutocompleteApiEstablishmentsInner
     */
    uuid: string;
    /**
     * 
     * @type {string}
     * @memberof AutocompleteApiEstablishmentsInner
     */
    name: string;
}

/**
 * Check if a given object implements the AutocompleteApiEstablishmentsInner interface.
 */
export function instanceOfAutocompleteApiEstablishmentsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "uuid" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function AutocompleteApiEstablishmentsInnerFromJSON(json: any): AutocompleteApiEstablishmentsInner {
    return AutocompleteApiEstablishmentsInnerFromJSONTyped(json, false);
}

export function AutocompleteApiEstablishmentsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): AutocompleteApiEstablishmentsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uuid': json['uuid'],
        'name': json['name'],
    };
}

export function AutocompleteApiEstablishmentsInnerToJSON(value?: AutocompleteApiEstablishmentsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uuid': value.uuid,
        'name': value.name,
    };
}

