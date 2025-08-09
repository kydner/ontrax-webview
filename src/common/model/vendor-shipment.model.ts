import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  OperationalDataRequest,
  OperationalRequest,
  OperationalResponse,
  OperationalResponsePage,
} from './operational.model'

export interface VendorShipmentRequest extends IListSortingRequest, OperationalRequest {}

export type VendorShipmentRequestPage = IPaginationRequest & VendorShipmentRequest

export interface VendorShipmentResponse extends OperationalResponse {}

export interface VendorShipmentResponsePage extends OperationalResponsePage {}

export interface VendorShipmentDataRequest extends OperationalDataRequest {}
