import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface AuthenticationRefreshTokenRequest extends IListSortingRequest {}

export type AuthenticationRefreshTokenRequestPage = IPaginationRequest & AuthenticationRefreshTokenRequest

export interface AuthenticationRefreshTokenResponse {
  token: string
  refreshToken: string
  expireDuration: number
}

export interface AuthenticationRefreshTokenResponsePage extends AuthenticationRefreshTokenResponse {}

export interface AuthenticationRefreshTokenDataRequest extends AuthenticationRefreshTokenResponse {}
