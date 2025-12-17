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

      <k-btn
        v-if="form.status === 'RECEIVED' && routePath === 'quality-control'"
        :label="t('qcPass')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleSubmitQcPass"
      />
    </template>
  </FormPage>
</template>
<script setup lang="ts">
import { Loading } from 'quasar'
import { ErrorId } from 'src/common/exceptions/error-id'
import { id } from 'src/common/interfaces/response.interface'
import { VendorShipmentQualityCheckDataRequest } from 'src/common/model/vendor-shipment-quality-check.model'
import { VendorShipmentReceiveDataRequest } from 'src/common/model/vendor-shipment-receive.model'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import { useVendorShipmentRepository } from 'src/common/repository/vendor-shipment.repository'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import FormPage from 'src/components/page/vendor-shipment/FormPage.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const repository = useVendorShipmentRepository()

const router = useRouter()

const route = useRoute()

const form = ref({} as VendorShipmentDataRequest)

const formId = computed(() => form.value?.id as id)

const formPageRef = ref<InstanceType<typeof FormPage>>()

const routePath = computed(() => route?.meta?.routePath)

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

const handleSubmitQcPass = () => {
  $confirm({
    message: `${t('qcPass')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as string
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()
          const data: VendorShipmentQualityCheckDataRequest = {
            qcDetails: [],
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
