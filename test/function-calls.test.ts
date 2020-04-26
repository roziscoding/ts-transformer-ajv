import { expect } from 'chai'
import { getSimpleResult } from './utils'

describe('function calls', () => {
  describe('swaps function calls with expresso validate calls', () => {
    let result: string

    before(() => {
      result = getSimpleResult()
      console.log(result)
    })

    it('generates correct code', () => {
      expect(result)
        .to.have.string('const validateParams = ts_transformer_ajv_1.getValidatorFromType({ "type": "object", "properties": { "app": { "type": "string" } }, "required": ["app"], "$schema": "http://json-schema.org/draft-07/schema#" }, { useDefaults: true })')
        .and.have.string('const validateBody = ts_transformer_ajv_1.getValidatorFromType({ "type": "object", "properties": { "username": { "type": "string" }, "password": { "type": "string" } }, "required": ["password", "username"], "$schema": "http://json-schema.org/draft-07/schema#" })')
        .and.have.string('const validateQuery = ts_transformer_ajv_1.getValidatorFromType({ "type": "object", "properties": { "id": { "type": "boolean" } }, "required": ["id"], "$schema": "http://json-schema.org/draft-07/schema#" })')
    })
  })
})
