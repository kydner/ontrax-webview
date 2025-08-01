<template>
  <div>
    <k-popup-edit v-model="currentValue.itemCount" t-label="accPayableDays" required horizontal-label>
      <template #default="scope">
        <k-input
          color="accent"
          v-model="scope.value"
          dense
          autofocus
          :show-label="false"
          t-label="accPayableDays"
          @keyup.enter="scope.set"
        />
      </template>
      <template #preview:prefix>
        <q-icon name="calendar_today" />
      </template>
    </k-popup-edit>
    <k-label t-label="status" horizontal-label>
      <q-input v-model="currentValue.status" dense borderless />
    </k-label>
    <k-input v-model="currentValue.code" t-label="code" required horizontal-label borderless>
      <template #label="{ label }">
        <span class="tw-inline-flex tw-items-center tw-space-x-2 tw-mr-1 tw-text-secondary-text">
          <q-icon name="calendar_today" class="tw-text-secondary-text" />
          <span class="tw-inline-flex">{{ label }}</span>
        </span>
      </template>
    </k-input>

    <k-input v-model="currentValue.company" t-label="companyName" required horizontal-label borderless>
      <template #label="{ label }">
        <span class="tw-inline-flex tw-items-center tw-space-x-2 tw-mr-1 tw-text-secondary-text">
          <q-icon name="calendar_today" class="tw-text-secondary-text" />
          <span class="tw-inline-flex">{{ label }}</span>
        </span>
      </template>
    </k-input>
  </div>
</template>
<script setup lang="ts" generic="T extends InventoryDataRequest">
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import { computed } from 'vue'
import KPopupEdit from 'src/components/ui/KPopupEdit.vue'
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
