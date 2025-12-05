<template>
  <div class="tw-my-4 tw-min-h-[60vh]">
    <k-btn v-if="showCreateButton" color="secondary" label="Add Product" @click="handleProductPick" />
    <q-card flat class="tw-my-4">
      <q-input model-value="" color="secondary" dense placeholder="Search Part Number">
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>
    <k-card v-for="(product, index) in receiveItems" :key="index" class="gradient-card tw-my-2">
      <q-card-section class="tw-p-2" v-ripple @click="handlePreview(product)">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-flex-col tw-space-y-1 tw-mb-1">
            <div v-if="product.isHasSN">SN: 99012323333</div>
            <div class="tw-flex tw-justify-between tw-space-x-2">
              <product-image :item-id="product?.itemId || ''" />
              <div class="tw-basis-auto">
                <div class="tw-flex tw-flex-col">
                  <span class="tw-text-secondary-text">{{ product?.skuCode || '-' }}</span>
                  <span>{{ product.itemName || '-' }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-space-y-2 tw-basis-auto tw-text-right">
            <template v-if="product?.isHasSN">
              <div class="tw-basis-full tw-flex tw-justify-between tw-space-x-4">
                <div class="tw-basis-auto tw-space-x-4">
                  <q-icon name="img:/icons/qty-order__secondary-text.svg" />
                  <span class="tw-text-secondary-text tw-text-xs">Qty Order</span>
                </div>
                <div>
                  <span class="tw-text-white tw-text-xs">{{ format(product.qtyOrdered, { precision: 0 }) }}</span>
                </div>
              </div>
              <div class="tw-basis-full tw-flex tw-justify-between tw-space-x-4">
                <div class="tw-basis-auto tw-space-x-4">
                  <q-icon name="img:/icons/qty-order__secondary-text.svg" />
                  <span class="tw-text-secondary-text tw-text-xs">Qty Send</span>
                </div>
                <div>
                  <span class="tw-text-white tw-text-xs">{{ format(product.qtyReceived, { precision: 0 }) }}</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-if="['IN_TRANSIT'].includes(form.status)" class="tw-flex tw-items-center tw-space-x-6 tw-text-xs">
                <div class="tw-basis-auto tw-flex tw-items-center tw-space-x-2">
                  <q-icon name="img:/icons/qty-order__secondary-text.svg" />
                  <div class="tw-text-secondary-text">Qty Ordered</div>
                </div>
                <div>
                  {{ format(product.qtyOrdered, { precision: 0 }) }}
                </div>
              </div>
              <span v-if="form.status === 'RECEIVED'" class="tw-text-xs">
                Qty Order: {{ format(product.qtyOrdered, { precision: 0 }) }}
              </span>
              <plus-minus-field
                v-if="['IN_TRANSIT', 'RECEIVED'].includes(form.status)"
                v-model="product.qtyReceived"
                :allow-increase="true"
                :max="product.qtyOrdered"
                :disable="form.status === 'RECEIVED'"
                @increase="handleIncrease(index)"
                @zero:confirm="handleZeroConfirm(index)"
                @click.stop
              />
              <template v-if="(['DRAFT'].includes(form.status) || !form.status) && product.isHasSN">
                <plus-minus-field
                  v-model="product.qtyOrdered"
                  :allow-increase="false"
                  :disable-value="true"
                  :disable-decrease="true"
                  :zero-confirm="false"
                  @increase="handlePreview(product)"
                  @zero:confirm="handleZeroConfirm(index)"
                  @click.stop
                />
              </template>
              <template v-else>
                <plus-minus-field
                  v-model="product.qtyOrdered"
                  :allow-increase="true"
                  :disable="!!product.isHasSN"
                  :zero-confirm="!product.isHasSN"
                  @increase="handleIncrease(index)"
                  @zero:confirm="handleZeroConfirm(index)"
                  @click.stop
                />
              </template>
            </template>
          </div>
        </div>
      </q-card-section>
    </k-card>

    <q-card
      v-if="form.status === 'IN_TRANSIT'"
      flat
      class="tw-relative tw-border tw-border-brand-primary tw-rounded-base tw-py-2"
    >
      <div
        class="tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-cursor-pointer"
        v-ripple
        @click.stop="handleScan()"
      >
        <span>Scan Item</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1138_2858)">
            <path
              d="M2.99717 0C2.20319 0.00298678 1.44259 0.319718 0.881156 0.881149C0.319725 1.44258 0.00299394 2.20319 7.15867e-06 2.99717V8.00126C0.00100274 8.26559 0.106447 8.5188 0.293355 8.70571C0.480262 8.89262 0.733477 8.99806 0.997802 8.99906C1.26278 8.99906 1.51697 8.89405 1.70469 8.70704C1.89241 8.52002 1.99838 8.26624 1.99938 8.00126V2.99717C1.99734 2.86557 2.02175 2.7349 2.07117 2.61292C2.12059 2.49094 2.19402 2.38013 2.28708 2.28707C2.38014 2.19401 2.49095 2.12059 2.61293 2.07117C2.73491 2.02174 2.86558 1.99733 2.99717 1.99937H8.00127C8.26625 1.99837 8.52003 1.89241 8.70705 1.70468C8.89406 1.51696 8.99906 1.26278 8.99906 0.997795C8.99807 0.73347 8.89262 0.480255 8.70572 0.293347C8.51881 0.10644 8.26559 0.000995586 8.00127 0L2.99717 0ZM15.9987 0C15.7344 0.000995586 15.4812 0.10644 15.2943 0.293347C15.1074 0.480255 15.0019 0.73347 15.001 0.997795C15.0009 1.26212 15.1054 1.51574 15.2916 1.70336C15.4778 1.89097 15.7306 1.99738 15.995 1.99937H21.0028C21.1341 1.99784 21.2644 2.02263 21.3859 2.07228C21.5075 2.12193 21.6178 2.19543 21.7105 2.28844C21.8031 2.38145 21.8762 2.49209 21.9254 2.61382C21.9746 2.73554 21.9989 2.86589 21.9969 2.99717V8.00126C21.9974 8.13279 22.0238 8.26293 22.0745 8.38426C22.1253 8.50559 22.1995 8.61572 22.2929 8.70838C22.3862 8.80103 22.4969 8.87439 22.6186 8.92426C22.7403 8.97414 22.8707 8.99955 23.0022 8.99906C23.2665 8.99806 23.5198 8.89262 23.7067 8.70571C23.8936 8.5188 23.999 8.26559 24 8.00126V2.99717C23.997 2.20319 23.6803 1.44258 23.1189 0.881149C22.5574 0.319718 21.7968 0.00298678 21.0028 0L15.9987 0ZM0.990243 15.0009C0.727883 15.0039 0.477161 15.1097 0.291986 15.2956C0.106811 15.4815 0.00197063 15.7326 7.15867e-06 15.995V21.0028C7.15867e-06 22.6469 1.35308 24 2.99717 24H8.00127C8.26559 23.999 8.51881 23.8936 8.70572 23.7067C8.89262 23.5197 8.99807 23.2665 8.99906 23.0022C8.99956 22.8707 8.97415 22.7403 8.92427 22.6186C8.8744 22.4969 8.80104 22.3862 8.70838 22.2929C8.61573 22.1995 8.50559 22.1253 8.38427 22.0745C8.26294 22.0237 8.1328 21.9973 8.00127 21.9969H2.99717C2.8659 21.9989 2.73555 21.9746 2.61382 21.9254C2.4921 21.8762 2.38146 21.8031 2.28845 21.7105C2.19544 21.6178 2.12194 21.5075 2.07229 21.3859C2.02264 21.2644 1.99785 21.1341 1.99938 21.0028V15.995C1.99738 15.7306 1.89098 15.4778 1.70336 15.2916C1.51575 15.1054 1.26213 15.0009 0.997802 15.0009H0.990243ZM22.9984 15.0009C22.7334 14.9999 22.4789 15.104 22.2904 15.2903C22.102 15.4766 21.9951 15.73 21.9931 15.995V21.0028C21.9946 21.1338 21.9699 21.2637 21.9205 21.385C21.8711 21.5063 21.7979 21.6165 21.7053 21.7091C21.6127 21.8017 21.5025 21.8749 21.3812 21.9243C21.26 21.9737 21.13 21.9984 20.9991 21.9969H15.995C15.73 21.9988 15.4766 22.1058 15.2903 22.2942C15.104 22.4826 14.9999 22.7372 15.001 23.0022C15.0019 23.2659 15.1069 23.5185 15.293 23.7053C15.479 23.8921 15.7313 23.998 15.995 24H21.0028C21.7968 23.997 22.5574 23.6803 23.1189 23.1189C23.6803 22.5574 23.997 21.7968 24 21.0028V15.995C23.998 15.7313 23.8921 15.479 23.7053 15.2929C23.5185 15.1069 23.2621 15.0019 22.9984 15.0009ZM0.997802 10.9984C0.866274 10.9989 0.73613 11.0253 0.614803 11.0761C0.493476 11.1269 0.383341 11.2011 0.290687 11.2944C0.198033 11.3878 0.124674 11.4985 0.0747992 11.6202C0.0249243 11.7419 -0.000490113 11.8723 7.15867e-06 12.0038C0.00199532 12.2674 0.107878 12.5197 0.294678 12.7058C0.481479 12.8919 0.734128 12.9968 0.997802 12.9978H23.0022C23.2659 12.9968 23.5185 12.8919 23.7053 12.7058C23.8921 12.5197 23.998 12.2674 24 12.0038C24.0005 11.8723 23.9751 11.7419 23.9252 11.6202C23.8753 11.4985 23.802 11.3878 23.7093 11.2944C23.6167 11.2011 23.5065 11.1269 23.3852 11.0761C23.2639 11.0253 23.1337 10.9989 23.0022 10.9984H0.997802Z"
              fill="#FF6F4F"
            />
            <path
              d="M6.00194 4.99659C5.86978 4.99609 5.73882 5.02175 5.61662 5.0721C5.49442 5.12245 5.38339 5.19648 5.28994 5.28994C5.19648 5.38339 5.12245 5.49442 5.0721 5.61662C5.02175 5.73882 4.99609 5.86978 4.99659 6.00194V17.9982C4.99659 18.13 5.02262 18.2606 5.07319 18.3823C5.12376 18.5041 5.19787 18.6147 5.29128 18.7077C5.38468 18.8008 5.49554 18.8745 5.6175 18.9246C5.73945 18.9747 5.8701 19.0002 6.00194 18.9997H17.9982C18.2638 18.9997 18.5186 18.8942 18.7064 18.7064C18.8942 18.5186 18.9997 18.2638 18.9997 17.9982V6.00194C19.0002 5.8701 18.9747 5.73945 18.9246 5.6175C18.8745 5.49554 18.8008 5.38468 18.7077 5.29128C18.6147 5.19787 18.5041 5.12376 18.3823 5.07319C18.2606 5.02262 18.13 4.99659 17.9982 4.99659H6.00194ZM6.99974 6.99974H17.0004V17.0004H6.99974V6.99974Z"
              fill="#B0B0B5"
            />
          </g>
          <defs>
            <clipPath id="clip0_1138_2858">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </q-card>

    <div v-if="receiveItems?.length === 0" class="tw-my-4 tw-text-disable-text">{{ t('noData') }}</div>
  </div>

  <!-- Single Dialog reused for all items -->
  <q-dialog v-model="isDialogOpen" dark no-backdrop-dismiss no-esc-dismiss>
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section
        v-if="dialogIndex !== null && dialogIndex !== undefined"
        class="tw-flex tw-flex-col tw-space-y-2 tw-pt-4"
      >
        <k-card flat borderless>
          <q-card-section class="tw-p-2">
            <div class="tw-flex tw-items-center tw-justify-between">
              <div class="tw-flex tw-justify-between tw-space-x-2">
                <product-image :item-id="receiveItems[dialogIndex]?.itemId || ''" />
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-flex-col">
                    <span class="tw-text-secondary-text">{{ receiveItems[dialogIndex]?.skuCode }}</span>
                    <span>{{ receiveItems[dialogIndex]?.itemName }}</span>
                  </div>
                </div>
              </div>
              <div class="tw-basis-auto tw-text-right">
                <plus-minus-field
                  v-if="form.status === 'IN_TRANSIT'"
                  v-model="receiveItems[dialogIndex].qtyReceived"
                  :allow-increase="true"
                  :max="receiveItems[dialogIndex]?.qtyOrdered"
                  :disable="isDisable"
                  @click.stop
                />
                <plus-minus-field
                  v-else
                  v-model="receiveItems[dialogIndex].qtyOrdered"
                  :allow-increase="true"
                  :disable="isDisable"
                  @click.stop
                />
              </div>
            </div>
          </q-card-section>
        </k-card>
        <k-text-area
          v-model="receiveItems[dialogIndex].notes"
          t-label="note"
          :show-label="false"
          :placeholder="t('note')"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="t('save')" color="secondary" dense v-close-popup @click="dialogIndex = null" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- PREVIEW DIALOG -->
  <detail-preview v-model="previewItem">
    <template #default="{ item }">
      <!-- DETAIL DEFAULT -->
      <div>
        <div class="tw-col-span-12 tw-flex tw-space-x-4">
          <product-image :item-id="item.itemId || ''" size="60px" />
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-semibold tw-text-lg">{{ item.itemName || '-' }}</span>
            <span>{{ item.skuCode || '-' }}</span>
          </div>
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyOrdered') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          {{ format(item.qtyOrdered, { precision: 0 }) || '-' }}
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('qtyReceive') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          {{ format(item.qtyReceived, { precision: 0 }) || '-' }}
        </div>

        <div class="tw-col-span-4 tw-text-secondary-text tw-text-xs">{{ t('attachFile') }}</div>
        <div class="tw-col-span-8 tw-text-xs">
          <attachment-file-preview :attachment-info="item?.attachmentInfo" />
        </div>

        <div class="tw-col-span-12 tw-py-2">
          <div class="tw-text-secondary-text tw-text-xs">Remark Good Receive</div>
          <div>
            {{ item.notes || '-' }}
          </div>
        </div>
      </div>
    </template>
  </detail-preview>

  <scan-dialog v-model="showScanDialog" />
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { VendorShipmentDataRequest } from 'src/common/model/vendor-shipment.model'
import KCard from 'src/components/ui/KCard.vue'
import { computed, ref } from 'vue'
import PlusMinusField from 'src/components/ui/PlusMinusField.vue'
import { useI18n } from 'vue-i18n'
import ProductImage from 'src/components/images/Product.vue'
import { format } from 'src/common/utils/converter.utils'
import AttachmentFilePreview from 'src/components/ui/AttachmentFilePreview.vue'
import { ShipmentGoodReceiveItem } from 'src/common/model/operational.model'
import DetailPreview from '../operational/DetailPreview.vue'
import ScanDialog from './ScanDialog.vue'

interface Props {
  modelValue: VendorShipmentDataRequest
  isDisable?: boolean
}

interface Emits {
  (event: 'update:model-value', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  isDisable: false,
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const dialogIndex = ref<number | null>(null)

const previewItem = ref<ShipmentGoodReceiveItem | null>(null)

const showScanDialog = ref(false)

const isDialogOpen = computed({
  get: () => dialogIndex.value !== null,
  set: (val: boolean) => {
    if (!val) dialogIndex.value = null
  },
})

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const receiveItems = computed({
  get: () => form.value?.receiveItems || [],
  set: (value) => {
    form.value.receiveItems = value
    emit('update:model-value', form.value)
  },
})

const showCreateButton = computed(() => {
  return !['IN_TRANSIT', 'RECEIVED'].includes(form.value.status)
})

const handleProductPick = () => {
  bus.emit('product:pick')
}

const handleIncrease = (index: number) => {
  dialogIndex.value = index
}

const handleZeroConfirm = (index: number) => {
  receiveItems.value?.splice(index, 1)
  dialogIndex.value = null
}

const handlePreview = (item: ShipmentGoodReceiveItem) => {
  previewItem.value = item
}

const handleScan = () => {
  showScanDialog.value = true
}
</script>
