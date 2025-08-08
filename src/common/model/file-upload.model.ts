import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface FileUploadRequest extends IListSortingRequest {
  module: 'SHIPMENT' | 'QC_SHIPMENT_ITEM' | 'PRODUCT' | 'TRANSFER' | 'QC_TRANSFER_ITEM'
}

export type FileUploadRequestPage = IPaginationRequest & FileUploadRequest

export interface FileUploadResponse {
  fileId: id
  filename: string
  fileUrl: string
}

export interface FileUploadResponsePage extends FileUploadResponse {}

export interface FileUploadDataRequest extends FileUploadResponse {}
