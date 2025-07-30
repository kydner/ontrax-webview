import { FormMode } from '../enum/form.enum'
import { id } from './response.interface'

export interface IInquiryState {
  branchId?: id | null
  productId?: id | null
  customerTypeId?: id | null
  subProductId?: id | null
  inquiryValue?: string | null
  loanProposalId?: id | null
}
export interface IStoreState {
  /**
   * Primary key on Database
   */
  formId?: unknown

  /**
   * Form Mode (Create: 1, Edit: 2, etc)
   */
  formMode: FormMode | null

  /**
   * Used for store data from row table
   */
  storeData?: unknown

  /** used for save state of inquiry applicant */
  inquiry: IInquiryState

  /** used for show/hide columns on k-table */
  hideColumns: string[]
}
