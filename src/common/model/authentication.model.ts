import { id } from '../interfaces/response.interface'
export interface LoginDataRequest {
  username: string
  password: string
}

export interface ChangeRoleRequest {
  roleId: id
}

export interface LoginDataResponse {
  accessToken: string | null

  /** value as seconds */
  accessTokenExpired: number

  autoSaveDuration: number
}

export interface ChangeRoleResponse extends LoginDataResponse {}
