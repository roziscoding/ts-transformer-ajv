import type Ajv from 'ajv'

export type ValidationResult = {
    isValid: boolean,
    errors: Ajv.ValidateFunction['errors']
}