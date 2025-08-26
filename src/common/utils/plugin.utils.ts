import { AxiosError } from 'axios'
import { bus } from '../event-bus'
import { IOptionConfirm, IOptionNotification } from '../interfaces/lib.interface'
import { getErrorMessage } from './error.utils'
import { BaseResponse } from '../interfaces/response.interface'
import { EXTENSION_TO_MIME, TExtension } from '../constants/mime.constant'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Notify as QNotify, QNotifyCreateOptions, copyToClipboard as copyClipboard } from 'quasar'
import { ERROR_NO_COPY_CLIPBOARD } from '../constants/error.constant'
import { UserMenu } from '../model/profile.model'
interface INotifyCreateOptions extends Omit<QNotifyCreateOptions, 'message'> {
  message: AxiosError<BaseResponse> | BaseResponse | Error
}

export const $confirm = (args: IOptionConfirm): void => {
  bus.emit('$confirm', args)
}

export const $showNotif = (args: IOptionNotification): void => {
  bus.emit('$notification', args)
}

export const $showErrorResponse = (
  args: Pick<IOptionNotification, 'callback'> & {
    callback?: IOptionNotification['callback']
    error: AxiosError<BaseResponse> | BaseResponse | Error
  },
): void => {
  const type = 'negative'
  bus.emit('$notification', {
    message: getErrorMessage(args.error),
    callback: args.callback,
    type,
  })
}

export const defineEndpoint =
  <T>(options: T) =>
  () =>
    options

export const defineRepository =
  <T>(options: T) =>
  () =>
    options

export const defineUseCase =
  <T>(options: T) =>
  () =>
    options

export const defineBase =
  <T>(options: T) =>
  () =>
    options

export const useMime = defineBase({
  lookup: (fileNameOrExt: string) => {
    const ext = fileNameOrExt.split('.').pop()?.toLowerCase() // Pastikan lowercase
    if (ext && ext in EXTENSION_TO_MIME) {
      return EXTENSION_TO_MIME[ext as TExtension] // Pakai type assertion
    }
    return false
  },
})

/**
 *
 * @param actionMethod
 * @param duration seconds
 * @returns start & stop
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const useActivityTimer = (actionMethod: () => void, duration = 0) => {
  let inactivityTimer: number | null = null

  /** convert to second */
  const currentDuration = duration * 1000

  /** start activity */
  const start = () => {
    if (inactivityTimer !== null) {
      clearTimeout(inactivityTimer)
    }
    if (currentDuration) inactivityTimer = window.setTimeout(actionMethod, currentDuration)
  }

  /** register start activity */
  window.addEventListener('mousemove', start)
  window.addEventListener('keydown', start)

  /** stop activity */
  const stop = () => {
    if (inactivityTimer !== null) {
      clearTimeout(inactivityTimer)
      inactivityTimer = null
    }
    /** clear all activity */
    window.removeEventListener('mousemove', start)
    window.removeEventListener('keydown', start)
  }

  return {
    start,
    stop,
  }
}

export const useKRoute = () => {
  const route = useRoute()

  const pageName = computed(() => {
    const substract = route.path?.split('/')
    return substract?.[1]
  })
  return {
    pageName: pageName.value,
  }
}

export const Notify = {
  error: (params: INotifyCreateOptions) =>
    QNotify.create({
      ...params,
      message: getErrorMessage(params?.message),
      icon: params?.icon ?? 'warning',
      type: params?.type ?? 'negative',
    }),
  create: (params: QNotifyCreateOptions) => QNotify.create({ ...params }),
  success: (params: QNotifyCreateOptions) =>
    QNotify.create({ ...params, type: params?.type ?? 'positive', icon: params?.icon ?? 'check_circle_outline' }),
}

export const useEnv = defineBase({
  getName: () => {
    return process.env.APP_NAME ?? 'development'
  },
})

/**
 * Ensure that the specified fields exist in the object and return a new object with those fields.
 * If a field does not exist, it will be set to an empty object.
 * @param obj The object to check.
 * @param fields The fields to ensure exist in the object.
 * @returns A new object with the specified fields.
 * If a field does not exist in the original object, it will be set to an empty object.
 * If the field exists, it will be copied as is.
 */
export const ensureFields = <T extends Record<string, any>>(obj: T, fields: (keyof T)[]): T => {
  const result: any = {}
  for (const field of fields) {
    result[field] = obj?.[field] || {}
  }
  return result
}

export function copyToClipboard(value: string | undefined): void {
  if (!value) {
    Notify.create({
      message: ERROR_NO_COPY_CLIPBOARD,
      type: 'warning',
    })
  } else {
    copyClipboard(value).then(() => {
      Notify.create({
        message: `${value} Copied`,
        type: 'positive',
        icon: 'content_copy',
      })
    })
  }
}

/**
 *
 * @param targetClass class with dot. ex: .target-section
 * @param headerOffset distance from top. default 0
 */
export const scrollToClass = (targetClass: string, headerOffset = 0) => {
  const target = document.querySelector<HTMLElement>(targetClass)
  if (target) {
    const elementPosition = target.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export function findMenuByKey<T extends keyof UserMenu>(
  menus: UserMenu[],
  key: T,
  value: UserMenu[T],
): UserMenu | null {
  for (const menu of menus) {
    if (menu[key] === value) {
      return menu
    }

    if (menu.childMenus?.length) {
      const found = findMenuByKey(menu.childMenus, key, value)
      if (found) return found
    }
  }
  return null
}
