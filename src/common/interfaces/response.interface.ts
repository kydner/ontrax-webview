import { HttpStatusCode as AxiosStatusCode } from 'axios'
import { MasterParameterDataRequest } from '../model/master-parameter.model'

export type TBaseResponseMessage = 'OK' | 'BLOCKED' | 'Success'

export interface BaseResponse<T = unknown> {
  /**
   * Status code representing the result of the API call.
   * - `'00'`: Request successful
   * - `'01'`: Negative Check Passed
   * - `'50'`: Failed process data post
   * - `'51'`: Data not found
   * - `'52'`: Data already exist
   * - `'53'`: Account locked
   * - `'54'`: Account disabled
   * - `'55'`: Authentication failed
   * - `'56'`: Access denied
   * - `'57'`: Request is not in accordance
   * - `'58'`: Password expired
   * - `'97'`: M-gate error
   * - `'98'`: M-gate pass logic validation
   * - `'99'`: Internal server error
   */
  code: TStatusCode
  message: TBaseResponseMessage
  errors?: BaseErrorResponse
  data: T
  timestamp: isoDate
}

export interface BaseResponsePage<T = unknown> {
  code: string
  message: TBaseResponseMessage
  data: IDataPage<T>
}

export interface IDataPage<T = unknown> {
  content: T[]
  pageable: IPageable
  totalElements: number
  last: boolean
  totalPages: number
  sort: ISortPage
  numberOfElements: number
  first: boolean
  size: number
  number: number
  empty: boolean
}

export interface IPageable {
  sort: ISortPage
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ISortPage {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface BaseErrorResponse {
  responseMessage: string
  responseCode: string
}

export type TBaseSortDirection = 'ASC' | 'DESC'

export interface ISortingRequest {
  sortDirection?: TBaseSortDirection
  sortColumn?: string
}

export interface IListSortingRequest extends ISortingRequest {
  keyword?: string
}

export interface IPaginationRequest extends IListSortingRequest {
  size?: number
  page?: number
}

export interface IUseCaseResponse<T = unknown> {
  data: IDataPage<T>
}

export type id = number | string

export type isoDate = string & { __brand: 'isoDate' }

export type parameterId = MasterParameterDataRequest['id']

/**
 * Status code type for API responses.
 */
export type TStatusCode =
  // success
  '00' | '01' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '97' | '98' | '99'

export const HttpStatus = {
  [AxiosStatusCode.Ok]: {
    // '00':
  },
}

export interface ResponseState<T> {
  isLoading: boolean
  data: T | null
  errorMessage: string | null
}

export interface ResponseStatePage<T> {
  isLoading: boolean
  data: IDataPage<T> | null
  errorMessage: string | null
}

export interface RequestState<T> extends ResponseState<T> {}
