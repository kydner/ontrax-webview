import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ContractRequest extends IListSortingRequest {}

export type ContractRequestPage = IPaginationRequest & ContractRequest

export interface ContractResponse {
  id: id
  vendorId: id
  contractNumber: string
  shipmentNumber: string
  totalQty: number
}

export interface ContractResponsePage extends ContractResponse {}

export interface ContractDataRequest extends ContractResponse {}
