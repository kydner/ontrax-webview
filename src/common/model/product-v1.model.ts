import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { ProductAttributeV1Response } from './product-attribute-v1.model'

export interface ProductV1Request extends IListSortingRequest {
  isActive?: boolean
}

export type ProductV1RequestPage = IPaginationRequest & ProductV1Request

export interface ProductV1Response {
  id: id
  manufacturerDescription: string
  manufacturerPartNumber: string
  productName: string
  manufacturer: string
  srtPartNumber: string
  productCategory: string
  isUniqueSerialNumber: true
  unit: string
  productImageUrl: string
  productCategoryId: id
  attributes: ProductAttributeV1Response[]
}

export interface ProductV1ResponsePage extends ProductV1Response {}

export interface ProductV1DataRequest extends ProductV1Response {}
