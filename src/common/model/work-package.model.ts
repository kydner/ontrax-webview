import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'

export interface ProjectRequest extends IListSortingRequest {}

export type ProjectRequestPage = IPaginationRequest & ProjectRequest

export interface ProjectResponse {
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

export interface ProjectResponsePage extends ProjectResponse {}

export interface ProjectDataRequest extends ProjectResponse {}
