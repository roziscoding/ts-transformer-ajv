import * as ts from 'typescript'

export function toLiteral (input: unknown): ts.PrimaryExpression {
  if (typeof input === 'string' ||
    typeof input === 'boolean' ||
    typeof input === 'number') {
    return ts.createLiteral(input)
  }
  if (typeof input === 'object' && Array.isArray(input)) {
    return ts.createArrayLiteral(input.map(toLiteral))
  }
  if (input !== null && typeof input === 'object' && !Array.isArray(input)) {
    const ob = input as Record<string, any>
    return ts.createObjectLiteral(Object.keys(ob).map(key => ts.createPropertyAssignment(ts.createLiteral(key), toLiteral(ob[ key ]))))
  }
  return ts.createNull()
}
