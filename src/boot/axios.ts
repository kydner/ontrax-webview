import { boot } from 'quasar/wrappers'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { useAppStore } from 'src/stores/app.store'
import { useAuthenticationStore } from 'src/stores/authentication.store'
import { $confirm, $showErrorResponse } from 'src/common/utils/plugin.utils'
import { useCancelTokenStore } from 'src/stores/cancel-token.store'
import { BaseResponse } from 'src/common/interfaces/response.interface'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { Loading } from 'quasar'
import { useAuthenticationRepository } from 'src/common/repository/authentication.repository'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  /** baseurl set by env */
  baseURL: `/${process.env.APP_SERVICE_PREFIX}`,
  /**
   * set timeout request to service
   * default set to 30 seconds
   * */
  timeout: 1000 * 60 * 0.5,
})

let requestCount = 0

let controller: AbortController | null = new AbortController()

const onRequestEnd = () => {
  const appStore = useAppStore()
  const cancelTokenStore = useCancelTokenStore()

  if (controller) {
    cancelTokenStore.remove(controller)
    controller = null // <- setelah remove
  }

  requestCount--
  if (requestCount === 0) {
    appStore.setLoading(false)
  }
}

api.interceptors.request.use(function (config) {
  const appStore = useAppStore()
  const authStore = useAuthenticationStore()
  const cancelTokenStore = useCancelTokenStore()
  const token = authStore.$state.token

  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }

  if (requestCount === 0) {
    appStore.setLoading(true)
  }

  config.headers['x-source-web'] = 'C5EE58DA23B3465690906C10E730A22D'

  requestCount++

  controller ??= new AbortController()

  cancelTokenStore.add(controller)

  return { signal: controller.signal, ...config }
})

api.interceptors.response.use(
  function (response) {
    onRequestEnd()

    return response
  },
  function (error: AxiosError<BaseResponse>) {
    const authRepo = useAuthenticationRepository()

    onRequestEnd()

    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      if (error.response?.data?.code === '40') {
        authRepo.logout()
      }
      if (error.response?.data?.code === '56') {
        $confirm({
          button: { submit: { label: 'Logout' } },
          message: getErrorMessage(error),
          callback: (confirm) => {
            if (confirm) {
              Loading.show()
              authRepo.logout().finally(() => {
                Loading.hide()
              })
            }
          },
        })
        return new Promise(() => null)
      }
    }

    if (error?.response?.status === HttpStatusCode.Forbidden) {
      if (error.response?.data?.code === '55') {
        $showErrorResponse({
          error,
          callback: (confirm) => {
            if (confirm) {
              authRepo.logout()
            }
          },
        })
        return new Promise(() => null)
      }
    }
    return Promise.reject(error)
  },
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
