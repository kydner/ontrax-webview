import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface VendorRequest extends IListSortingRequest {}

export type VendorRequestPage = IPaginationRequest & VendorRequest

export interface VendorResponse {
  id: id
  vendorClientName: string
  phoneNumber: string
  email: string
  contactPerson: string
  address: string
  type: string
}

export interface VendorResponsePage extends VendorResponse {}

export interface VendorDataRequest extends VendorResponse {}
