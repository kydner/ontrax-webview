import { id } from '../interfaces/response.interface'

export interface ProfileResponse {
  id: id
  fullName: string
  username: string
  email: string
  roles: UserRole[]
  menus: UserMenu[]
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
  childMenus: UserMenu[]
}
