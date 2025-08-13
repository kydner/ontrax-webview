import { QTableColumn } from 'quasar'
import { id, IDataPage } from './response.interface'
import { IStoreState } from './store.interface'
import { MessageSchema } from 'src/boot/i18n'

export interface IMetaModule<T = unknown> {
  id: string | number
  title: string
  name: string
  t?: keyof MessageSchema
  columns: IQColumns<T>[]
  sortColumn?: string[]
  visibleColumns?: T[]
}

export interface IMetaListModule<T = unknown> {
  title: string
  name: string
  items: IQItems<T>[]
}

export interface IQItems<T = unknown> {
  name: keyof T
  field: keyof T | ((row: any) => any)
  visible?: boolean
}

export interface IQColumns<T = unknown> extends Omit<QTableColumn, 'name' | 'field'> {
  fieldType?: TFieldType
  t?: keyof MessageSchema
  name: keyof T
  field: keyof T | ((row: any) => any)
  visible?: boolean
}

export interface MetaFlowTab {
  name: string /// FlowTabName
  label: string
  t?: keyof MessageSchema
}

type TFieldType = 'boolean' | 'date' | 'datetime' | 'currency'

export interface IMetaEndpoint {
  /**
   * Get all data from api
   * @param params model
   * @param id
   */
  getAll?(params?: unknown, id?: unknown): Promise<unknown[]>

  /**
   * Get pagination from api
   * @param params model
   * @param id
   */
  getPage?(params?: unknown, id?: unknown): Promise<IDataPage<unknown[]>>

  /**
   * Get single data from api
   * @param id primary key
   */
  getOne?(id?: unknown): Promise<unknown>

  /**
   * Create data
   * @param data model
   * @param id
   */
  create?(data?: unknown, id?: unknown): Promise<unknown>

  /**
   * Update data
   * @param data model
   * @param id
   */
  update(id?: unknown, data?: unknown): Promise<unknown>

  /**
   * Delete data
   * @param id
   * @returns
   */

  inTransit<T>(id: id): Promise<T>

  receive<T, R, P>(id: id, data: R, params: P): Promise<T>

  qualityCheck<RES, REQ>(id: id, data: REQ): Promise<RES>

  delete?: (id: unknown) => Promise<unknown>

  [keys: string]: unknown
}

export interface IMetaState {
  meta: {
    [keys: string]: IStoreState
  }
}
