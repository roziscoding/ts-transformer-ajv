import JSON5 from 'json5'
import * as ts from 'typescript'

export function fromLiteral (node: ts.Node) {
  try {
    return JSON5.parse(node.getText())
  }
  catch (err) {
    return {}
  }
}
