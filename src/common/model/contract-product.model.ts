import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import { ProductV1Response } from './product-v1.model'

export interface ContractProductRequest extends IListSortingRequest {
  contractId: id
}

export type ContractProductRequestPage = IPaginationRequest & ContractProductRequest

export interface ContractProductResponse extends ProductV1Response {
  id: id
  productId: id
  contractId: id
  contractNumber: string
  workPackageId: id
  workPackageName: string
  subWorkPackageId: id
  subWorkPackageName: string
  siteId: id
  siteName: string
  palletNumber: string
  boqPackage: string
  origin: string
  sampleNumber: string
  serialNumber: string
  srtSerialNumber: string
  srtPartNumber: string
  inContract: boolean
}

export interface ContractProductResponsePage extends ContractProductResponse {}

export interface ContractProductDataRequest extends ContractProductResponse {}
