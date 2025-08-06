import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorRequest extends IListSortingRequest {}

export type VendorRequestPage = IPaginationRequest & VendorRequest

export interface VendorResponse {
  vendorId: id
  vendorName: string
  contactPerson: string
  phone: string
  email: string
  address: string
  VendorId: string
  VendorName: string
}

export interface VendorResponsePage extends VendorResponse {}

export interface VendorDataRequest extends VendorResponse {}
