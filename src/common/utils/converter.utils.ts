import { camelCase as LCamelCase, isArray, isEmpty, isNumber, startCase } from 'lodash'
import { isFile } from './validation.utils'
import { useI18n } from 'vue-i18n'
import { AxiosError } from 'axios'
import { date } from 'quasar'
import { useRoute } from 'vue-router'
import { useKSecurity } from './encryption.utils'
import { KOptionDate } from '../interfaces/date.interface'
import { isoDate } from '../interfaces/response.interface'
import { KCurrencyOption } from '../interfaces/currency.interface'
import { CURRENCY_OPTION } from '../constants/currency.constant'
import { unformat as unformatCurrency, format as formatCurrency } from 'v-money3'

export type TSLAUnit = 'seconds' | 'milliseconds' | 'minutes'

export const toFormData = <T extends Record<string, any>>(data?: T): FormData | T | undefined => {
  const formData = new FormData()
  if (isEmpty(data)) return data
  Object.keys(data).forEach((key) => {
    const typedKey = key as keyof T
    const value = data[typedKey]

    // Ensure the value is not undefined or null
    if (value !== undefined && value !== null) {
      // Check if the value is an object (excluding null)
      if (isFile(value)) {
        // Handle file uploads
        formData.append(String(typedKey), value)
      } else if (Array.isArray(value)) {
        // Handle arrays
        formData.append(
          `${String(typedKey)}`,
          value?.map((item: any) => item),
        )
        // value.forEach((item: any, index: number) => {
        // })
      } else if (typeof value === 'object') {
        // Handle nested objects
        formData.append(String(typedKey), JSON.stringify(value))
      } else {
        // Handle basic types (strings, numbers, etc.)
        formData.append(String(typedKey), String(value))
      }
    }
  })

  return formData
}

