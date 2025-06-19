import crypto from "crypto"

export function validPassword(password: string, hash: string|null|undefined, salt: string) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === hashVerify
}