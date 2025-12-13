import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'

export interface WorkPackageRequest extends IListSortingRequest {}

export type WorkPackageRequestPage = IPaginationRequest & WorkPackageRequest

export interface WorkPackageResponse {
  id: id
  name: string
  type: 'MAIN'
  warehouseId: id
  code: string
  periodStart: isoDate
  periodEnd: isoDate
  parentPackageId: string
  parentPackageName: string
  projectId: id
  projectName: string
}

export interface WorkPackageResponsePage extends WorkPackageResponse {}

export interface WorkPackageDataRequest extends WorkPackageResponse {}
