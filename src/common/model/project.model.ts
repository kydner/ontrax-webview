import { id, IListSortingRequest, IPaginationRequest, isoDate } from 'src/common/interfaces/response.interface'

export interface ProjectRequest extends IListSortingRequest {}

export type ProjectRequestPage = IPaginationRequest & ProjectRequest

export interface ProjectResponse {
  id: id
  projectName: string
  startDate: isoDate
  endDate: isoDate
  status: string
}

export interface ProjectResponsePage extends ProjectResponse {}

export interface ProjectDataRequest extends ProjectResponse {}
