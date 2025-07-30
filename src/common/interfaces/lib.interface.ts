import { AxiosError } from 'axios'
import { BaseResponse } from './response.interface'

export interface IQTableEvent<T = unknown> {
  key: unknown
  row: T
  pageIndex: number
  col?: IQTableCol
  cols?: IQTableCol[]
  colsMap?: unknown
  rowIndex?: number
  color?: string
  dark?: boolean
  dense?: boolean
  expand?: boolean
}

export interface IQTableCol {
  name: string
  label: string
  field: string
  align: string
  style?: string
  __iconClass: string
  __thClass: string
}

export interface IOptionConfirm {
  title?: string
  message: string
  button?: { cancel?: { label: string }; submit?: { label: string } }
  submitColor?: 'primary' | 'positive' | 'negative' | 'info' | 'warning'
  callback: (confirm?: boolean) => void
}

export type KNotificationType = 'positive' | 'negative' | 'info' | 'warning'
export interface IOptionNotification {
  message: string
  type: KNotificationType
  callback?: (confirm?: boolean) => void
}

export type TErrorMessage<T = unknown> = AxiosError<BaseResponse> | BaseResponse<T> | Error

export interface KStepItems {
  title: string
  icon?: string
  t?: string
}

export interface ICreateApplicantStep extends KStepItems {
  icon?: string
  components: unknown
}
