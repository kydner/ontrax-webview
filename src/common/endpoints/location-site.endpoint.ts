import { id } from '../interfaces/response.interface'
import { LocationSiteDataRequest, LocationSiteRequest, LocationSiteResponse } from '../model/location-site.model'
import { Delete, Get, GetPage, Post, Put } from '../services/api.service'
import { defineEndpoint } from '../utils/plugin.utils'

export const useLocationSiteEndpoint = defineEndpoint({
  getPage: (params?: LocationSiteRequest) =>
    GetPage<LocationSiteResponse[]>('location-sites', {
      params,
    }),

  getAll: (params?: LocationSiteRequest) =>
    Get<LocationSiteResponse[]>('location-sites', {
      params,
    }),

  getOne: (id: id) => Get<LocationSiteResponse>(`location-sites/${id}`),

  create: (data: LocationSiteDataRequest) => Post<LocationSiteDataRequest>('location-sites', data),

  update: (id: id, data: LocationSiteDataRequest) => Put<LocationSiteDataRequest>(`location-sites/${id}`, data),

  delete: (id: id) => Delete(`location-sites/${id}`),
})
