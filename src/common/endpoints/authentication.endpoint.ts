import {
  ChangeRoleRequest,
  ChangeRoleResponse,
  LoginDataRequest,
  LoginDataResponse,
} from '../model/authentication.model'
import { Delete, Get, Post } from '../services/api.service'
import { ProfileResponse } from '../model/profile.model'
import { defineEndpoint } from '../utils/plugin.utils'

export const useAuthenticationEndpoint = defineEndpoint({
  login: (data: LoginDataRequest) => Post<LoginDataResponse, LoginDataRequest>('auth/login', data),

  // login: (data: LoginDataRequest) => Post<LoginDataResponse, LoginDataRequest>('v3/auth/login', data),

  profile: () => Get<ProfileResponse>('user/profile'),
  // profile: () => Get<ProfileResponse>('v3/auth/profile'),

  logout: () => Delete<unknown>('v3/auth/logout'),

  changeRole: (data: ChangeRoleRequest) => Post<ChangeRoleResponse>('v3/auth/change-role', data),
})
