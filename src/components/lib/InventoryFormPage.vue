<template>
  <meta-form-page ref="metaFormPageRef" v-bind="{ ...props }" @form:submit="handleSubmitByComponent">
    <form-page v-model="currentValue"></form-page>
    <template #footer>
      <k-btn type="submit" :label="t('button.submit')" color="secondary" class="fit" />
    </template>
  </meta-form-page>
</template>
<script setup lang="ts" generic="T extends InventoryDataRequest">
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import MetaFormPage from './MetaFormPage.vue'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import FormPage from '../page/inventory/FormPage.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ComponentPublicInstance } from 'vue'

interface Props {
  meta: IMetaListModule<T>
  modelValue: T
}

interface Emits<T> {
  (e: 'update:modelValue', value: T): void
}

type MetaFormPageExposed = {
  validate: () => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits<T>>()

const { t } = useI18n()

const metaFormPageRef = ref<ComponentPublicInstance<MetaFormPageExposed> | null>(null)

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const handleSubmitByComponent = () => {
  console.log(currentValue.value, 'submit')
  metaFormPageRef.value?.validate()
}
</script>
