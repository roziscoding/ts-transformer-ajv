import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { transformerFactory } from '../src/transformer'
import { Transformer } from 'ts-transformer-testing-library'

export function getTransformer () {
  return new Transformer()
    .addTransformer(transformerFactory)
    .addMock({
      name: 'ts-transformer-ajv',
      content: fs.readFileSync(path.resolve(__dirname, '../src/get-validator-from-type.ts'), 'utf8')
    })
    .setCompilerOptions({
      strict: true,
      module: ts.ModuleKind.CommonJS
    })
}

export function getSimpleResult (_transformer?: Transformer) {
  const transformer = _transformer ?? getTransformer()

  return transformer.transform(`
    import { getValidatorFromType } from 'ts-transformer-ajv'

    type LoginParams = {
        app: string
    }

    type LoginBody = {
        username: string
        password: string
    }

    type LoginQuery = {
        id: boolean
    }

    const validateParams = getValidatorFromType<LoginParams>({ required: true }, { useDefaults: true })
    const validateBody = getValidatorFromType<LoginBody>({ required: true })
    const validateQuery = getValidatorFromType<LoginQuery>({ required: true })

    validateParams({ app: 'teste' })
    validateBody({ username: 'string', password: 'string' })
    validateQuery({ id: false })
  `)
}
