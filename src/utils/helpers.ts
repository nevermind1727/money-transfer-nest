import * as bcrypt from "bcrypt"

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

export const comparePasswords = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
}