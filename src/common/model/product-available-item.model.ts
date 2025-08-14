import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ProductAvailableItemRequest extends IListSortingRequest {}

export type ProductAvailableItemRequestPage = IPaginationRequest & ProductAvailableItemRequest

export interface ProductAvailableItemResponse {
  itemId: id
  skuCode: string
  itemName: string
  categoryId: id
  categoryValue: string
  description: string
  unit: string
  unitPrice: number
  isActive: boolean
  imageId: id
}

export interface ProductAvailableItemResponsePage extends ProductAvailableItemResponse {}

export interface ProductAvailableItemDataRequest extends Omit<ProductAvailableItemResponse, 'itemId'> {}
