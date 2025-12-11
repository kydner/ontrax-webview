import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ProductAttributeV1Request extends IListSortingRequest {}

export type ProductAttributeV1RequestPage = IPaginationRequest & ProductAttributeV1Request

export interface ProductAttributeV1Response {
  id: id
  attributeName: string
  attributeValue: string
  productId: string
}

export interface ProductAttributeV1ResponsePage extends ProductAttributeV1Response {}

export interface ProductAttributeV1DataRequest extends ProductAttributeV1Response {}
