<template>
  <div class="tw-col-span-12">
    <qr-stream @decode="onDecode" @loaded="onLoaded" @error="onError"></qr-stream>
  </div>

  <div class="tw-col-span-12"></div>
</template>

<script setup lang="ts" generic="T extends ShipmentGoodReceiveItem">
import { Loading } from 'quasar'
import { ShipmentGoodReceiveItem } from 'src/common/model/operational.model'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { Notify } from 'src/common/utils/plugin.utils'
import QrStream from 'src/components/ui/QrStream.vue'

interface Props {
  item?: T | null
}

withDefaults(defineProps<Props>(), {})

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

const onDecode = (value: string) => {
  console.log('decoded value:', value)
  fetchValidateSn(value)
}
</script>
