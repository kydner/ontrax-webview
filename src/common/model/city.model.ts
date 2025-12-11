import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface CityRequest extends IListSortingRequest {}

export type CityRequestPage = IPaginationRequest & CityRequest

export interface CityResponse {
  cityId: id
  cityName: string
  cityCode: string
  provinceId: id
  provinceName: string
}

export interface CityResponsePage extends CityResponse {}

export interface CityDataRequest extends CityResponse {}
