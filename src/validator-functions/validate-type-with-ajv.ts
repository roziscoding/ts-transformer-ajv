import Ajv from 'ajv'
import { PartialArgs } from 'typescript-json-schema'
import { ValidationResult } from '../lib/ValidationResult'


export function validateTypeWithAjv<_T> (data: any, ajvOptions?: Ajv.Options): ValidationResult
export function validateTypeWithAjv<_T> (data: any, schemaGenerationOptions?: PartialArgs): ValidationResult
export function validateTypeWithAjv<_T> (data: any, schemaGenerationOptions: PartialArgs | Ajv.Options, ajvOptions: Ajv.Options): ValidationResult
export function validateTypeWithAjv<_T> (data: any, schemaGenerationOptions?: PartialArgs | Ajv.Options, ajvOptions?: Ajv.Options): ValidationResult {
    const ajv = new Ajv(ajvOptions)
    const isValid = ajv.validate(schemaGenerationOptions as any, data) as boolean

    return {
        isValid,
        errors: ajv.errors
    }
}