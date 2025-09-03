<template>
  <q-dialog v-model="isOpen" maximized transition-duration="300" position="bottom">
    <swipe-wrapper :swipe-down="close">
      <q-card flat class="barcode-scan-card">
        <!-- Header -->
        <q-card-section class="tw-relative tw-flex tw-justify-between tw-pb-0 tw-mb-0">
          <div
            class="tw-absolute tw-top-3 tw-left-1/2 -tw-translate-x-1/2 tw-w-[40px] tw-h-[3px] tw-bg-gray-300 tw-rounded-sm"
          ></div>
          <span></span>
          <q-btn dense flat round icon="close" color="white" v-close-popup @click="close" />
        </q-card-section>

        <!-- Body (slot) -->
        <q-card-section v-if="modelValue" class="tw-my-0 tw-py-0">
          <div class="tw-mb-2 tw-text-center">
            <div class="tw-text-secondary-text">{{ item?.skuCode }}</div>
            <div>{{ item?.itemName }}</div>
          </div>

          <h5 class="tw-text-secondary-text tw-text-center tw-text-base tw-my-2">Scan Product Serial Number</h5>

          <qr-stream @decode="onDecode" @loaded="onLoaded" @error="onError"></qr-stream>

          <div class="tw-my-4">
            <div class="tw-text-warning tw-my-2">Scanned Item: {{ serialNumbers?.length || 0 }}</div>
            <q-list dark dense separator>
              <q-item v-for="(serialNumber, index) in serialNumbers" :key="index" class="!tw-pl-0 !tw-pr-0">
                <q-item-section>
                  {{ serialNumber }}
                </q-item-section>

                <q-item-section avatar>
                  <q-btn
                    color="negative"
                    icon="img:/icons/remove__negative.svg"
                    size="0.65rem"
                    flat
                    rounded
                    padding="none"
                    @click="handleDelete"
                  />
                </q-item-section>
              </q-item>

              <q-separator v-if="serialNumbers?.length > 0" dark />
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </swipe-wrapper>
  </q-dialog>
</template>
<script setup lang="ts" generic="T extends ShipmentGoodReceiveItem">
import { QDialogProps } from 'quasar'
import { Notify } from 'src/common/utils/plugin.utils'
import { computed } from 'vue'
import QrStream from 'src/components/ui/QrStream.vue'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import { ShipmentGoodReceiveItem } from 'src/common/model/operational.model'

interface Props extends QDialogProps {
  item?: T | null
  serialNumbers?: string[]
}

interface Emits {
  (e: 'update:modelValue', value: Props['modelValue']): void
  (e: 'remove:serialNumber', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  serialNumbers: () => [],
})

const emit = defineEmits<Emits>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const close = () => emit('update:modelValue', false)

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
}

const handleDelete = () => {
  emit('remove:serialNumber', '')
}
</script>

<style scoped lang="scss">
.barcode-scan-card {
  @apply tw-overflow-y-auto;
  overflow: hidden;

  &:hover {
    overflow: auto;
  }

  &::-webkit-scrollbar {
    @apply tw-w-1;
  }

  &::-webkit-scrollbar-track {
    @apply tw-bg-transparent;
  }

  &::-webkit-scrollbar-thumb {
    @apply tw-rounded-full tw-bg-disable-text tw-shadow-lg;
  }
}
</style>
