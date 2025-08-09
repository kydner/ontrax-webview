import { StockCardAggregationRequest, StockCardAggregationResponse } from '../model/stock-card-aggregation.model'
import { StockCardLocationWarehouseRequest } from '../model/stock-card-location-warehouse.model'
import { StockCardLowStockRequest, StockCardLowStockResponse } from '../model/stock-card-low-stock.model'
import { StockCardSearchRequest, StockCardSearchResponse } from '../model/stock-card-search.model'
import { StockCardWarehouseRequest } from '../model/stock-card-warehouse.model'
import { StockCardRequest } from '../model/stock-card.model'
import { Get, GetPage } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useStockCardEndpoint = defineEndpoint({
  getPage: (params?: StockCardRequest) =>
    GetPage('stock-cards', {
      params,
    }),

  locationWarehouseItem: (currentParams: StockCardLocationWarehouseRequest) => {
    const { locationWarehouseId, itemId } = currentParams
    const params = { ...currentParams } as Partial<StockCardLocationWarehouseRequest>
    delete params.locationWarehouseId
    delete params.itemId
    return Get(`stock-cards/${locationWarehouseId}/${itemId}`, {
      params,
    })
  },

  warehouse: (currentParams: StockCardWarehouseRequest) => {
    const { locationWarehouseId } = currentParams
    const params = { ...currentParams } as Partial<StockCardWarehouseRequest>
    delete params.locationWarehouseId
    return Get(`stock-cards/warehouse/${locationWarehouseId}`, { params })
  },

  search: (params: StockCardSearchRequest) => {
    return Get<StockCardSearchResponse[]>('stock-cards/search', {
      params,
    })
  },

  lowStock: (params: StockCardLowStockRequest) =>
    GetPage<StockCardLowStockResponse[]>('stock-cards/low-stock', {
      params,
    }),

  aggregation: (params?: StockCardAggregationRequest) =>
    Get<StockCardAggregationResponse[]>('stock-cards/aggregation', {
      params,
    }),
})
