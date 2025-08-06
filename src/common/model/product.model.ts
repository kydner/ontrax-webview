import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ProductRequest extends IListSortingRequest {}

export type ProductRequestPage = IPaginationRequest & ProductRequest

export interface ProductResponse {
  itemId: id
  skuCode: string
  itemName: string
  description: string
  unit: string
  unitPrice: number
  isActive: boolean
}

export interface ProductResponsePage extends ProductResponse {}

export interface ProductDataRequest extends Omit<ProductResponse, 'itemId'> {}
