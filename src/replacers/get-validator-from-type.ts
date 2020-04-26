import * as ts from 'typescript'
import { ValidateCallOptions } from '../lib/ValidateCallOptions'
import { isGeneratorOptions } from '../lib/is-generator-options'
import { generateSchemaForType } from '../lib/generate-schema-for-type'

function getOptionsFromCall (call: ts.CallExpression): ValidateCallOptions {
    const callArgs = call.arguments

    if (!callArgs.length) return {}

    if (callArgs.length === 2) {
        const [ schema, validator ] = callArgs

        return {
            schema: ts.isObjectLiteralExpression(schema) ? schema : undefined,
            validator: ts.isObjectLiteralExpression(validator) ? validator : undefined
        }
    }

    const [ onlyArg ] = callArgs

    if (!ts.isObjectLiteralExpression(onlyArg) || !onlyArg.properties.length) return {}

    return isGeneratorOptions(onlyArg)
        ? { schema: onlyArg }
        : { validator: onlyArg }
}

export function getReplacement (call: ts.CallExpression, typeName: string, program: ts.Program) {
    const options = getOptionsFromCall(call)
    const schema = generateSchemaForType(typeName, program, options.schema)

    const validateCallParams = [ schema ]

    if (options.validator) {
        validateCallParams.push(options.validator)
    }

    return ts.updateCall(call, call.expression, undefined, validateCallParams)
}

export default {
    getReplacement,
    acceptsCall: (call: ts.CallExpression) => call.expression.getText().includes('getValidatorFromType')
}