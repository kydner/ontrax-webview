<template>
  <div class="">
    <h3 class="tw-text-lg tw-font-medium tw-mb-2">PR-9901234</h3>
    <k-popup-edit v-model="currentValue.itemCount" t-label="shippingDate" required horizontal-label>
      <template #default="scope">
        <k-input
          color="accent"
          v-model="scope.value"
          dense
          autofocus
          :show-label="false"
          t-label="shippingDate"
          @keyup.enter="scope.set"
        />
      </template>
      <template #preview:prefix>
        <q-icon name="img:/icons/calendar.svg" />
      </template>
    </k-popup-edit>

    <k-popup-edit v-model="currentValue.date" t-label="targetReceiveDate" required horizontal-label>
      <template #default="scope">
        <k-input
          color="accent"
          v-model="scope.value"
          dense
          autofocus
          :show-label="false"
          t-label="targetReceiveDate"
          @keyup.enter="scope.set"
        />
      </template>
      <template #preview:prefix>
        <q-icon name="img:/icons/calendar.svg" />
      </template>
    </k-popup-edit>

    <k-popup-edit v-model="currentValue.company" t-label="client" required horizontal-label>
      <template #default="scope">
        <k-input
          color="accent"
          v-model="scope.value"
          dense
          autofocus
          :show-label="false"
          t-label="client"
          @keyup.enter="scope.set"
        />
      </template>
      <template #preview:prefix>
        <q-icon name="img:/icons/user.svg" />
      </template>
    </k-popup-edit>

    <k-popup-edit v-model="currentValue.status" t-label="warehouse" required horizontal-label>
      <template #default="scope">
        <k-input
          color="accent"
          v-model="scope.value"
          dense
          autofocus
          :show-label="false"
          t-label="warehouse"
          @keyup.enter="scope.set"
        />
      </template>
      <template #preview:prefix>
        <q-icon name="img:/icons/home.svg" />
      </template>
    </k-popup-edit>

    <k-popup-edit v-model="currentValue.itemCount" t-label="refNumber" required horizontal-label>
      <template #default="scope">
        <k-input
          color="accent"
          v-model="scope.value"
          dense
          autofocus
          :show-label="false"
          t-label="refNumber"
          @keyup.enter="scope.set"
        />
      </template>
      <template #preview:prefix>
        <q-icon name="img:/icons/hash.svg" />
      </template>
    </k-popup-edit>

    <k-popup-edit v-model="currentValue.itemCount" t-label="attachFile" required horizontal-label>
      <template #default="scope">
        <k-input
          color="accent"
          v-model="scope.value"
          dense
          autofocus
          :show-label="false"
          t-label="attachFile"
          @keyup.enter="scope.set"
        />
      </template>
      <template #preview:prefix>
        <q-icon name="img:/icons/upload.svg" />
      </template>
    </k-popup-edit>

    <product-data-list />
  </div>
</template>
<script setup lang="ts" generic="T extends InventoryDataRequest">
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import { computed } from 'vue'
import KPopupEdit from 'src/components/ui/KPopupEdit.vue'
import ProductDataList from './ProductDataList.vue'

interface Props {
  modelValue: T
}

interface Emits {
  (e: 'update:modelValue', value: T): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value: T) => emit('update:modelValue', value),
})
</script>
