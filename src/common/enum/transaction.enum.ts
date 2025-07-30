export enum Status {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

export type TStatus = `${Status}`

export enum DataType {
  Boolean = 'BOOLEAN',
  Character = 'CHARACTER',
  Collection = 'COLLECTION',
  Date = 'DATE',
  DecimalNumber = 'DECIMAL_NUMBER',
  Number = 'NUMBER',
  Range = 'RANGE',
  Time = 'TIME',
  Option = 'OPTION',
}

export type TDataType = `${DataType}`

export enum OperatorType {
  Logical = 'LOGICAL',
  Comparison = 'COMPARISON',
  Arithmetic = 'ARITHMETIC',
}

export type TOperatorType = `${OperatorType}`
