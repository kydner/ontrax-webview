<template>
  <k-option-group v-bind="{ ...props }" v-model="currentValue" :options="options" :loading="loading" />
</template>
<script setup lang="ts">
import KOptionGroup, { KOptionGroupProps } from 'components/ui/KOptionGroup.vue'
import { computed, onMounted, ref } from 'vue'
import { IMetaModule } from 'src/common/interfaces/meta.interface'
import { MetaService } from 'src/common/services/meta.service'
import { ERROR_SERVICE_USE_CASE } from 'src/common/constants/error.constant'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { sortBy } from 'lodash'

interface Props extends Omit<KOptionGroupProps, 'options'> {
  meta: IMetaModule
  payload?: object
  optionLabel?: string
  optionValue?: string
}

export type Emits = (e: 'update:model-value', value: Props['modelValue']) => void

const props = withDefaults(defineProps<Props>(), {
  type: 'checkbox',
  optionLabel: 'name',
  optionValue: 'id',
  modelValue: [],
  name: 'k_meta_option_group_filter',
  showLabel: true,
})

const emit = defineEmits<Emits>()

const metaService = new MetaService(props.meta)

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const loading = ref(false)

const options = ref<
  | {
      [props: string]: any
      label: string
      value: any
      disable?: boolean | undefined
    }[]
  | undefined
>([])

const errorMessage = ref<string | undefined>()

const loadData = async (callback: (result: unknown) => void = () => null) => {
  try {
    loading.value = true
    errorMessage.value = undefined
    const useCase = await metaService.useCase()
    if (useCase.getAll) {
      const data = await useCase.getAll(props.payload || {})
      const results = data?.map((item: any) => {
        const label = item[props.optionLabel]
        const value = item[props.optionValue]
        return { label, value }
      })
      options.value = sortBy(results, (item) => item.label)
      if (typeof callback === 'function') {
        callback(results)
      }
    } else throw new Error(ERROR_SERVICE_USE_CASE)
  } catch (error) {
    errorMessage.value = getErrorMessage(error as Error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
