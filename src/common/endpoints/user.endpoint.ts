import { id } from '../interfaces/response.interface'
import { UserDataRequest, UserRequest, UserRequestPage, UserResponse, UserResponsePage } from '../model/user.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useUserEndpoint = defineEndpoint({
  getPage: (params?: UserRequestPage) =>
    GetPage<UserResponsePage>('user/page', {
      params,
    }),

  getAll: (params?: UserRequest) =>
    Get<UserResponse[]>('user', {
      params,
    }),

  getOne: (id: id) => Get<UserResponse>(`user/${id}`),

  create: (data: UserDataRequest) => Post('user', data),

  update: (id: id, data: UserDataRequest) => Put(`user/${id}`, data),

  delete: (id: id) => Delete(`user/${id}`),
})
