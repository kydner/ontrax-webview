import {
  ChangeRoleRequest,
  ChangeRoleResponse,
  LoginDataRequest,
  LoginDataResponse,
} from '../model/authentication.model'
import { Delete, Get, Post } from '../services/api.service'
import { ProfileResponse } from '../model/profile.model'
import { defineEndpoint } from '../utils/plugin.utils'
import {
  AuthenticationRefreshTokenDataRequest,
  AuthenticationRefreshTokenResponse,
} from '../model/authentication-refresh-token.model'
import { useAuthenticationStore } from 'src/stores/authentication.store'

export const useAuthenticationEndpoint = defineEndpoint({
  login: (data: LoginDataRequest) => Post<LoginDataResponse, LoginDataRequest>('v1/auth/login', data),

  // login: (data: LoginDataRequest) => Post<LoginDataResponse, LoginDataRequest>('v3/auth/login', data),

  profile: () => Get<ProfileResponse>('v1/user/profile'),
  // profile: () => Get<ProfileResponse>('v3/auth/profile'),

  logout: () => {
    const authStore = useAuthenticationStore()
    const refreshToken = authStore.$state?.refreshToken
    return Delete<unknown>('v1/auth/logout', {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    })
  },

  changeRole: (data: ChangeRoleRequest) => Post<ChangeRoleResponse>('auth/change-role', data),

  refreshToken: (data: AuthenticationRefreshTokenDataRequest) =>
    Post<AuthenticationRefreshTokenResponse>('v1/auth/refresh', data),
})
