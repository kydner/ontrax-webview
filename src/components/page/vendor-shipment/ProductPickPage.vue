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
          <k-card v-for="product in filteredProducts" :key="product.itemId" class="tw-my-2">
            <q-card-section class="tw-p-2 tw-py-0">
              <div class="tw-flex tw-items-center tw-justify-between">
                <div class="tw-flex tw-justify-between tw-space-x-2">
                  <q-checkbox
                    :model-value="isChecked(product.itemId)"
                    :true-value="true"
                    :false-value="false"
                    class="tw-mr-2"
                    checked-icon="img:/icons/rectangle__checked.svg"
                    unchecked-icon="img:/icons/rectangle__unchecked.svg"
                    color="grey"
                    @update:model-value="(val) => toggleItem(product, val)"
                  />
                  <product-image :item-id="product?.itemId || ''" />
                  <div class="tw-basis-auto">
                    <div class="tw-flex tw-flex-col">
                      <span class="tw-text-secondary-text">{{ product?.skuCode }}</span>
                      <span>{{ product?.itemName }}</span>
                    </div>
                  </div>
                </div>
                <div class="tw-basis-auto tw-text-right">
                  <plus-minus-field
                    v-model="product.qtyOrdered"
                    :allow-increase="true"
                    :disable="!isChecked(product.itemId)"
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
import { useProductRepository } from 'src/common/repository/product.repository'
import { Notify } from 'src/common/utils/plugin.utils'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { onMounted, reactive, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { computed } from 'vue'
import { VendorShipmentResponse } from 'src/common/model/vendor-shipment.model'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import { ShipmentGoodReceiveItem } from 'src/common/model/operational.model'
import { format } from 'src/common/utils/converter.utils'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'

interface Props {
  modelValue: VendorShipmentResponse
}

interface Emits {
  (event: 'back'): void
  (event: 'update:modelValue', value: VendorShipmentResponse): void
}

const { t } = useI18n()

const props = withDefaults(defineProps<Props>(), {})

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const receiveItems = computed({
  get: () => props.modelValue?.receiveItems || [],
  set: (value) =>
    emit('update:modelValue', {
      ...currentValue.value,
      receiveItems: [...value],
    }),
})
const emit = defineEmits<Emits>()

const productRepo = useProductRepository()

const search = ref()

const handleBack = () => {
  emit('back')
}

const state = reactive<ResponseState<ShipmentGoodReceiveItem[]>>({
  isLoading: false,
  data: null,
  errorMessage: null,
})

const filteredProducts = computed(() => {
  if (!state.data) return []

  const keyword = search.value?.toLowerCase() || ''
  return state.data.filter((product) => product.itemName.toLowerCase().includes(keyword))
})

const receivedItemLength = computed(() => format(receiveItems.value?.length || 0, { precision: 0 }))

const totalQuantity = computed(() =>
  format(
    receiveItems.value?.reduce((sum, item) => sum + (item.qtyOrdered || 0), 0),
    { precision: 0 },
  ),
)

const fetchData = async () => {
  try {
    state.isLoading = true
    state.data = null
    state.errorMessage = null

    const response = await productRepo.getAll({})

    state.data = response.map((product) => {
      const existing = receiveItems.value.find((item) => item.itemId === product.itemId)

      return {
        itemId: product.itemId,
        itemName: product.itemName,
        skuCode: product.skuCode,
        description: product.description,
        unit: product.unit,
        unitPrice: product.unitPrice,
        isActive: product.isActive,
        qtyOrdered: existing?.qtyOrdered ?? 1,
        qtyReceived: existing?.qtyReceived ?? 0,
        notes: existing?.notes ?? '',
        goodsReceiveItemId: existing?.goodsReceiveItemId ?? null,
        fileId: existing?.fileId ?? '',
      }
    })
  } catch (error) {
    Notify.error({ message: error as Error })
  } finally {
    state.isLoading = false
  }
}

const isChecked = (itemId: id | null) => {
  return receiveItems.value.some((item) => item.itemId === itemId)
}

const updateQty = (product: ShipmentGoodReceiveItem, qty: number) => {
  const current = receiveItems.value.slice()
  const index = current?.findIndex((item) => item.itemId === product.itemId)

  if (index > -1) {
    current[index].qtyOrdered = qty ?? 1
  }

  receiveItems.value = current
}

const toggleItem = (product: ShipmentGoodReceiveItem, checked: boolean) => {
  const current = [...receiveItems.value]
  const index = current?.findIndex((item) => item.itemId === product.itemId)

  if (checked) {
    if (index === -1) {
      current.push({
        itemId: product.itemId,
        itemName: product.itemName,
        skuCode: product.skuCode,
        qtyOrdered: 1,
        notes: '',
        qtyReceived: 0,
        unitPrice: 0,
        goodsReceiveItemId: product.goodsReceiveItemId,
        fileId: product?.fileId,
      })
    }
  } else {
    if (index > -1) {
      current.splice(index, 1)
    }
  }

  receiveItems.value = current
}

onMounted(() => {
  fetchData()
})
</script>
