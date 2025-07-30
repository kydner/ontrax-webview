import { ERROR_INTERNAL } from '../constants/error.constant'

export class ErrorId extends Error {
  constructor(relationName: string) {
    super(`${ERROR_INTERNAL}, empty ${relationName}`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
