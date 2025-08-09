import { useStockCardEndpoint } from '../endpoints/stock-card.endpoint'
import { StockCardAggregationRequest } from '../model/stock-card-aggregation.model'
import { StockCardLocationWarehouseRequest } from '../model/stock-card-location-warehouse.model'
import { StockCardLowStockRequest } from '../model/stock-card-low-stock.model'
import { StockCardSearchRequest } from '../model/stock-card-search.model'
import { StockCardWarehouseRequest } from '../model/stock-card-warehouse.model'
import { StockCardRequest } from '../model/stock-card.model'
import { withRepository } from '../utils/converter.utils'
import { defineRepository } from '../utils/plugin.utils'

const stockEndpoint = useStockCardEndpoint()

export const useStockCardRepository = defineRepository({
  getPage: (params?: StockCardRequest) => withRepository(() => stockEndpoint.getPage(params)),

  locationWarehouseItem: (params: StockCardLocationWarehouseRequest) =>
    withRepository(() => stockEndpoint.locationWarehouseItem(params)),

  warehouse: (params: StockCardWarehouseRequest) => withRepository(() => stockEndpoint.warehouse(params)),

  search: (params: StockCardSearchRequest) => withRepository(() => stockEndpoint.search(params)),

  lowStock: (params: StockCardLowStockRequest) => withRepository(() => stockEndpoint.lowStock(params)),

  aggregation: (params?: StockCardAggregationRequest) => withRepository(() => stockEndpoint.aggregation(params)),
})
