import { id } from '../interfaces/response.interface'

export interface ProfileResponse {
  id: id
  fullName: string
  username: string
  email: string
}

export interface MenuGroup {
  code: string | null
  name: string
  sequence: number
  menu: MenuProfile[]
}

export interface RoleProfileResponse {
  id: id
  name: string
  icon: string
  minimumLimit: number
  maximumLimit: number
  currentlyActive: boolean
}

export interface MenuProfile {
  id: id
  code: string
  name: string
  icon: string
  page: string
  sequence: number
}
