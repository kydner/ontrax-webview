<template>
  <q-btn-dropdown
    :icon="icon"
    outline
    no-caps
    :label="label"
    size="sm"
    class="tw-p-1 tw-py-0"
    style="--q-primary: #b0b0b5; border-color: #b0b0b5; color: #b0b0b5"
  >
    <q-list dark flat :bordered="false">
      <q-item v-for="(option, index) in state.data" :key="index" clickable v-close-popup @click="handleSelect(option)">
        <q-item-section>
          <q-item-label
            class="tw-flex tw-items-center tw-justify-between"
            :class="{ 'tw-text-secondary': option[props.optionValue!] === currentValue }"
          >
            <span>{{ option[props.optionLabel!] }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { id, ResponseState } from 'src/common/interfaces/response.interface'
import { MetaService } from 'src/common/services/meta.service'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { computed, onMounted, reactive } from 'vue'

type Primitive = string | number | boolean | null

interface Props<T, R> {
  meta: IMetaListModule<T>
  label: string
  modelValue?: Primitive
  payload?: R
  optionValue?: keyof T
  optionLabel?: keyof T
  icon?: string
}

const props = defineProps<Props<any, any>>() // gunakan generic jika mau lebih strict

const emit = defineEmits<{
  (e: 'update:model-value', value: Props<any, any>['modelValue']): void
  (e: 'item:selected', value?: id): void
}>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const metaService = new MetaService(props.meta)

const state = reactive<ResponseState<any[]>>({
  isLoading: false,
  data: [],
  errorMessage: null,
})

const fetchData = async () => {
  try {
    state.isLoading = true
    state.data = []
    state.errorMessage = null
    const repo = await metaService.repository()
    const response = await repo?.getAll(props.payload || {})
    state.data = response as any[]
  } catch (error) {
    state.errorMessage = getErrorMessage(error as Error)
  } finally {
    state.isLoading = false
  }
}

const handleSelect = (option: any) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const newValue = option[props.optionValue!]
  if (newValue !== currentValue.value) {
    emit('update:model-value', newValue)
    emit('item:selected', newValue)
  } else {
    emit('update:model-value', undefined)
    emit('item:selected', undefined)
  }
}

onMounted(() => {
  fetchData()
})
</script>
