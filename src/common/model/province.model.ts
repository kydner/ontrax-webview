import { id, IListSortingRequest, IPaginationRequest } from 'src/common/interfaces/response.interface'

export interface ProvinceRequest extends IListSortingRequest {}

export type ProvinceRequestPage = IPaginationRequest & ProvinceRequest

export interface ProvinceResponse {
  provinceId: id
  provinceName: string
  provinceCode: string
}

export interface ProvinceResponsePage extends ProvinceResponse {}

export interface ProvinceDataRequest extends ProvinceResponse {}
