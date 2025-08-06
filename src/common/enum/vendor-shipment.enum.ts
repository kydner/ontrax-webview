export enum Status {
  Draft = 'DRAFT',
  InTransit = 'IN_TRANSIT',
  Received = 'RECEIVED',
  PartialPassed = 'PARTIAL_PASSED',
  QCPassed = 'QC_PASSED',
}

export type IStatus = `${Status}`
