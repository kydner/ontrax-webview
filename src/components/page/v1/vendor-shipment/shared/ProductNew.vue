<template>
  <swipe-wrapper :swipe-down="handleBack">
    <!-- Header -->
    <k-toolbar header-title="Save New Item" @back="emit('back')" />

    <!-- Body (slot) -->
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
      <div class="tw-col-span-12">
        <div class="tw-grid tw-grid-cols-12">
          <div class="tw-col-span-12 tw-text-secondary-text">Serial Number</div>
          <div class="tw-col-span-12">5S2340T65748</div>
        </div>
      </div>

      <div class="tw-col-span-12">
        <k-select-module
          v-model="form.productName"
          t-label="product"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
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

      <div class="tw-col-span-12">
        <k-select-module
          v-model="form.productName"
          t-label="workPackage"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
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

      <div class="tw-col-span-12">
        <k-select-module
          v-model="form.productName"
          t-label="subWorkPackage"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
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

      <div class="tw-col-span-12">
        <k-select-module
          v-model="form.productName"
          t-label="siteLocation"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
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
          v-model="form.productName"
          t-label="srtPartNumber"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="srtSerialNumber"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="manufacture"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="manufacturePartNumber"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="palletNumber"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="boqReff"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="origin"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
        >
        </k-input>
      </div>
      <div class="tw-col-span-6">
        <k-input
          v-model="form.productName"
          t-label="sampleNumber"
          :meta="metaProduct"
          required
          :outlined="true"
          behavior="menu"
          option-label="warehouseName"
          option-value="locationWarehouseId"
          :placeholder="t('empty')"
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
import { ProductV1 } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { ProductV1DataRequest, ProductV1ResponsePage } from 'src/common/model/product-v1.model'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import KToolbar from 'src/components/ui/KToolbar.vue'

interface Props {}

interface Emits {
  (e: 'back'): void
}

withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const metaProduct: IMetaListModule<ProductV1ResponsePage> = ProductV1

const form = ref({} as ProductV1DataRequest)

const handleBack = () => emit('back')
</script>
