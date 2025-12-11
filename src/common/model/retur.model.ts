import { IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ReturRequest extends IListSortingRequest {}

export type ReturRequestPage = IPaginationRequest & ReturRequest

export interface ReturResponse {}

export interface ReturResponsePage extends ReturResponse {}

export interface ReturDataRequest extends ReturResponse {}
