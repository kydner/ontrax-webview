import {
  ChangeRoleRequest,
  ChangeRoleResponse,
  LoginDataRequest,
  LoginDataResponse,
} from '../model/authentication.model'
import { Delete, Get, Post } from '../services/api.service'
import { ProfileResponse } from '../model/profile.model'
import { defineEndpoint } from '../utils/plugin.utils'
import { AuthenticationRefreshTokenResponse } from '../model/authentication-refresh-token.model'

export const useAuthenticationEndpoint = defineEndpoint({
  login: (data: LoginDataRequest) => Post<LoginDataResponse, LoginDataRequest>('auth/login', data),

  // login: (data: LoginDataRequest) => Post<LoginDataResponse, LoginDataRequest>('v3/auth/login', data),

  profile: () => Get<ProfileResponse>('user/profile'),
  // profile: () => Get<ProfileResponse>('v3/auth/profile'),

  logout: () => Delete<unknown>('auth/logout'),

  changeRole: (data: ChangeRoleRequest) => Post<ChangeRoleResponse>('auth/change-role', data),

  refreshToken: () => Post<AuthenticationRefreshTokenResponse>('auth/refresh'),
})
