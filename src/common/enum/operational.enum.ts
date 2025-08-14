export enum Status {
  Draft = 'DRAFT',
  InTransit = 'IN_TRANSIT',
  Received = 'RECEIVED',
  PartialPassed = 'PARTIAL_PASSED',
  QCPassed = 'QC_PASSED',
  QCSend = 'QC_SEND',
  ReadyToSend = 'READY_TO_SEND',
  QCReceive = 'QC_RECEIVE',
}

export type TStatus = `${Status}`
