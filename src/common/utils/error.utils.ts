import axios, { AxiosError } from 'axios'
import { TErrorMessage } from '../interfaces/lib.interface'
import {
  ERROR_INTERNAL_SERVER,
  ERROR_NO_RESPONSE_SERVER,
  ERROR_SERVICE_NOT_FOUND,
  ERROR_SESSION_EXPIRED,
  ERROR_UNRECOGNIZED_OCCURRED,
} from '../constants/error.constant'
import { startCase } from 'lodash'

function isAxiosError<T = any>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export const getErrorMessage = <T>(error: TErrorMessage<T>): string => {
  const defaultMessages: Record<number, string> = {
    404: ERROR_SERVICE_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER,
    403: ERROR_SESSION_EXPIRED,
  }

  const formatMessage = (msg: string | undefined, errorData: Record<string, any> | undefined) => {
    if (!msg) return ERROR_NO_RESPONSE_SERVER

    if (errorData && Object.keys(errorData).length > 0) {
      const [key, value] = Object.entries(errorData)[0]
      return `${key} ${value}`
    }

    return msg ? startCase(msg) : ERROR_NO_RESPONSE_SERVER
  }

  const catchError = (
    message: string | undefined,
    errorData: Record<string, any> | undefined,
    responseCode?: string,
  ) => {
    if (responseCode) {
      return formatMessage(message, errorData)
    }

    return message ? startCase(message) : ERROR_NO_RESPONSE_SERVER
  }

  if (isAxiosError(error)) {
    const statusCode = error.response?.status
    const errorData = error.response?.data?.errors
    const responseCode = error.response?.data?.code
    const message = error.response?.data?.message

    if (statusCode && statusCode in defaultMessages) {
      return message ? catchError(message, errorData, responseCode) : defaultMessages[statusCode]
    }

    return catchError(message, errorData, responseCode)
  }

  if (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error &&
    typeof (error as any).message === 'string'
  ) {
    return error.message ? startCase(error.message) : ERROR_UNRECOGNIZED_OCCURRED
  }

  if (error instanceof Error) {
    return error.message ? startCase(error.message) : ERROR_UNRECOGNIZED_OCCURRED
  }

  return ERROR_UNRECOGNIZED_OCCURRED
}
