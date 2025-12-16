<template>
  <swipe-wrapper :swipe-down="handleBack">
    <!-- Header -->
    <k-toolbar header-title="Save New Item" @back="emit('back')" />

    <!-- Body (slot) -->
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
      <div class="tw-col-span-12">
        <div class="tw-grid tw-grid-cols-12">
          <div class="tw-col-span-12 tw-text-secondary-text">Serial Number</div>
          <div class="tw-col-span-12">{{ form.serialNumber ?? '-' }}</div>
        </div>
      </div>

      <div class="tw-col-span-12">
        <k-select-module
          v-model="form.workPackageId"
          t-label="workPackage"
          :meta="WorkPackage"
          required
          :outlined="true"
          behavior="menu"
          option-label="name"
          option-value="id"
          :placeholder="t('select')"
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
          required
          :outlined="true"
          behavior="menu"
          option-label="name"
          option-value="id"
          :placeholder="t('select')"
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
          required
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
          required
          :outlined="true"
          :placeholder="t('srtPartNumber')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.srtSerialNumber"
          t-label="srtSerialNumber"
          required
          :outlined="true"
          :placeholder="t('srtSerialNumber')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="manufacture"
          required
          :outlined="true"
          :placeholder="t('manufacture')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="manufacturePartNumber"
          required
          :outlined="true"
          :placeholder="t('manufacturePartNumber')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.palletNumber"
          t-label="palletNumber"
          required
          :outlined="true"
          :placeholder="t('palletNumber')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input v-model="form.boqPackage" t-label="boqReff" required :outlined="true" :placeholder="t('boqReff')">
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input v-model="form.origin" t-label="origin" required :outlined="true" :placeholder="t('origin')"> </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.sampleNumber"
          t-label="sampleNumber"
          required
          :outlined="true"
          :placeholder="t('sampleNumber')"
        >
        </k-input>
      </div>

      <div class="tw-col-span-12 tw-my-4">
        <k-btn color="secondary" :label="t('button.save')" class="tw-w-full" />
      </div>
    </div>
  </swipe-wrapper>
</template>
<script setup lang="ts">
import { WarehouseSite, WorkPackage } from 'src/common/constants/meta.constant'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import { onActivated, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { ContractProductDataRequest } from 'src/common/model/contract-product.model'
import { bus } from 'src/common/event-bus'

interface Props {}

interface Emits {
  (e: 'back'): void
}

withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const form = ref({} as ContractProductDataRequest)

const handleBack = () => emit('back')

onActivated(() => {
  bus.on('shipment:contract-product:create', (serialNumber: string) => {
    console.log(serialNumber, 'activeted sn')
    form.value.serialNumber = serialNumber
  })
})

onMounted(() => {
  bus.on('shipment:contract-product:create', (serialNumber: string) => {
    console.log(serialNumber, 'mounted sn')
    form.value.serialNumber = serialNumber
  })
})
</script>
