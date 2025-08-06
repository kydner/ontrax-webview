import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ClientRequest extends IListSortingRequest {}

export type ClientRequestPage = IPaginationRequest & ClientRequest

export interface ClientResponse {
  id: id
  name: string
  country: string
}

export interface ClientResponsePage extends ClientResponse {}

export interface ClientDataRequest extends ClientResponse {}
