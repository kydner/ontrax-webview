import { ChangeRoleRequest, ChangeRoleResponse, LoginDataRequest } from '../model/authentication.model'
import { ProfileResponse } from '../model/profile.model'
import allsettled from 'promise.allsettled'
import { useAuthenticationEndpoint } from '../endpoints/authentication.endpoint'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { setIdleTime } from '../utils/auth.utils'
import { useAppStore } from 'src/stores/app.store'
import { useAuthenticationStore } from 'src/stores/authentication.store'
import { getErrorMessage } from '../utils/error.utils'
import { AxiosError } from 'axios'
import { clearAllImages } from '../utils/image-cache.utils'

const authEndpoint = useAuthenticationEndpoint()

const appStore = useAppStore()

const authStore = useAuthenticationStore()

export const actionProfile = () => {
  const promises: [Promise<ProfileResponse>] = [profile()]
  return new Promise((resolve, reject) => {
    allsettled(promises)
      .then((responses) => {
        const isValidAll = responses.every(({ status }) => status === 'fulfilled')
        if (!isValidAll) {
          authStore.$state.isLoggedIn = false
          authStore.$state.token = null

          const rejected = responses?.find(({ status }) => status === 'rejected')
          throw new Error(getErrorMessage((rejected as { reason: AxiosError })?.reason))
        }
        /// clear all profile
        appStore.$state.profile = undefined

        const profile = (responses?.[0] as { value: ProfileResponse }).value

        /// set profile
        appStore.$state.profile = profile

        /// set isLoggedIn & idle time here for used to on change-role
        authStore.$state.isLoggedIn = true

        /// clear all image cache
        clearAllImages()

        setIdleTime()

        resolve(profile)
      })
      .catch(reject)
  })
}

const profile = () => withRepository<ProfileResponse>(() => authEndpoint.profile())

export const useAuthenticationRepository = defineRepository({
  login: (params: LoginDataRequest) => {
    return new Promise((resolve, reject) => {
      authEndpoint
        .login(params)
        .then(({ data }) => {
          const authStore = useAuthenticationStore()
          const token = data.token
          const accessTokenExpired = 60 * 60 * 1 /// set jadi 1 jam,  data.accessTokenExpired || 0

          authStore.$state.token = token

          /** access token from backend is millisecond then convert to second */
          authStore.$state.accessTokenExpired = accessTokenExpired /// 1000
          actionProfile()
            .then(() => {
              resolve(token)
            })
            .catch(reject)
        })
        .catch(reject)
    })
  },

  profile: () => withRepository<ProfileResponse>(() => authEndpoint.profile()),

  logout: () =>
    authEndpoint
      .logout()
      .then(() => {
        authStore.reset()
        location.reload()
      })
      .catch(() => {
        authStore.reset()
        location.reload()
      }),

  changeRole: (data: ChangeRoleRequest) => withRepository<ChangeRoleResponse>(() => authEndpoint.changeRole(data)),
})
