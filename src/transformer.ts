import * as ts from 'typescript'
import replacers from './replacers'
import { getTypeNameFromCall } from './lib/get-type-name-from-call'

function getCallExpressionReplacement (call: ts.CallExpression, typeName: string, program: ts.Program) {
  const replacer = replacers.find(replacer => replacer.acceptsCall(call))

  if (!replacer) return null

  return replacer.getReplacement(call, typeName, program)
}

export const transformerFactory = (program: ts.Program): ts.TransformerFactory<ts.SourceFile> => {
  const typeChecker = program.getTypeChecker()

  return context => {
    return sourceFile => {
      const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
        if (ts.isCallExpression(node)) {
          const typeName = getTypeNameFromCall(node, typeChecker)

          const replacementCallExpression = getCallExpressionReplacement(node, typeName, program)

          if (replacementCallExpression) return replacementCallExpression
        }

        return ts.visitEachChild(node, visitor, context)
      }

      return ts.visitNode(sourceFile, visitor)
    }
  }
}

export default transformerFactory
