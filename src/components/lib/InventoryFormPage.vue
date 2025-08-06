<template>
  <meta-form-page ref="metaFormPageRef" v-bind="{ ...props }" :show-toolbar="false" class="bg-body-base">
    <q-tab-panels v-model="panel" animated class="tw-bg-transparent">
      <q-tab-panel :name="PANEL_FORM" class="tw-p-0">
        <k-toolbar :header-title="`${t('create')} ${meta.title}`" @back="handleBack" />
        <form-page v-model="currentValue"></form-page>
      </q-tab-panel>

      <q-tab-panel :name="PANEL_PRODUCT" class="tw-p-0"> xxx </q-tab-panel>
    </q-tab-panels>

    <template #footer>
      <k-btn :label="t('button.submit')" color="secondary" class="fit" @click="handleSubmitByComponent" />
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
import KToolbar from '../ui/KToolbar.vue'
import { useRouter } from 'vue-router'

const PANEL_FORM = 'panel-form'
const PANEL_PRODUCT = 'panel-product'

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

const router = useRouter()

const { t } = useI18n()

const panel = ref(PANEL_FORM)

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

const handleBack = () => {
  router.push({
    name: `${props.meta.name}-list`,
  })
}
</script>
