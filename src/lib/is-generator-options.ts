import * as ts from 'typescript'

export function isGeneratorOptions (obj: ts.ObjectLiteralExpression) {
    const generatorProperties = [
        'ref',
        'aliasRef',
        'topRef',
        'titles',
        'defaultProps',
        'noExtraProps',
        'propOrder',
        'typeOfKeyword',
        'required',
        'strictNullChecks',
        'ignoreErrors',
        'out',
        'validationKeywords',
        'include',
        'excludePrivate',
        'uniqueNames',
        'rejectDateType',
        'id',
        'defaultNumberType'
    ]

    const isValidKey = (property: ts.PropertyAssignment) => generatorProperties.includes(property.name.getText())

    return !!obj.properties.find(property => ts.isPropertyAssignment(property) && isValidKey(property))
}