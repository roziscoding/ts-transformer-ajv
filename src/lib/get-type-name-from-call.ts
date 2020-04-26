import * as ts from 'typescript'

export function getTypeNameFromCall (call: ts.CallExpression, typeChecker: ts.TypeChecker) {
    if (!call.typeArguments?.length) return ''

    const typeArgument = call.typeArguments[ 0 ]
    const type = typeChecker.getTypeFromTypeNode(typeArgument)
    const symbol = type.aliasSymbol || type.symbol
    if (!symbol) throw new Error(`Cannot get symbol for type ${typeArgument.getText()}`)
    return symbol.name
}