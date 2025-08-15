import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ProductAvailableItemRequest extends IListSortingRequest {}

export type ProductAvailableItemRequestPage = IPaginationRequest & ProductAvailableItemRequest

export interface ProductAvailableItemResponse {
  itemId: id
  skuCode: string
  itemName: string
  availableQty: 0
  imageId: id
}

export interface ProductAvailableItemResponsePage extends ProductAvailableItemResponse {}

export interface ProductAvailableItemDataRequest extends Omit<ProductAvailableItemResponse, 'itemId'> {}
