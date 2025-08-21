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
                  <product-image :item-id="product?.itemId" />
                  <div class="tw-basis-auto">
                    <div class="tw-flex tw-flex-col">
                      <span class="tw-text-secondary-text">{{ product?.skuCode }}</span>
                      <span>{{ product?.itemName }}</span>
                    </div>
                  </div>
                </div>
                <div class="tw-basis-auto tw-text-right">
                  <plus-minus-field
                    v-model="product.qty"
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
import { ReceiveItemResponse } from 'src/common/model/receive-item.model'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import { ErrorId } from 'src/common/exceptions/error-id'
import { ReceiveItem } from 'src/common/model/operational.model'
import SwipeWrapper from 'src/components/ui/SwipeWrapper.vue'

interface Props {
  modelValue: ReceiveItemResponse
  warehouseId: id
}

interface Emits {
  (event: 'back'): void
  (event: 'update:modelValue', value: ReceiveItemResponse): void
}

const { t } = useI18n()

const props = withDefaults(defineProps<Props>(), {})

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const transferItems = computed({
  get: () => props.modelValue?.transferItems || [],
  set: (value) =>
    emit('update:modelValue', {
      ...currentValue.value,
      transferItems: [...value],
    }),
})
const emit = defineEmits<Emits>()

const productRepo = useProductRepository()

const search = ref()

const handleBack = () => {
  emit('back')
}

const state = reactive<ResponseState<ReceiveItem[]>>({
  isLoading: false,
  data: null,
  errorMessage: null,
})

const filteredProducts = computed(() => {
  if (!state.data) return []

  const keyword = search.value?.toLowerCase() || ''
  return state.data.filter((product) => product.itemName.toLowerCase().includes(keyword))
})

const receivedItemLength = computed(() => transferItems.value?.length || 0)

const totalQuantity = computed(() => transferItems.value?.reduce((sum, item) => sum + (item.qty || 0), 0))

const fetchData = async () => {
  try {
    state.isLoading = true
    state.data = null
    state.errorMessage = null

    if (!props.warehouseId) throw new ErrorId('warehouseId')

    const response = await productRepo.availableItem(props.warehouseId)

    state.data = response.map((product) => {
      const existing = transferItems.value.find((item) => item.itemId === product.itemId)

      return {
        itemId: product.itemId,
        skuCode: product.skuCode,
        itemName: product.itemName,
        availableQty: product.availableQty,
        notes: existing?.notes ?? '',
        stockTransferItemId: existing?.stockTransferItemId ?? null,
        qty: existing?.qty ?? 1,
        qtyReceived: 0,
        qtyTransfer: 0,
        qcStockTransferItemId: existing?.qcStockTransferItemId ?? null,
        fileId: existing?.fileId ?? '',
      }
    })
  } catch (error) {
    Notify.error({ message: error as Error })
  } finally {
    state.isLoading = false
  }
}

const isChecked = (itemId: id) => {
  return transferItems.value.some((item) => item.itemId === itemId)
}

const updateQty = (product: ReceiveItem, qty: number) => {
  const current = transferItems.value.slice()
  const index = current?.findIndex((item) => item.itemId === product.itemId)

  if (index > -1) {
    current[index].qty = qty ?? 1
  }

  transferItems.value = current
}

const toggleItem = (product: ReceiveItem, checked: boolean) => {
  const current = [...transferItems.value]
  const index = current?.findIndex((item) => item.itemId === product.itemId)

  if (checked) {
    if (index === -1) {
      current.push({
        stockTransferItemId: product.stockTransferItemId,
        itemId: product.itemId,
        itemName: product.itemName,
        skuCode: product.skuCode,
        qtyTransfer: 0,
        qtyReceived: 0,
        notes: '',
        qty: 1,
        fileId: product?.fileId,
      })
    }
  } else {
    if (index > -1) {
      current.splice(index, 1)
    }
  }

  transferItems.value = current
}

onMounted(() => {
  fetchData()
})
</script>
