import { id, isoDate } from '../interfaces/response.interface'
import { ClientResponse } from './client.model'

export interface ProfileResponse {
  id: id
  fullName: string
  username: string
  email: string
  isEnabled: boolean
  isActivation: boolean
  isAccountNonLocked: boolean
  lastPasswordUpdated: isoDate
  roles: UserRole[]
  menus: UserMenu[]
  client: ClientResponse
}

export interface UserRole {
  id: id
  name: string
  icon: string
  currentlyActive: boolean
}

export interface UserMenu {
  id: id
  code: string
  name: string
  icon: string
  page: string
  sequence: number
  parentMenuId?: id | null
  sourceType: 'MOBILE' | 'WEB'
  componentType: string
  childMenus: UserMenu[]
}
