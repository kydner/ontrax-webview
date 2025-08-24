<template>
  <operational-form-page ref="operationalFormPageRef" v-model="form" :meta="metaVendorShipment">
    <template #footer:button="{ loading, errorMessage }">
      <k-btn
        v-if="form.status === 'IN_TRANSIT'"
        :label="t('receive')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleSubmitReceive"
      />

      <k-btn
        v-if="form.status === 'RECEIVED' && routePath === 'quality-control'"
        :label="t('qcPass')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleSubmitQcPass"
      />

      <k-btn
        v-if="form.status === 'DRAFT'"
        :label="t('saveToInTransit')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleSubmitInTransit"
      />
    </template>
  </operational-form-page>
</template>
<script setup lang="ts">
import { Loading } from 'quasar'
import { VendorShipment } from 'src/common/constants/meta.constant'
import { OperationalRoutePath } from 'src/common/enum/operational.enum'
import { ErrorId } from 'src/common/exceptions/error-id'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { id, isoDate } from 'src/common/interfaces/response.interface'
import { VendorShipmentQualityCheckDataRequest } from 'src/common/model/vendor-shipment-quality-check.model'
import {
  VendorShipmentReceiveDataRequest,
  VendorShipmentReceiveRequest,
} from 'src/common/model/vendor-shipment-receive.model'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import { VendorShipmentResponsePage } from 'src/common/model/vendor-shipment.model'
import { useVendorShipmentRepository } from 'src/common/repository/vendor-shipment.repository'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import OperationalFormPage from 'src/components/lib/OperationalFormPage.vue'
import { ComponentPublicInstance, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

type MetaFormPageExposed = {
  validate: () => Promise<boolean>
}

const metaVendorShipment: IMetaListModule<VendorShipmentResponsePage> = VendorShipment

const { t } = useI18n()

const router = useRouter()

const route = useRoute()

const form = ref({} as VendorShipmentDataRequest)

const operationalFormPageRef = ref<ComponentPublicInstance<MetaFormPageExposed> | null>(null)

const repository = useVendorShipmentRepository()

const formId = computed(() => form.value?.goodsReceiveId as id)

const routePath = computed<OperationalRoutePath>(() => route?.meta?.routePath as OperationalRoutePath)

const handleSubmitInTransit = async () => {
  const validate = await operationalFormPageRef.value?.validate()
  if (!validate) return
  $confirm({
    message: `${t('saveToInTransit')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as string
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()

          await repository.update(formId.value, { ...form.value })
          await repository.inTransit(shipmentId)
          Notify.success({
            message: t('success'),
          })
          router.back()
        } catch (error) {
          Notify.error({
            message: error as Error,
          })
        } finally {
          Loading.hide()
        }
      }
    },
  })
}

const handleSubmitReceive = () => {
  $confirm({
    message: `${t('receive')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as id
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()
          const receiveItems = form.value?.receiveItems || []

          const data: VendorShipmentReceiveDataRequest = {
            receivedItems: [...receiveItems]?.map((item) => {
              return {
                goodsReceiveItemId: item.goodsReceiveItemId ?? null,
                qtyReceived: item.qtyReceived ?? 0,
              }
            }),
          }

          const params: VendorShipmentReceiveRequest = {
            receiveDate: form.value?.receiveDate as isoDate,
          }
          await repository.received(shipmentId, data, params)

          Notify.success({
            message: t('success'),
          })
          router.back()
        } catch (error) {
          Notify.error({
            message: error as Error,
          })
        } finally {
          Loading.hide()
        }
      }
    },
  })
}

const handleSubmitQcPass = () => {
  $confirm({
    message: `${t('qcPass')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as string
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()

          const qcGoodsReceive = form.value?.qcGoodsReceive

          const data: VendorShipmentQualityCheckDataRequest = {
            qcGoodsReceiveId: qcGoodsReceive.qcGoodsReceiveId,
            qcItems: qcGoodsReceive.qcGoodsReceiveItems.map((item) => {
              return {
                qcGoodsReceiveItemId: item.qcGoodsReceiveItemId || null,
                qtyReject: item.qtyReject,
                note: item.notes,
                fileId: item.fileId,
              }
            }),
          }
          await repository.qualityCheck(shipmentId, data)
          Notify.success({
            message: t('success'),
          })
          router.back()
        } catch (error) {
          Notify.error({
            message: error as Error,
          })
        } finally {
          Loading.hide()
        }
      }
    },
  })
}
</script>
