import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'

export interface LocationSiteRequest extends IListSortingRequest {}

export type LocationSiteRequestPage = IPaginationRequest & LocationSiteRequest

export interface LocationSiteResponse {
  id: id
  locationSiteId: string
  siteName: string
  siteCode: string
  address: string
  isActive: boolean
  isDeleted: boolean
  createdDate: isoDate
  updatedDate: isoDate
  createdBy: string
  updatedBy: string
}

export interface LocationSiteResponsePage extends LocationSiteResponse {}

export interface LocationSiteDataRequest extends LocationSiteResponse {}
