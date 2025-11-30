<template>
  <div class="tw-col-span-12 tw-flex tw-justify-between">
    <div class="tw-col-span-12 tw-flex tw-space-x-4">
      <product-image :item-id="item?.itemId || ''" />
      <div class="tw-basis-auto">
        <div class="tw-flex tw-flex-col">
          <span class="tw-text-secondary-text">{{ item?.skuCode || '-' }}</span>
          <span>{{ item?.itemName || '-' }}</span>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-text-center tw-space-y-2 tw-text-xs">
      <span>Qty Receive</span>
      <span>{{ format(item?.qtyReceived, { precision: 0 }) || '-' }}</span>
    </div>
  </div>

  <div class="tw-col-span-12 tw-my-8">
    <q-input
      v-model="serialNumber"
      outlined
      color="secondary"
      placeholder="Input Serial Number"
      @keyup.enter="handleInsert(serialNumber)"
    >
      <template #append>
        <q-btn flat icon="img:/icons/plus__secondary-text.svg" padding="xs" @click="handleInsert(serialNumber)" />
      </template>
      <template #after>
        <q-btn flat icon="img:/icons/barcode.svg" padding="xs" @click.stop="handleShowBarcode" />
      </template>
    </q-input>
  </div>

  <div class="tw-col-span-12">
    <q-list dark dense separator>
      <q-item v-for="(serialNumber, index) in serialNumbers" :key="index" class="!tw-pl-0 !tw-pr-0 tw-my-1">
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
  <barcode-scan-dialog v-model="showBarcode" :item="item" :serial-numbers="serialNumbers" />
</template>

<script setup lang="ts" generic="T extends ShipmentGoodReceiveItem">
import { ShipmentGoodReceiveItem } from 'src/common/model/operational.model'
import { format } from 'src/common/utils/converter.utils'
import ProductImage from 'src/components/images/Product.vue'
import BarcodeScanDialog from '../operational/BarcodeScanDialog.vue'
import { ref } from 'vue'
import { Notify } from 'src/common/utils/plugin.utils'

interface Props {
  item?: T | null
}

withDefaults(defineProps<Props>(), {})

const showBarcode = ref(false)

const serialNumbers = ref<string[]>([])

const serialNumber = ref<string | null>()

const handleShowBarcode = () => {
  showBarcode.value = true
}

const handleInsert = (value?: string | null) => {
  if (!value)
    return Notify.create({
      message: 'Please Insert Serial Number',
      type: 'negative',
    })

  serialNumbers.value?.push(value)

  serialNumber.value = null
}

const handleDelete = () => {
  ///
}
</script>
