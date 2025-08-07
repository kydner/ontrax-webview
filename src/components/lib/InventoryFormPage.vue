<template>
  <meta-form-page ref="metaFormPageRef" v-bind="{ ...props }" :show-toolbar="false" class="bg-body-base">
    <q-tab-panels v-model="panel" animated class="tw-bg-transparent">
      <q-tab-panel :name="PANEL_FORM" class="tw-p-0">
        <k-toolbar :header-title="currentTitle" @back="handleBack" :loading="loadingPage" />
        <inventory-form-page-skeleton v-if="loadingPage" />
        <component v-else :is="FormPage" v-model="form"></component>
      </q-tab-panel>

      <q-tab-panel :name="PANEL_PRODUCT" class="tw-p-0">
        <component :is="ProductPickPage" v-model="form" @back="panel = PANEL_FORM" />
      </q-tab-panel>
    </q-tab-panels>

    <template v-if="panel === PANEL_FORM" #footer>
      <k-btn :label="t('button.submit')" color="secondary" class="fit" @click="handleSubmitByComponent" />
    </template>
  </meta-form-page>
</template>
<script setup lang="ts" generic="T extends InventoryDataRequest">
import { InventoryDataRequest } from 'src/common/model/inventory.model'
import MetaFormPage from './MetaFormPage.vue'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ComponentPublicInstance } from 'vue'
import KToolbar from '../ui/KToolbar.vue'
import { useRoute, useRouter } from 'vue-router'
import { MetaService } from 'src/common/services/meta.service'
import { Notify } from 'src/common/utils/plugin.utils'
import { ErrorId } from 'src/common/exceptions/error-id'
import { ERROR_ENDPOINT_NOT_DEFINED } from 'src/common/constants/error.constant'
import { Loading } from 'quasar'
import InventoryFormPageSkeleton from './InventoryFormPageSkeleton.vue'
import { bus } from 'src/common/event-bus'

const PANEL_FORM = 'panel-form'
const PANEL_PRODUCT = 'panel-product'

interface Props {
  meta: IMetaListModule<T>
  modelValue: T
  keyName: keyof T
}

interface Emits<T> {
  (e: 'update:modelValue', value: T): void
}

type MetaFormPageExposed = {
  validate: () => Promise<boolean>
}

const FormPage = computed(() => {
  if (props.meta.name)
    return defineAsyncComponent({
      loader: () => import(`src/components/page/${props.meta.name}/FormPage.vue`),
    })
  return defineAsyncComponent({
    loader: () => import('src/components/page/inventory/FormPage.vue'),
  })
})

const ProductPickPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import(`src/components/page/${props.meta.name}/ProductPickPage.vue`),
  })
})

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits<T>>()

const router = useRouter()

const route = useRoute()

const { t } = useI18n()

const metaService = new MetaService(props.meta)

const formId = computed(() => route.params?.id)

const loadingPage = ref(false)

const currentTitle = computed(() => {
  if (formId.value) return form.value?.receiveNumber
  return `${t('create')} ${props.meta.title}`
})

const panel = ref(PANEL_FORM)

const metaFormPageRef = ref<ComponentPublicInstance<MetaFormPageExposed> | null>(null)

const form = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const handleUpdate = async () => {
  try {
    const repository = await metaService.repository()
    if (repository.update) {
      if (!formId.value) throw new ErrorId('FormId')
      Loading.show()
      await repository.update(formId.value, { ...form.value })
      Notify.success({
        message: t('notification.successUpdateData'),
      })
    } else {
      throw new Error(ERROR_ENDPOINT_NOT_DEFINED)
    }
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    Loading.hide()
  }
}

const handleCreate = async () => {
  try {
    const repository = await metaService.repository()
    if (repository.create) {
      Loading.show()
      await repository.create({ ...form.value })
      Notify.success({
        message: t('notification.successUpdateData'),
      })
    } else {
      throw new Error(ERROR_ENDPOINT_NOT_DEFINED)
    }
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    Loading.hide()
  }
}

const handleSubmitByComponent = async () => {
  const validate = await metaFormPageRef.value?.validate()
  if (validate) {
    console.log(form.value, 'submit')
    if (formId.value) handleUpdate()
    else handleCreate()
  }
}

const handleBack = () => {
  router.push({
    name: `${props.meta.name}-list`,
  })
}

const fetchSingle = async () => {
  try {
    console.log(route.params, 'params')
    const repository = await metaService.repository()
    if (repository.getOne) {
      loadingPage.value = true
      const response = await repository.getOne(formId.value)
      form.value = response as T
    } else {
      throw new Error(ERROR_ENDPOINT_NOT_DEFINED)
    }
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    loadingPage.value = false
  }
}

onMounted(() => {
  if (formId.value) fetchSingle()

  bus.on('product:pick', () => {
    panel.value = PANEL_PRODUCT
  })
})
</script>
