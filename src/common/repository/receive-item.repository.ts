import { useInventoryEndpoint } from '../endpoints/inventory.endpoint'
import { defineRepository } from '../utils/plugin.utils'

const inventory = useInventoryEndpoint()

export const useReceiveItemRepository = defineRepository({
  ...inventory,
})
