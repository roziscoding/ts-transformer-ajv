import * as ts from 'typescript'

export type ValidateCallOptions = {
  schema?: ts.ObjectLiteralExpression
  validator?: ts.ObjectLiteralExpression
};
