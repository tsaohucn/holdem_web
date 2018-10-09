import passwordValidator from 'password-validator'

const passwordSchema = new passwordValidator()

passwordSchema.is().min(6).has().lowercase()

export default passwordSchema