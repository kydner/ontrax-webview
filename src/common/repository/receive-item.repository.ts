import { useTransferItemEndpoint } from '../endpoints/transfer-item.endpoint'
import { defineRepository } from '../utils/plugin.utils'

const transferEndpoint = useTransferItemEndpoint()

export const useReceiveItemRepository = defineRepository({
  ...transferEndpoint,
})
