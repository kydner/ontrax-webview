<template>
  <swipe-wrapper :swipe-right="handleBack">
    <div class="tw-flex tw-flex-col tw-justify-between tw-min-h-[90vh] tw-h-screen tw-overflow-y-auto">
      <div>
        <k-toolbar class="tw-pb-1" @back="handleBack">
          <template #title>
            <q-input v-model="search" :show-label="false" placeholder="Search by Name" borderless class="fit" />
          </template>
        </k-toolbar>
        <q-separator dark class="tw-mb-4"></q-separator>
        <div v-if="state.isLoading">
          <k-card v-for="i in 5" :key="i" class="tw-my-2">
            <q-card-section class="tw-p-2">
              <div class="tw-flex tw-items-center tw-justify-between">
                <div class="tw-flex tw-items-center tw-space-x-2">
                  <q-skeleton type="rect" width="20px" height="20px" />
                  <q-skeleton type="rect" width="40px" height="40px" />
                  <div class="tw-flex tw-flex-col tw-gap-1">
                    <q-skeleton type="text" width="100px" />
                    <q-skeleton type="text" width="150px" />
                  </div>
                </div>
                <div>
                  <q-skeleton type="QInput" width="100px" />
                </div>
              </div>
            </q-card-section>
          </k-card>
        </div>
        <div v-else>
          <k-card v-for="product in filteredProducts" :key="product.productId" class="tw-my-2">
            <q-card-section class="tw-p-2 tw-py-0">
              <div class="tw-flex tw-items-center tw-justify-between">
                <div class="tw-flex tw-justify-between tw-space-x-2">
                  <q-checkbox
                    :model-value="isChecked(product.productId)"
                    :true-value="true"
                    :false-value="false"
                    class="tw-mr-2"
                    checked-icon="img:/icons/rectangle__checked.svg"
                    unchecked-icon="img:/icons/rectangle__unchecked.svg"
                    color="grey"
                    @update:model-value="(val) => toggleItem(product, val)"
                  />
                  <product-image :item-id="product?.productId || ''" />
                  <div class="tw-basis-auto">
                    <div class="tw-flex tw-flex-col">
                      <span class="tw-text-secondary-text">{{ product?.productCode }}</span>
                      <span>{{ product?.productName }}</span>
                    </div>
                  </div>
                </div>
                <div class="tw-basis-auto tw-text-right">
                  <plus-minus-field
                    v-model="product.qtyOrder"
                    :allow-increase="true"
                    :disable="!isChecked(product.productId)"
                    @update:model-value="(val) => updateQty(product, val as number)"
                  />
                </div>
              </div>
              <q-separator dark spaced></q-separator>
            </q-card-section>
          </k-card>
        </div>
      </div>
      <div class="tw-my-4">
        <div class="tw-flex tw-flex-col tw-mb-2">
          <span class="tw-text-xs">{{ t('items') }} : {{ receivedItemLength }}</span>
          <span class="tw-text-xs">{{ t('quantity') }} : {{ totalQuantity }}</span>
        </div>
        <div>
          <k-btn :label="t('save')" color="secondary" :disable="state.isLoading" class="fit" @click="handleBack" />
        </div>
      </div>
    </div>
  </swipe-wrapper>
</template>
<script setup lang="ts">
import { id, ResponseState } from 'src/common/interfaces/response.interface'
import { Notify } from 'src/common/utils/plugin.utils'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { onMounted, reactive, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import { format } from 'src/common/utils/converter.utils'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'
import { VendorShipmentV1Response } from 'src/common/model/vendor-shipment-v1.model'
import { VendorShipmentDetailV1Response } from 'src/common/model/vendor-shipment-detail-v1.model'
import { useContractProductRepository } from 'src/common/repository/contract-product.repository'

interface Props {
  modelValue: VendorShipmentV1Response
}

interface Emits {
  (event: 'back'): void
  (event: 'update:modelValue', value: VendorShipmentV1Response): void
}

const { t } = useI18n()

const props = withDefaults(defineProps<Props>(), {})

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const details = computed({
  get: () => props.modelValue?.details || [],
  set: (value) =>
    emit('update:modelValue', {
      ...form.value,
      details: [...value],
    }),
})
const emit = defineEmits<Emits>()

const productRepo = useContractProductRepository()

const search = ref()

const handleBack = () => {
  emit('back')
}

const state = reactive<ResponseState<VendorShipmentDetailV1Response[]>>({
  isLoading: false,
  data: null,
  errorMessage: null,
})

const filteredProducts = computed(() => {
  if (!state.data) return []

  const keyword = search.value?.toLowerCase() || ''
  return state.data.filter((product) => product.productName?.toLowerCase()?.includes(keyword))
})

const receivedItemLength = computed(() => format(details.value?.length || 0, { precision: 0 }))

const totalQuantity = computed(() =>
  format(
    details.value?.reduce((sum, item) => sum + (item.qtyOrder || 1), 0),
    { precision: 0 },
  ),
)

const fetchData = async () => {
  try {
    state.isLoading = true
    state.data = null
    state.errorMessage = null

    console.log(form.value)
    const response = await productRepo.getAll({
      contractId: form.value?.contractId,
    })

    state.data = response.map((product) => {
      const existing = details.value.find((item) => item.productId === product.id)

      return {
        productId: product.productId,
        productName: product.productName,
        productCode: product.productCode,
        isUniqueSerialNumber: product?.isUniqueSerialNumber,
        notes: existing?.notes ?? '',
        qtyOrder: existing?.qtyOrder ?? 1,
        qtyOrdered: existing?.qtyOrdered ?? 0,
        qtyReceived: existing?.qtyReceived ?? 0,
        qtyRejected: existing?.qtyRejected ?? 0,
        vendorShipmentId: existing?.vendorShipmentId || props.modelValue?.id,
      } as VendorShipmentDetailV1Response
    })
    // .filter((item) => item.vendorShipmentId !== undefined) as VendorShipmentDetailV1Response[]
  } catch (error) {
    Notify.error({ message: error as Error })
  } finally {
    state.isLoading = false
  }
}

const isChecked = (productId: id | null) => {
  return details.value.some((item) => item.productId === productId)
}

const updateQty = (product: VendorShipmentDetailV1Response, qty: number) => {
  const current = details.value.slice()
  const index = current?.findIndex((item) => item.productId === product.id)

  if (index > -1) {
    current[index].qtyOrder = qty ?? 1
  }

  details.value = current
}

const toggleItem = (product: VendorShipmentDetailV1Response, checked: boolean) => {
  const current = [...details.value]
  const index = current?.findIndex((item) => item.productId === product.id)

  if (checked) {
    if (index === -1) {
      current.push({
        productId: product.productId,
        productName: product.productName,
        productCode: product.productCode,
        qtyOrder: 1,
        notes: '',
        isUniqueSerialNumber: product?.isUniqueSerialNumber,
        filename: product?.filename,
        vendorShipmentId: product.vendorShipmentId,
        qtyOrdered: product?.qtyOrdered,
        qtyReceived: product?.qtyReceived,
        qtyRejected: product?.qtyRejected,
      })
    }
  } else {
    if (index > -1) {
      current.splice(index, 1)
    }
  }

  details.value = current
}

onMounted(() => {
  fetchData()
})
</script>
