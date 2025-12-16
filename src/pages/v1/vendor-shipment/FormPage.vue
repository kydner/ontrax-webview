<template>
  <FormPage ref="formPageRef" v-model="form">
    <template #footer:button="{ errorMessage, loading }">
      <k-btn
        v-if="form.status === 'DRAFT'"
        :label="t('saveToInTransit')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleSubmitInTransit"
      />

      <k-btn
        v-if="form.status === 'IN_TRANSIT'"
        :label="t('receive')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleSubmitReceive"
      />
    </template>
  </FormPage>
</template>
<script setup lang="ts">
import { Loading } from 'quasar'
import { ErrorId } from 'src/common/exceptions/error-id'
import { id } from 'src/common/interfaces/response.interface'
import { VendorShipmentReceiveDataRequest } from 'src/common/model/vendor-shipment-receive.model'
import { VendorShipmentV1DataRequest } from 'src/common/model/vendor-shipment-v1.model'
import { useVendorShipmentV1Repository } from 'src/common/repository/vendor-shipment-v1.repository'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import FormPage from 'src/components/page/v1/vendor-shipment/FormPage.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const repository = useVendorShipmentV1Repository()

const router = useRouter()

const form = ref({} as VendorShipmentV1DataRequest)

const formId = computed(() => form.value?.id as id)

const formPageRef = ref<InstanceType<typeof FormPage>>()

const handleBack = () => {
  router.back()
}

const handleSubmitInTransit = async () => {
  const validate = await formPageRef.value?.validate()
  if (!validate) return
  $confirm({
    message: `${t('saveToInTransit')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as string
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()

          await repository.update(shipmentId, { ...form.value })
          await repository.inTransit(shipmentId)
          Notify.success({
            message: t('success'),
          })
          handleBack()
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

          const data: VendorShipmentReceiveDataRequest = {
            actualReceivedDate: form.value?.targetShipmentDate,
          }

          await repository.received(shipmentId, data)

          Notify.success({
            message: t('success'),
          })
          handleBack()
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
