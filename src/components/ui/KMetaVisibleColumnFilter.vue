<template>
  <k-option-group-filter
    v-bind="{ ...props }"
    v-model="currentValue"
    t-label="hideColumns"
    :options="options"
    :loading="loading"
  />
</template>
<script setup lang="ts">
import KOptionGroupFilter, { KOptionGroupFilterProps } from 'components/ui/KOptionGroupFilter.vue'
import { IMetaModule } from 'src/common/interfaces/meta.interface'
import { stringArrayToQuasarLabel } from 'src/common/utils/converter.utils'
import { useAppStore } from 'src/stores/app.store'
import { computed } from 'vue'

interface Props extends Omit<KOptionGroupFilterProps, 'options' | 'tLabel' | 'modelValue'> {
  meta: IMetaModule
  payload?: object
  optionValue?: string
  optionLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'checkbox',
  name: 'k_meta_option_group_filter',
  modelValue: [],
  optionLabel: 'name',
  optionValue: 'id',
})

const appStore = useAppStore()

const currentValue = computed({
  get: () => appStore.$state.meta[props.meta.name]?.hideColumns || [],
  set: (values) => appStore.setVisibleColumn({ meta: props.meta, columns: values }),
})

const options = computed(() => stringArrayToQuasarLabel(props.meta?.columns?.map((column) => column.name)) || [])
</script>
