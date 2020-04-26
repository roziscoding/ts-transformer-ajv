import * as ts from 'typescript'
import { isGeneratorOptions } from '../lib/is-generator-options'
import { ValidateCallOptions } from '../lib/ValidateCallOptions'
import { generateSchemaForType } from '../lib/generate-schema-for-type'

export function getOptions (call: ts.CallExpression): ValidateCallOptions & { target?: any } {
    const callArgs = call.arguments

    if (!callArgs.length) {
        const sourceFile = call.getSourceFile()
        console.log(`No data passed to \`validateTypeWithAjv\` on ${sourceFile.fileName}:${sourceFile.getLineAndCharacterOfPosition(call.getStart())}`)
        return {}
    }

    if (callArgs.length === 1) {
        return {
            target: callArgs[ 0 ]
        }
    }

    if (callArgs.length === 2) {
        const [ target, onlyArg ] = callArgs
        const baseOptions = {
            target
        }

        if (!ts.isObjectLiteralExpression(onlyArg) || !onlyArg.properties.length) return {}

        return isGeneratorOptions(onlyArg)
        ? { ...baseOptions, schema: onlyArg }
        : { ...baseOptions, validator: onlyArg }
    }

    const [ target, schema, validator ] = callArgs

    return {
        target,
        schema: ts.isObjectLiteralExpression(schema) ? schema : undefined,
        validator: ts.isObjectLiteralExpression(validator) ? validator : undefined
    }
}

export function getReplacement (call: ts.CallExpression, typeName: string, program: ts.Program) {
    const options = getOptions(call)

    if (!options.target) return call

    const schema = generateSchemaForType(typeName, program, options.schema)
    const callParams = [ options.target, schema ]

    if (options.validator) {
        callParams.push(options.validator)
    }

    return ts.updateCall(call, call.expression, undefined, callParams)
}

export default {
    getReplacement,
    acceptsCall: (call: ts.CallExpression) => {
        return call.expression.getText().includes('validateTypeWithAjv')
    }
}
