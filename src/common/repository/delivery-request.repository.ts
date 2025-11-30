import { useDeliveryRequestEndpoint } from '../endpoints/delivery-request.endpoint'
import { DeliveryRequestDataRequest, DeliveryRequestRequestPage } from '../model/delivery-request.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const deliveryEndpoint = useDeliveryRequestEndpoint()

export const useDeliveryRequestRepository = defineRepository({
  getPage: (params?: DeliveryRequestRequestPage) => withRepository(() => deliveryEndpoint.getPage(params)),

  getOne: (id: id) => withRepository(() => deliveryEndpoint.getOne(id)),

  create: (data: DeliveryRequestDataRequest) => withRepository(() => deliveryEndpoint.create(data)),

  update: (id: id, data: DeliveryRequestDataRequest) => withRepository(() => deliveryEndpoint.update(id, data)),

  delete: (id: id) => deliveryEndpoint.delete(id),
})
