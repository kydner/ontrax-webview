import { useStockMovementEndpoint } from '../endpoints/stock-movement.endpoint'
import { StockMovementRequestPage } from '../model/stock-movement.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'

const movementEndpoint = useStockMovementEndpoint()

export const useStockMovementRepository = defineRepository({
  getPage: (params: StockMovementRequestPage) => withRepository(() => movementEndpoint.getPage(params)),
})
