import { id } from '../interfaces/response.interface'
export interface LoginDataRequest {
  username: string
  password: string
}

export interface ChangeRoleRequest {
  roleId: id
}

export interface LoginDataResponse {
  token: string | null

  xRequestId: string | null

  expireDuration: number

  refreshToken: string | null

  startRefreshTime: number

  /** value as seconds */
  accessTokenExpired: number

  // autoSaveDuration: number
}

export interface ChangeRoleResponse extends LoginDataResponse {}
