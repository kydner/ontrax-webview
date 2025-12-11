import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ContractProductRequest extends IListSortingRequest {}

export type ContractProductRequestPage = IPaginationRequest & ContractProductRequest

export interface ContractProductResponse {
  id: id
  productId: id
  productName: string
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
