import * as ts from 'typescript'
import * as tjs from 'typescript-json-schema'
import { toLiteral } from './to-literal'
import { fromLiteral } from './from-literal'
import { ValidateCallOptions } from './ValidateCallOptions'

export function generateSchemaForType (typeName: string, program: ts.Program, schemaOptions: ValidateCallOptions[ 'schema' ]) {
  const schemaArgs = schemaOptions ? fromLiteral(schemaOptions) : {}
  const schema = tjs.generateSchema(program, typeName, { ...schemaArgs, ignoreErrors: true } as tjs.PartialArgs)

  if (!schema) {
    console.error(`WARNING: COULD NOT GENERATE SCHEMA FOR TYPE ${typeName}`)
  }

  return toLiteral(schema)
}
