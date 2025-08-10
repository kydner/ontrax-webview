import { StockMovementRequestPage, StockMovementResponsePage } from '../model/stock-movement.model'
import { GetPage } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useStockMovementEndpoint = defineEndpoint({
  getPage: (params: StockMovementRequestPage) =>
    GetPage<StockMovementResponsePage>('stock-movement/page', {
      params,
    }),
})
