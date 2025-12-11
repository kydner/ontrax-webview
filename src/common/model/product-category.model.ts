import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ProductCategoryRequest extends IListSortingRequest {}

export type ProductCategoryRequestPage = IPaginationRequest & ProductCategoryRequest

export interface ProductCategoryResponse {
  id: id
  categoryName: string
  description: string
  isActive: boolean
}

export interface ProductCategoryResponsePage extends ProductCategoryResponse {}

export interface ProductCategoryDataRequest extends ProductCategoryResponse {}
