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
 * @interface CategoriesIssues
 */
export interface CategoriesIssues {
    /**
     * 
     * @type {string}
     * @memberof CategoriesIssues
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof CategoriesIssues
     */
    id: number;
}

/**
 * Check if a given object implements the CategoriesIssues interface.
 */
export function instanceOfCategoriesIssues(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function CategoriesIssuesFromJSON(json: any): CategoriesIssues {
    return CategoriesIssuesFromJSONTyped(json, false);
}

export function CategoriesIssuesFromJSONTyped(json: any, ignoreDiscriminator: boolean): CategoriesIssues {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'id': json['id'],
    };
}

export function CategoriesIssuesToJSON(value?: CategoriesIssues | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'id': value.id,
    };
}

