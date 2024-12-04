import {compare, hash} from 'bcryptjs'

const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  return await hash(password, SALT_ROUNDS)
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return await compare(plainTextPassword, hashedPassword)
}
