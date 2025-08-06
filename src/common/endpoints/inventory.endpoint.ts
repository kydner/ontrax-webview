import { Get } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useInventoryEndpoint = defineEndpoint({
  getAll: () => Get('inventories'),
})
