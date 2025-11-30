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

export type OperationalRoutePath = 'quality-control' | 'receive'

export enum AccessCode {
  VendorShipmentSend = '111100000',
  VendorShipmentQc = '111200000',
  TransferItemSend = '211100000',
  TransferItemQc = '211200000',
  ReceiveItemReceive = '311100000',
  ReceiveItemQc = '311200000',
  DeliverySend = '311200001',
}
