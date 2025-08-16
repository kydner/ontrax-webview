import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'
import { LocationSiteResponse } from './location-site.model'

export interface LocationWarehouseRequest extends IListSortingRequest {
  isActive?: boolean
}

export type LocationWarehouseRequestPage = IPaginationRequest & LocationWarehouseRequest

export interface LocationWarehouseResponse {
  id: id
  locationWarehouseId: id
  locationSiteId: id
  warehouseName: string
  warehouseCode: string
  capacity: number
  isActive: boolean
  createdDate: isoDate
  updatedDate: isoDate
  createdBy: string
  updatedBy: string
  locationSite: Pick<LocationSiteResponse, 'locationSiteId' | 'siteName' | 'siteCode'>
}

export interface LocationWarehouseResponsePage extends LocationWarehouseResponse {}

export interface LocationWarehouseDataRequest
  extends Pick<
    LocationWarehouseResponse,
    'locationSiteId' | 'warehouseName' | 'warehouseCode' | 'capacity' | 'isActive'
  > {}
