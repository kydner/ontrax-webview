<template>
  <swipe-wrapper :swipe-down="handleBack">
    <!-- Header -->
    <k-toolbar header-title="Save New Item" @back="emit('back')" />

    <!-- Body (slot) -->
    <Form as="form" ref="observerRef" @invalid-submit="invalidSubmit">
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12">
          <div class="tw-grid tw-grid-cols-12">
            <div class="tw-col-span-12 tw-text-secondary-text">Serial Number</div>
            <div class="tw-col-span-12">{{ form.serialNumber ?? '-' }}</div>
          </div>
        </div>

        <div class="tw-col-span-12">
          <k-select-module
            v-model="form.productId"
            t-label="product"
            :meta="ContractProduct"
            required
            :outlined="true"
            behavior="menu"
            option-label="productName"
            option-value="productId"
            :placeholder="t('select')"
            :payload="{
              contractId: shipment.contractId,
            }"
          >
            <template #prepend>
              <span></span>
            </template>
            <template #append>
              <q-icon name="img:/icons/chevron-down.svg" />
            </template>
          </k-select-module>
        </div>

        <div class="tw-col-span-12">
          <k-select-module
            v-model="form.workPackageId"
            t-label="workPackage"
            :meta="WorkPackage"
            :outlined="true"
            behavior="menu"
            option-label="name"
            option-value="id"
            :placeholder="t('select')"
            :payload="{
              type: 'MAIN',
            }"
          >
            <template #prepend>
              <span></span>
            </template>
            <template #append>
              <q-icon name="img:/icons/chevron-down.svg" />
            </template>
          </k-select-module>
        </div>

        <div class="tw-col-span-12">
          <k-select-module
            v-model="form.subWorkPackageId"
            t-label="subWorkPackage"
            :meta="WorkPackage"
            :outlined="true"
            behavior="menu"
            option-label="name"
            option-value="id"
            :placeholder="t('select')"
            :payload="{
              type: 'SUB',
            }"
          >
            <template #prepend>
              <span></span>
            </template>
            <template #append>
              <q-icon name="img:/icons/chevron-down.svg" />
            </template>
          </k-select-module>
        </div>

        <div class="tw-col-span-12">
          <k-select-module
            v-model="form.siteId"
            t-label="siteLocation"
            :meta="WarehouseSite"
            :outlined="true"
            behavior="menu"
            option-label="locationName"
            option-value="id"
            :placeholder="t('empty')"
          >
            <template #prepend>
              <span></span>
            </template>
            <template #append>
              <q-icon name="img:/icons/chevron-down.svg" />
            </template>
          </k-select-module>
        </div>

        <div class="tw-col-span-6">
          <k-input
            v-model="form.srtPartNumber"
            t-label="srtPartNumber"
            :outlined="true"
            :placeholder="t('srtPartNumber')"
          >
          </k-input>
        </div>
        <div class="tw-col-span-6">
          <k-input
            v-model="form.srtSerialNumber"
            t-label="srtSerialNumber"
            :outlined="true"
            :placeholder="t('srtSerialNumber')"
          >
          </k-input>
        </div>

        <!-- <div class="tw-col-span-6">
        <k-input
          v-model="form.manufacturer"
          t-label="manufacture"
          required
          :outlined="true"
          :placeholder="t('manufacture')"
        >
        </k-input>
      </div> -->

        <!-- <div class="tw-col-span-6">
        <k-input
          v-model="form.manufacturerPartNumber"
          t-label="manufacturePartNumber"
          required
          :outlined="true"
          :placeholder="t('manufacturePartNumber')"
        >
        </k-input>
      </div> -->

        <div class="tw-col-span-6">
          <k-input v-model="form.palletNumber" t-label="palletNumber" :outlined="true" :placeholder="t('palletNumber')">
          </k-input>
        </div>
        <div class="tw-col-span-6">
          <k-input v-model="form.boqPackage" t-label="boqReff" :outlined="true" :placeholder="t('boqReff')"> </k-input>
        </div>
        <div class="tw-col-span-6">
          <k-input v-model="form.origin" t-label="origin" :outlined="true" :placeholder="t('origin')"> </k-input>
        </div>
        <div class="tw-col-span-6">
          <k-input v-model="form.sampleNumber" t-label="sampleNumber" :outlined="true" :placeholder="t('sampleNumber')">
          </k-input>
        </div>

        <div class="tw-col-span-12 tw-my-4">
          <k-btn color="secondary" :label="t('button.save')" class="tw-w-full" @click="handleSave" />
        </div>
      </div>
    </Form>
  </swipe-wrapper>
</template>
<script setup lang="ts">
import { ContractProduct, WarehouseSite, WorkPackage } from 'src/common/constants/meta.constant'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import { computed, onActivated, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { ContractProductDataRequest } from 'src/common/model/contract-product.model'
import { useChannelStore } from 'src/stores/channel.store'
import { useContractProductRepository } from 'src/common/repository/contract-product.repository'
import { Notify } from 'src/common/utils/plugin.utils'
import { Loading } from 'quasar'
import { VendorShipmentV1Response } from 'src/common/model/vendor-shipment-v1.model'
import { Form, FormValidationResult, GenericObject, InvalidSubmissionContext } from 'vee-validate'

interface Props {
  modelValue: VendorShipmentV1Response
}

interface Emits {
  (e: 'back'): void
  (event: 'update:modelValue', value: VendorShipmentV1Response): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const shipment = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { t } = useI18n()

const channelStore = useChannelStore()

const contractProductRepository = useContractProductRepository()

const observerRef = ref<InstanceType<typeof Form>>()

const form = ref({} as ContractProductDataRequest)

const handleBack = () => emit('back')

const serialNumberFromChannel = computed(() => channelStore.getData<string>('/shipment/contract-product/existing-data'))

const validate = async () => {
  const promises = [observerRef.value?.validate()]
  for (const promise of promises) {
    const result = await promise
    if (result?.valid !== true) {
      Notify.create({
        message: Object.values(result?.errors as Record<string, string>)?.[0],
        type: 'negative',
        icon: 'warning',
      })
      return false
    }
  }
  return true
}
const invalidSubmit = (
  event:
    | InvalidSubmissionContext<GenericObject>
    | FormValidationResult<Record<string, unknown>, Record<string, unknown>>,
) => {
  const { errors } = event
  Notify.create({
    message: Object.values(errors)?.[0],
    type: 'negative',
    icon: 'warning',
  })
}

const handleSave = async () => {
  try {
    const isValid = await validate()
    if (!isValid) return
    Loading.show()
    await contractProductRepository.create({ ...form.value, inContract: true, contractId: shipment.value?.contractId })

    Notify.success({
      message: t('notification.successCreate'),
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
watch(
  () => serialNumberFromChannel.value,
  (value) => {
    if (value) {
      form.value.serialNumber = value
    }
  },
  {
    immediate: true,
  },
)

onActivated(() => {
  for (const key in form.value) {
    if (key === 'serialNumber') continue

    form.value[key as keyof ContractProductDataRequest] = null as never
  }

  observerRef.value?.resetForm({
    values: {
      ...form.value,
      serialNumber: form.value.serialNumber,
    },
    touched: {},
    errors: {},
  })
})
</script>