export function convertToSLA(value: number, unit: TSLAUnit = 'seconds') {
  // Convert input to seconds
  let totalSeconds: number
  if (unit === 'milliseconds') {
    totalSeconds = Math.floor(value / 1000)
  } else if (unit === 'minutes') {
    totalSeconds = value * 60
  } else {
    totalSeconds = value
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(totalSeconds / (24 * 3600))
  totalSeconds %= 24 * 3600

  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  // Construct the result string
  // const result = [
  //   days > 0 ? `${days} Days` : '',
  //   hours > 0 ? `${hours} Hours` : '',
  //   minutes > 0 ? `${minutes} Minutes` : '',
  //   `${seconds} Seconds`,
  // ]
  //   .filter(Boolean)
  //   .join(' ')

  // return result
  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

export function convertToSLAString(value: number, unit: TSLAUnit = 'seconds'): string {
  const { t } = useI18n()
  const sla = convertToSLA(value, unit)
  const result = [
    sla.days > 0 ? `${sla.days} ${t('days')}` : '',
    sla.hours > 0 ? `${sla.hours} ${t('hours')}` : '',
    sla.minutes > 0 ? `${sla.minutes} ${t('minutes')}` : '',
    `${sla.seconds} ${t('seconds')}`,
  ]
    .filter(Boolean)
    .join(' ')

  return result
}

export const withRepository = async <T, R = T>(
  fn: () => Promise<{ data: T }>,
  transform?: (data: T) => R | Promise<R>,
): Promise<R> => {
  try {
    const { data } = await fn()
    return transform ? await transform(data) : (data as unknown as R)
  } catch (error: any) {
    const isBlob = error?.response?.data instanceof Blob

    if (isBlob) {
      try {
        const text = await error.response.data.text()
        const errorJson = JSON.parse(text)
        // Wrap errorJson inside an Error instance, with JSON string as message
        throw new Error(JSON.stringify(errorJson))
      } catch (parseError) {
        // Wrap the parseError details inside a proper Error
        const err = new Error('Failed to parse error Blob')
        // Optionally attach the original error as a property
        ;(err as any).details = parseError
        throw err
      }
    }

    throw error
  }
}

/**
 *
 * @param fn
 * @param transform
 * @returns
 * @description T is type of data that is returned from the function
 * @description R is type of data that is returned after transformation
 */
export const withUseCase = async <T, R = T>(
  fn: () => Promise<T>,
  transform?: (data: T) => R | Promise<R>,
): Promise<R> => {
  const response = await fn()
  return transform ? await transform(response) : (response as R)
}

/**
 * @param request - A function that takes an AbortSignal and returns a Promise.
 * @description This function creates a cancelable request. It returns an object containing the promise and a cancel function.
 * @returns { promise: Promise<T>, cancel: () => void }
 */
export function createCancelableRequest<T>(options: {
  request: (signal: AbortSignal) => Promise<T>
  before?: () => void
  success?: (result: T) => void
  error?: (error: AxiosError) => void
  finally?: () => void
}) {
  let controller: AbortController | null = new AbortController()

  const execute = async () => {
    try {
      options.before?.()

      controller ??= new AbortController()

      const response = await options.request(controller.signal).finally(() => {
        controller = null
      })
      options.success?.(response)
    } catch (error) {
      options.error?.(error as AxiosError)
    } finally {
      options.finally?.()
    }
  }

  return {
    execute: () => execute(),
    cancel: () => controller?.abort(),
  }
}

export function pascalCase(value: string) {
  return startCase(camelCase(value))?.replace(/ /g, '')
}

export function camelCase(value: string) {
  return LCamelCase(value)?.replace(/ /g, '')
}

export function shortString(value: string, length = 20) {
  const shortString = value?.length > length ? `${value?.substring(0, length)}...` : value
  return shortString
}

export function boolToValue(value: boolean): string {
  const { t } = useI18n()
  return value === true ? t('yes') : t('no')
}

export function isEven(value: number): boolean {
  return !(value & 1)
}

export function isValidDate(value: string): boolean {
  return date.isValid(value)
}

export function stringArrayToQuasarLabel(value: string[]) {
  return value.map((item) => {
    return { label: item, value: item }
  })
}

export function queryParamsParse(query: Record<string, unknown>): Record<string, unknown> {
  const parsed: Record<string, unknown> = {}

  const tryParseValue = (val: unknown): unknown => {
    if (typeof val !== 'string') return val

    // Cek untuk 'null'
    if (val === 'null') return null

    // Cek untuk angka
    if (isNumber(val)) {
      return Number(val)
    }

    // Coba parse JSON (misal object / array)
    try {
      return JSON.parse(val)
    } catch {
      return val
    }
  }

  for (const [key, value] of Object.entries(query)) {
    if (isArray(value)) {
      parsed[key] = value.filter((v): v is string => typeof v === 'string').map((v) => tryParseValue(v))
    } else {
      parsed[key] = tryParseValue(value)
    }
  }

  return parsed
}

export function parsedQuery() {
  const route = useRoute()

  const kSecurity = useKSecurity()
  const q = route.query.q

  let parsedQuery: Record<string, unknown> = {}

  if (typeof q === 'string') {
    const decrypted = kSecurity.decrypt(q)

    if (typeof decrypted === 'string') {
      try {
        const json = JSON.parse(decrypted)
        parsedQuery = queryParamsParse(json)
      } catch (err) {
        console.error('Failed to parse decrypted query:', err)
      }
    } else {
      console.warn('Decryption failed or returned null')
    }
  }
  return parsedQuery
}

/**
 * Generate a filename from Blob + optional headers
 * @param blob The Blob response
 * @param fallbackName Default filename (without extension)
 * @param fallbackExt Optional fallback extension (e.g., 'pdf', 'xlsx')
 * @param headers Optional headers from Axios response (to extract Content-Disposition)
 */
export function generateFilenameFromBlob(
  blob: Blob,
  fallbackName = 'downloaded-file',
  fallbackExt?: string,
  headers?: Record<string, string>,
): string {
  const contentDisposition = headers?.['content-disposition'] ?? ''
  const filenameRegex = /filename[^;=\n]*=["']?([^"';\n]*)["']?/
  const match = filenameRegex.exec(contentDisposition)

  if (match?.[1]) {
    return match[1]
  }

  const ext = fallbackExt ?? blob.type.split('/').pop() ?? 'bin'
  return `${fallbackName}.${ext}`
}

export function formatDate(value: string | isoDate, options: KOptionDate = { isDateTime: false }): string {
  const { format, isDateTime, defaultReturn } = options
  if (!isValidDate(value)) return defaultReturn ?? '-'
  const currentFormat = format ?? (isDateTime ? 'DD MMMM YYYY HH:mm' : 'DD MMMM YYYY')
  return date.formatDate(value, currentFormat)
}

/**
 * Unformat a currency string to a number
 * @param value
 * @param option
 * @returns
 */
export function unformat(value: string, option?: KCurrencyOption): number {
  const config: KCurrencyOption = {
    ...CURRENCY_OPTION,
    ...option,
  }
  return unformatCurrency(value, config) as number
}

/**
 * Format a number to a currency string
 * @param value
 * @param option
 * @returns
 */
export function format(value: string | number | null | undefined, option?: KCurrencyOption): string {
  const config: KCurrencyOption = {
    ...CURRENCY_OPTION,
    ...option,
  }
  return formatCurrency(value, config)
}

export function buildTree<T extends { id: string | number }>(
  items: T[],
  parentKey: keyof T,
): (T & { children: T[] })[] {
  const tree: (T & { children: T[] })[] = []
  const mapped: Record<string | number, T & { children: T[] }> = {}

  // Map each item by its id
  items.forEach((item) => {
    mapped[item.id] = { ...item, children: [] }
  })

  // Build tree
  items.forEach((item) => {
    const parentId = item[parentKey] as unknown as string | number

    if (parentId === null || parentId === undefined) {
      tree.push(mapped[item.id])
    } else {
      mapped[parentId]?.children.push(mapped[item.id])
    }
  })

  return tree
}
