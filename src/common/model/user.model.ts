import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'

export interface UserRequest extends IListSortingRequest {}

export type UserRequestPage = IPaginationRequest & UserRequest

export interface UserResponse {
  id: id
  username: string
  fullName: string
  email: string
  phoneNumber: string
  lastLogin: isoDate
  lastPasswordUpdated: isoDate
  failedLoginAttempts: number
  isAccountNonExpired: boolean
  isAccountNonLocked: boolean
  isCredentialsNonExpired: boolean
  isEnabled: boolean
  roleIds: id[]
}

export interface UserResponsePage extends UserResponse {}

export interface UserDataRequest extends UserResponse {}
