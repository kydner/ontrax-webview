<template>
  <k-toolbar header-title="Scan Product Serial Number" @back="handleBack"> </k-toolbar>
  <div class="tw-col-span-12">
    <qr-stream @decode="onDecode" @loaded="onLoaded" @error="onError"></qr-stream>
  </div>
  <div class="tw-col-span-12">
    <p class="tw-text-center tw-font-light tw-my-4">Manual Input</p>
    <q-input
      ref="serialInputRef"
      v-model="inputSerialNumber"
      bg-color="white"
      :dark="false"
      dense
      outlined
      placeholder="Input Serial Number"
      class=""
      @keyup.enter="onEnter"
    >
      <template #append>
        <q-btn flat label="Enter" color="secondary" @click.stop="handleScanSn(inputSerialNumber)" />
      </template>
    </q-input>
  </div>

  <div
    v-for="(item, index) in scannedList"
    :key="index"
    class="tw-col-span-12 tw-flex tw-flex-col tw-space-y-2 tw-my-4"
  >
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
      <div class="tw-col-span-6">
        <div class="tw-grid tw-grid-cols-12">
          <div class="tw-col-span-12 tw-text-secondary-text">Serial Number</div>
          <div class="tw-col-span-12">{{ item.serialNumber }}</div>
        </div>
      </div>
      <div class="tw-col-span-6">
        <div class="tw-grid tw-grid-cols-12">
          <div class="tw-col-span-12 tw-text-secondary-text">Part Number</div>
          <div class="tw-col-span-12">{{ item.srtPartNumber }}</div>
        </div>
      </div>
      <div class="tw-col-span-12">
        <div class="tw-grid tw-grid-cols-12">
          <div class="tw-col-span-12 tw-text-secondary-text">Product Name</div>
          <div class="tw-col-span-12">{{ item.productName }}</div>
        </div>
      </div>
    </div>

    <q-separator dark></q-separator>
  </div>

  <div class="tw-grid tw-grid-cols-12">
    <div class="tw-col-span-12 tw-text-secondary-text">Total Item Order</div>
    <div class="tw-col-span-12 tw-text-warning">{{ totalItemOrdered }}</div>
  </div>
  <div class="tw-grid tw-grid-cols-12">
    <div class="tw-col-span-12 tw-text-secondary-text">Total Item Scan</div>
    <div class="tw-col-span-12 tw-text-warning">{{ scannedList?.length }}</div>
  </div>

  <div class="tw-col-span-12 tw-my-8">
    <k-btn :label="t('button.finish')" color="secondary" class="tw-w-full" @click="handleSaveSerialNumber" />
  </div>
</template>
<script setup lang="ts">
import { isAxiosError } from 'axios'
import { Loading, QInput } from 'quasar'
import { bus } from 'src/common/event-bus'
import { ContractProductResponse } from 'src/common/model/contract-product.model'
import { VendorShipmentResponse } from 'src/common/model/vendor-shipment.model'
import { useContractProductRepository } from 'src/common/repository/contract-product.repository'
import { useVendorShipmentRepository } from 'src/common/repository/vendor-shipment.repository'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import KToolbar from 'src/components/ui/KToolbar.vue'
import QrStream from 'src/components/ui/QrStream.vue'
import { useChannelStore } from 'src/stores/channel.store'
import { nextTick } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue: VendorShipmentResponse
}

interface Emits {
  (event: 'back'): void
  (event: 'update:modelValue', value: VendorShipmentResponse): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {})

const contractProductRepository = useContractProductRepository()

const shipmentRepository = useVendorShipmentRepository()

const channelStore = useChannelStore()

const inputSerialNumber = ref()

const serialInputRef = ref<InstanceType<typeof QInput> | null>(null)

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const totalItemOrdered = computed(() => form.value?.details?.reduce((sum, item) => sum + item.qtyOrdered, 0))

const { t } = useI18n()

const scannedList = ref<ContractProductResponse[]>([])

const handleBack = () => {
  emit('back')
}

const handleScanSn = (serialNumber: string) => {
  fetchValidateSn(serialNumber)
}

const fetchValidateSn = async (serialNumber: string) => {
  try {
    console.log('validate sn:', serialNumber)
    if (!serialNumber) throw new Error('Please input serial number')
    Loading.show()
    const response = await contractProductRepository.serialNumber(serialNumber)
    inputSerialNumber.value = ''

    const list = scannedList.value
    if (!list) return

    if (list.some((item) => item.isUniqueSerialNumber && item.serialNumber === serialNumber)) return

    list.unshift(response)

    console.log(response)
  } catch (error) {
    if (isAxiosError(error)) {
      if (['41', 41].includes(error?.response?.data?.code)) {
        console.log()
        $confirm({
          message: 'Serial Number Not Found. Do you want to continue save this item?',
          button: {
            submit: {
              label: t('yes'),
            },
            cancel: {
              label: t('no'),
            },
          },
          callback: (confirm) => {
            if (confirm) {
              // showCreateNewDialog.value = true
              bus.emit('shipment:contract-product:create')
              channelStore.updateData<string>('/shipment/contract-product/existing-data', serialNumber)
            }
          },
        })
      } else {
        Notify.create({
          message: getErrorMessage(error),
          type: 'negative',
        })
      }
    } else {
      Notify.create({
        message: getErrorMessage(error as Error),
        type: 'negative',
      })
    }
  } finally {
    Loading.hide()
  }
}

const onEnter = async () => {
  await handleScanSn(inputSerialNumber.value)

  // blur input
  nextTick(() => {
    serialInputRef.value?.blur()
  })
}

const onLoaded = (value: boolean) => {
  console.log('loaded', form.value, value)
}

const onError = (error: string) => {
  // isOpen.value = false
  Notify.create({
    message: error,
    type: 'negative',
  })
}

const onDecode = (value: string) => {
  console.log('decoded value:', value)
  fetchValidateSn(value)
}

const handleSaveSerialNumber = async () => {
  try {
    const promises = scannedList.value?.map((item) => {
      return shipmentRepository.saveSerialNumber({
        qtyWork: 1,
        serialNumber: item.serialNumber,
        qtyDamaged: 0,
      })
    })
    await Promise.all(promises)
    Notify.success({
      message: t('notification.successCreate'),
    })
    handleBack()
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  }
}
</script>
