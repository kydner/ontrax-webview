import { IListSortingRequest, IPaginationRequest, id } from 'src/common/interfaces/response.interface'

export interface MasterParameterRequest extends IListSortingRequest {
  type?: string[]
}

export type MasterParameterRequestPage = IPaginationRequest & MasterParameterRequest

export interface MasterParameterResponse {
  id?: id
  code: string
  codeT24: string
  type: string
  isSystem: boolean
  value: string
  description: string
  sequence: number
  group: string
  /** custom name for limit reference */
  limitReferenceName?: string
}

export interface MasterParameterResponsePage extends MasterParameterResponse {}

export interface MasterParameterDataRequest extends MasterParameterResponse {
  id: id
}
