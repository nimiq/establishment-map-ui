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
/**
 * 
 * @export
 * @interface EstablishmentIssue
 */
export interface EstablishmentIssue {
    /**
     * 
     * @type {string}
     * @memberof EstablishmentIssue
     */
    label: string;
    /**
     * 
     * @type {number}
     * @memberof EstablishmentIssue
     */
    id: number;
}

/**
 * Check if a given object implements the EstablishmentIssue interface.
 */
export function instanceOfEstablishmentIssue(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "label" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function EstablishmentIssueFromJSON(json: any): EstablishmentIssue {
    return EstablishmentIssueFromJSONTyped(json, false);
}

export function EstablishmentIssueFromJSONTyped(json: any, ignoreDiscriminator: boolean): EstablishmentIssue {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'label': json['label'],
        'id': json['id'],
    };
}

export function EstablishmentIssueToJSON(value?: EstablishmentIssue | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'label': value.label,
        'id': value.id,
    };
}
