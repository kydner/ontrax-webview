import { defineRepository } from '../utils/plugin.utils'
import { useTransferItemRepository } from './transfer-item.repository'

const transferRepository = useTransferItemRepository()

export const useReceiveItemRepository = defineRepository({
  ...transferRepository,
})
