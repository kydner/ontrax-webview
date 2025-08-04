<template>
  <k-select
    ref="kSelectRef"
    v-bind="{ ...props }"
    v-model="currentValue"
    :label="props.label"
    :options="currentOptions"
    :loading="loading"
    :use-input="props.useInput"
    :use-chips="props.useChips ? props.useChips : multiple"
    :error-message="errorMessage"
    :error="!!errorMessage"
    @selected:init="(value) => emit('selected:init', value)"
    @selected:item="(value) => emit('selected:item', value)"
    @focus="() => onLoadShowOption()"
  >
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="data" />
    </template>
    <!-- end-prettier-ignore -->
  </k-select>
</template>
<script setup lang="ts" generic="T extends unknown">
import KSelect, { KSelectEmits, KSelectProps, KSelectSlots } from 'src/components/ui/KSelect.vue'
import { computed, ref, watch } from 'vue'
import { RuleExpression } from 'vee-validate'
import { MetaService } from 'src/common/services/meta.service'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { ERROR_SERVICE_USE_CASE } from 'src/common/constants/error.constant'
import { id } from 'src/common/interfaces/response.interface'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'

interface Props extends Omit<KSelectProps, 'options' | 'loading'> {
  optionLabel?: string
  meta: IMetaListModule<T>
  payload?: object
  rules?: RuleExpression<unknown>
  parentId?: id
  loadOnMount?: boolean
  optionMapper?: (data: unknown[]) => unknown[]
}

interface Emits extends KSelectEmits {}

const props = withDefaults(defineProps<Props>(), {
  outlined: true,
  dense: true,
  optionLabel: 'name',
  optionValue: 'id',
  emitValue: true,
  mapOptions: true,
  useInput: true,
  showLabel: true,
  clearable: true,
  color: 'secondary',
  dark: true,
  hideDropdownIcon: true,
})

defineSlots<KSelectSlots>()

const emit = defineEmits<Emits>()

const metaService = new MetaService(props.meta)

const kSelectRef = ref<InstanceType<typeof KSelect>>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const errorMessage = ref<string | undefined>()

const currentOptions = ref<readonly unknown[] | undefined>([])

const hasLoadData = ref(false)

const hasLoadSingle = ref(false)

const loading = ref(false)

const loadData = async (callback: (result: unknown) => void = () => null) => {
  if (hasLoadData.value) return
  try {
    loading.value = true
    errorMessage.value = undefined
    const useCase = await metaService.repository()

    if (useCase.getAll) {
      const data = await useCase.getAll(props.payload || {})
      /// add logic business here

      hasLoadData.value = true

      const results = props.optionMapper ? props.optionMapper(data) : [...data]

      currentOptions.value = results
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

const loadSingle = async () => {
  if (hasLoadSingle.value || hasLoadData.value) return
  try {
    loading.value = true
    errorMessage.value = undefined
    const useCase = await metaService.repository()
    if (!props.multiple) {
      if (useCase.getOne) {
        if (props.modelValue) {
          const response = await useCase.getOne(currentValue.value)
          hasLoadSingle.value = true
          const data = [response]
          currentOptions.value = data
        }
      } else throw new Error(ERROR_SERVICE_USE_CASE)
    } else loadData()
  } catch (error) {
    errorMessage.value = getErrorMessage(error as Error)
  } finally {
    loading.value = false
  }
}

const reload = () => {
  hasLoadData.value = false
  loadData()
}

const showPopup = () => {
  kSelectRef.value?.showPopup()
}

const onLoadShowOption = () => {
  if (props.disable) return
  loadData(() => setTimeout(() => showPopup(), 100))
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) loadSingle()
  },
  {
    immediate: true,
  },
)

defineExpose({
  loadSingle,
  loadData,
  onLoadShowOption,
  reload,
})
</script>
