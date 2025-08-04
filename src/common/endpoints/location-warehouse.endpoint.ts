import { id } from '../interfaces/response.interface'
import {
  LocationWarehouseAdvancedSearchRequest,
  LocationWarehouseAdvancedSearchResponse,
} from '../model/location-warehouse-advanced-search.model'
import {
  LocationWarehouseCapacityGreaterThanRequest,
  LocationWarehouseCapacityGreaterThanResponse,
} from '../model/location-warehouse-capacity-greater-than.model'
import { LocationWarehouseExistByCodeRequest } from '../model/location-warehouse-exist-by-code.model'
import {
  LocationWarehouseDataRequest,
  LocationWarehouseRequest,
  LocationWarehouseResponse,
} from '../model/location-warehouse.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useLocationWarehouseEndpoint = defineEndpoint({
  getPage: (params?: LocationWarehouseRequest) =>
    GetPage<LocationWarehouseResponse[]>('location-warehouses', {
      params,
    }),

  getAll: (params?: LocationWarehouseRequest) =>
    Get<LocationWarehouseResponse[]>('location-warehouses', {
      params,
    }),

  getOne: (id: id) => Get<LocationWarehouseResponse>(`location-warehouses/${id}`),

  create: (data: LocationWarehouseDataRequest) => Post<LocationWarehouseDataRequest>('location-warehouses', data),

  update: (id: id, data: LocationWarehouseDataRequest) =>
    Put<LocationWarehouseDataRequest>(`location-warehouses/${id}`, data),

  delete: (id: id) => Delete(`location-warehouses/${id}`),

  existByCode: (params: LocationWarehouseExistByCodeRequest) =>
    Get('location-warehouses/', {
      params,
    }),

  countActiveBySite: (locationSiteId: id) =>
    Get<LocationWarehouseResponse[]>(`location-warehouses/count-active-by-site/${locationSiteId}`),

  capacityGreaterThan: (params: LocationWarehouseCapacityGreaterThanRequest) =>
    GetPage<LocationWarehouseCapacityGreaterThanResponse[]>('location-warehouses/by-site', {
      params,
    }),

  bySite: (locationSiteId: id) => Get<LocationWarehouseDataRequest[]>(`location-warehouses/by-site/${locationSiteId}`),

  advancedSearch: (params: LocationWarehouseAdvancedSearchRequest) =>
    GetPage<LocationWarehouseAdvancedSearchResponse[]>('location-warehouses/advanced-search', {
      params,
    }),

  active: () => Get<LocationWarehouseResponse[]>('location-warehouses/active'),
})
