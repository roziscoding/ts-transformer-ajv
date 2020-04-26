ts-transformer-ajv
---

This is a custom typescript transformer wich allows you to use [AJV](https://npmjs.org/package/ajv) easilly, without having to wtie both TS type definitinos and JSON Schema definitions.

## Installation

You'll need to install [AJV](https://npmjs.org/package/ajv) to use this.

Also, you'll need a way to load the transformer. I recommend using [ttypescript](https://npmjs.org/package/ttypescript),
so the instructions below assume you are using that.

From the terminal, run these commands:

- `npm install -D ttypescript ts-transformer-ajv`
- `npm install ajv`

On your tsconfig.json, add a new property and fill it like this:

```json5
{
  "compilerOptions": {
    // ...
    "plugins": [
      { "transform": "ts-transformer-ajv" }
    ]
  },
}
```

Now, instead of running `tsc` to build your app, just use `ttsc`, and *voilà*!

## Usage

ts-transform-ajv offers you two functions to validate objects agaist a given type: the compiled validator function, and an inline validate function. Their usage is described below:

### Compiled validator function - `getValidatorFromType`

This uses AJV's `compile` function to generate a static function that validates objects against the generated JSON Schema. Use it as follows:

```typescript
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

type ValidAnswer = {
    answer: number
}

const validateParams = getValidatorFromType<LoginParams>({ required: true }, { useDefaults: true })
const validateBody = getValidatorFromType<LoginBody>({ required: true })
const validateQuery = getValidatorFromType<LoginQuery>({ required: true })

validateParams({ app: 'teste' })
validateBody({ username: 'string', password: 'string' })
validateQuery({ id: false })
```

The return value is the result of calling `ajv.compile`, so you can check either the typings, or [AJV's documentation](https://npmjs.org/package/ajv) to see what the API looks like.

### Inline validation - `validateTypeWithAjv`

Allows you to validate an object against a given type using `ajv.validate`. Since we're now calling the validate function directly, the return value is an object with the following type:

```typescript
type ValidationResult = {
    isValid: boolean,
    errors: Ajv.ValidateFunction['errors']
}
```

You can use this function like so:

```typescript
import util from 'util'
import readline from 'readline'
import { validateTypeWithAjv } from 'ts-transformer-ajv'

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

type ValidAnswer = {
    answer: number
}

const { isValid: isParamsValid, errors: paramErrors } = validateTypeWithAjv<LoginParams>({ app: 'test' })
const { isValid: isBodyValid, errors: bodyErrors } = validateTypeWithAjv<LoginBody>({ username: 'string', password: 'string' })
const { isValid: isQueryValid, errors: queryErrors } = validateTypeWithAjv<LoginQuery>({}, { required: true })

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Type a number: ', answer => {
    const { isValid, errors } = validateTypeWithAjv<ValidAnswer>({ answer }, { coerceTypes: true })

    if (isValid) {
        rl.close()
        return console.log('Nice number!')
    }

    rl.close()
    console.log(util.inspect(errors))
    console.log('Hm... You don\'t know numbers very wel, do you? :think:')
})
```

## Configuration

You can pass both functions two configuration objects: an object defining options for [typescript-json-schema](https://npmjs.org/package/typescript-json-schema), and another one passing options to [AJV](https://npmjs.org/package/ajv).
Please, refer to their documentations to check what are the available options and what they do.

To acomplish typescript-like behaviour, you must pass `{ required: true }` to the schema generator options, so it'll consider non-optional keys in the type as required.

## Extra JSON Schema Properties

It's true that JSON Schema supports much more validation options than typescript does. For example: it accepts `max` and `min` for numbers
or `maxLength` and `minLength` for strings.

To solve that problem, `typescript-json-schema` uses JSDoc annotations. You can check them out on [typescript-json-schema's documentation](https://www.npmjs.com/package/typescript-json-schema#annotations).

## Contributing

From the terminal, run the following steps (assuming you've got `node` and `npm` figured out):

- `git clone git@github.com:rjmunhoz/ts-transformer-ajv`
- `cd ts-transformer-ajv`
- `npm i`

After that, you're ready to make your changes.

Use [gitmoji](https://github.com/carloscuesta/gitmoji) on your commit titles, please :)

After making your changes, run `npm run:build` to see if everything is OK.

~~After that, run `npm test` to run the test files~~
Automated tests are broken until the testing library is updated.
For now, please `cd` into the `usage` folder, run `npm i && npm run go` and make sure everything is working as expected.

Commit, push, and open a Pull Request

## Thanks

This project was only possible because of the effort the community has put on writing awesome
documentation, tools and examples for the TypeScript Transformer API.

During development, I depended largely on the instructions and documentation
found on the [Typescript Transformer Handbook](https://github.com/madou/typescript-transformer-handbook) by [madou](https://github.com/madou/).

Also, the inspiration to creating this came from [ts-transform-json-schema](https://github.com/marionebl/ts-transform-json-schema)

Last, but not least, huge thanks to [dsherret](https://github.com/dsherret) for making [ts-ast-viewer](https://github.com/dsherret/ts-ast-viewer). This tool
**saved my life** during my dives into the TypeScript AST.
