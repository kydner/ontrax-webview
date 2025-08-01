import { useInventoryEndpoint } from '../endpoints/inventory.endpoint'
import { InventoryResponse } from '../model/inventory.model'
import { defineRepository } from '../utils/plugin.utils'

const inventoryEndpoint = useInventoryEndpoint()

export const useInventoryRepository = defineRepository({
  getAll: () =>
    new Promise<InventoryResponse[]>((resolve, reject) =>
      inventoryEndpoint
        .getAll()
        .then((data) => resolve(data))
        .catch(reject),
    ),
})
