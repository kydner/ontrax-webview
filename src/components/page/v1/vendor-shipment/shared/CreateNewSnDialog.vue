<template>
  <q-dialog v-model="isOpen" maximized transition-duration="300" position="bottom">
    <swipe-wrapper :swipe-down="close">
      <q-card flat class="preview-check-card tw-h-[95vh] tw-overflow-y-auto">
        <!-- Header -->
        <q-card-section class="tw-relative tw-flex tw-justify-between tw-pb-0 tw-mb-0">
          <div
            class="tw-absolute tw-top-3 tw-left-1/2 -tw-translate-x-1/2 tw-w-[40px] tw-h-[3px] tw-bg-gray-300 tw-rounded-sm"
          ></div>
          <span></span>
          <q-btn dense flat round icon="close" color="white" v-close-popup @click.stop="close" />
        </q-card-section>

        <!-- Body (slot) -->
        <q-card-section>
          <div class="tw-grid tw-grid-cols-12 tw-gap-2">
            <div class="tw-col-span-12">
              <div class="tw-grid tw-grid-cols-12">
                <div class="tw-col-span-12 tw-text-secondary-text">Serial Number</div>
                <div class="tw-col-span-12">5S2340T65748</div>
              </div>
            </div>

            <div class="tw-col-span-12">
              <k-select-module
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
                v-model="form.itemName"
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
        </q-card-section>
      </q-card>
    </swipe-wrapper>
  </q-dialog>
</template>

<script setup lang="ts">
import { Product } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { ProductDataRequest, ProductResponsePage } from 'src/common/model/product.model'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'

interface Props {
  modelValue: boolean
  title?: string
}

interface Emits {
  (e: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Save New Item',
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const metaProduct: IMetaListModule<ProductResponsePage> = Product

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const close = () => emit('update:modelValue', false)

const form = ref({} as ProductDataRequest)
</script>
