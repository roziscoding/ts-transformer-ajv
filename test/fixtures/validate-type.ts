import { RequestHandler } from 'express'
import { PartialArgs } from 'typescript-json-schema'

export type ValidateOptions = { coerce?: boolean, defaults?: boolean, property?: string }

export type Options = {
  validator?: ValidateOptions
  schema?: PartialArgs
}

export function validateType <_T> (_schema?: PartialArgs, _validator?: ValidateOptions): RequestHandler {
  throw new Error('this shouldnt be on runtime')
}

export function validate (params: any) {
  throw new Error('dummy')
}
