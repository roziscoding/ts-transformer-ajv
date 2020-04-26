import Ajv from 'ajv'
import { PartialArgs } from 'typescript-json-schema'

export function getValidatorFromType<_T> (schemaGenerationOptions?: PartialArgs, ajvOptions?: Ajv.Options): Ajv.ValidateFunction {
    const ajv = new Ajv(ajvOptions)
    return ajv.compile(schemaGenerationOptions as any)
}
