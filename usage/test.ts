import util from 'util'
import readline from 'readline'
import { getValidatorFromType, validateTypeWithAjv } from 'ts-transformer-ajv'

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

validateTypeWithAjv<LoginParams>({ app: 'test' })
validateTypeWithAjv<LoginBody>({ username: 'string', password: 'string' })
validateTypeWithAjv<LoginQuery>({}, { required: true })

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