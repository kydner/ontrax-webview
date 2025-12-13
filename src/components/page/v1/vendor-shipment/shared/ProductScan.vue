<template>
  <k-toolbar header-title="Scan Product Serial Number" @back="emit('back')"> </k-toolbar>
  <div class="tw-col-span-12">
    <qr-stream @decode="onDecode" @loaded="onLoaded" @error="onError"></qr-stream>
  </div>
  <div class="tw-col-span-12">
    <p class="tw-text-center tw-font-light tw-my-4">Manual Input</p>
    <q-input model-value="" bg-color="white" :dark="false" dense outlined placeholder="Input Serial Number" class="">
      <template #append>
        <q-btn flat label="Enter" color="secondary" @click.stop="handleScanSn" />
      </template>
    </q-input>
  </div>

  <div class="tw-col-span-12 tw-flex tw-flex-col tw-space-y-2 tw-my-4">
    <div class="tw-grid tw-grid-cols-12">
      <div class="tw-col-span-12 tw-text-secondary-text">Serial Number</div>
      <div class="tw-col-span-12">5S2340T65748</div>
    </div>
    <div class="tw-grid tw-grid-cols-12">
      <div class="tw-col-span-12 tw-text-secondary-text">Part Number</div>
      <div class="tw-col-span-12">SRT192RMBP</div>
    </div>
    <div class="tw-grid tw-grid-cols-12">
      <div class="tw-col-span-12 tw-text-secondary-text">Product Name</div>
      <div class="tw-col-span-12">GeoVS HUB UPS Battery 6000VA</div>
    </div>
    <div class="tw-grid tw-grid-cols-12">
      <div class="tw-col-span-12 tw-text-secondary-text">Total Item Order</div>
      <div class="tw-col-span-12 tw-text-warning">20</div>
    </div>
    <div class="tw-grid tw-grid-cols-12">
      <div class="tw-col-span-12 tw-text-secondary-text">Total Item Scan</div>
      <div class="tw-col-span-12 tw-text-warning">5</div>
    </div>
  </div>

  <div class="tw-col-span-12"></div>
</template>
<script setup lang="ts">
import { Loading } from 'quasar'
import { bus } from 'src/common/event-bus'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import KToolbar from 'src/components/ui/KToolbar.vue'
import QrStream from 'src/components/ui/QrStream.vue'
import { useI18n } from 'vue-i18n'

interface Emits {
  (event: 'back'): void
}

const emit = defineEmits<Emits>()

const { t } = useI18n()

const handleScanSn = () => {
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
        bus.emit('product:new')
      }
    },
  })
}

const fetchValidateSn = async (serialNumber: string) => {
  try {
    console.log('validate sn:', serialNumber)
    Loading.show()
  } catch (error) {
    Notify.create({
      message: getErrorMessage(error as Error),
      type: 'negative',
    })
  } finally {
    Loading.hide()
  }
}

const onLoaded = (value: boolean) => {
  console.log('loaded', value)
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
</script>
