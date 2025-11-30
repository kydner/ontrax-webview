import { IPaginationRequest } from 'src/common/interfaces/response.interface'
import {
  TransferItemDataRequest,
  TransferItemRequest,
  TransferItemResponse,
  TransferItemResponsePage,
} from './transfer-item.model'

export interface MantenanceStatusRequest extends TransferItemRequest {}

export type MantenanceStatusRequestPage = IPaginationRequest & MantenanceStatusRequest

export interface MantenanceStatusResponse extends TransferItemResponse {}

export interface MantenanceStatusResponsePage extends MantenanceStatusResponse, TransferItemResponsePage {}

export interface MantenanceStatusDataRequest extends MantenanceStatusResponse, TransferItemDataRequest {}
