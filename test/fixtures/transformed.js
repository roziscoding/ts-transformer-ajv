"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const ts_transformer_ajv_1 = require("ts-transformer-ajv")
const validateParams = ts_transformer_ajv_1.getValidatorFromType({ "type": "object", "properties": { "app": { "type": "string" } }, "required": ["app"], "$schema": "http://json-schema.org/draft-07/schema#" }, { useDefaults: true })
const validateBody = ts_transformer_ajv_1.getValidatorFromType({ "type": "object", "properties": { "username": { "type": "string" }, "password": { "type": "string" } }, "required": ["password", "username"], "$schema": "http://json-schema.org/draft-07/schema#" })
const validateQuery = ts_transformer_ajv_1.getValidatorFromType({ "type": "object", "properties": { "id": { "type": "boolean" } }, "required": ["id"], "$schema": "http://json-schema.org/draft-07/schema#" })
validateParams({ app: 'teste' })
validateBody({ username: 'string', password: 'string' })
validateQuery({ id: false })