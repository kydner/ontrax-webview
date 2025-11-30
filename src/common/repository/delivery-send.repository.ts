import { useDeliverySendEndpoint } from '../endpoints/delivery-send.endpoint'
import { DeliverySendDataRequest, DeliverySendRequestPage } from '../model/delivery-send.model'
import { defineRepository } from '../utils/plugin.utils'
import { withRepository } from '../utils/converter.utils'
import { id } from '../interfaces/response.interface'

const deliveryEndpoint = useDeliverySendEndpoint()

export const useDeliverySendRepository = defineRepository({
  getPage: (params?: DeliverySendRequestPage) => withRepository(() => deliveryEndpoint.getPage(params)),

  getOne: (id: id) => withRepository(() => deliveryEndpoint.getOne(id)),

  create: (data: DeliverySendDataRequest) => withRepository(() => deliveryEndpoint.create(data)),

  update: (id: id, data: DeliverySendDataRequest) => withRepository(() => deliveryEndpoint.update(id, data)),

  delete: (id: id) => deliveryEndpoint.delete(id),
})
