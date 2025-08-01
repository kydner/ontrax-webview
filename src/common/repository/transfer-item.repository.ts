import { useInventoryEndpoint } from '../endpoints/inventory.endpoint'
import { defineRepository } from '../utils/plugin.utils'

const inventoryEndpoint = useInventoryEndpoint()

export const useTransferItemRepository = defineRepository({
  ...inventoryEndpoint,
})
