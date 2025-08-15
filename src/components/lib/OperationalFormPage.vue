<template>
  <meta-form-page
    ref="metaFormPageRef"
    v-bind="{ ...props }"
    :show-toolbar="false"
    :allow-access="allowAccessPage"
    class="bg-body-base"
  >
    <div v-if="!!errorMessage" class="tw-min-h-[80vh] tw-flex tw-items-center tw-justify-center">
      <internal-error>
        <div>{{ errorMessage }}</div>
        <q-btn color="secondary" :label="t('home')" to="/" unelevated class="tw-mt-4" />
      </internal-error>
    </div>
    <div v-else class="tw-flex tw-flex-1 tw-flex-col tw-overflow-hidden">
      <q-tab-panels v-model="panel" keep-alive animated class="tw-bg-transparent">
        <q-tab-panel :name="PANEL_FORM" class="tw-p-0 tw-overflow-hidden">
          <k-toolbar :header-title="currentTitle" :loading="loadingPage" @back="handleBack" />
          <operational-form-skeleton v-if="loadingPage" />
          <component v-else :is="FormPage" v-model="form"></component>
        </q-tab-panel>

        <q-tab-panel :name="PANEL_PRODUCT" class="tw-p-0 tw-overflow-hidden">
          <component :is="ProductPickPage" v-model="form" :warehouse-id="fromWarehouseId" @back="panel = PANEL_FORM" />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <template v-if="panel === PANEL_FORM" #footer>
      <slot name="footer">
        <div class="tw-flex tw-sticky tw-bottom-0 tw-flex-col tw-space-y-2 tw-pb-2">
          <k-btn
            v-if="(form.status === undefined || form.status === 'DRAFT') && !loadingPage"
            :label="form.status === 'DRAFT' ? t('saveDraft') : t('button.save')"
            class="fit tw-text-white"
            :class="form.status === 'DRAFT' ? 'tw-bg-secondary-text' : 'tw-bg-secondary'"
            :disable="loadingPage || !!errorMessage"
            @click="handleSubmitDraft"
          />

          <slot
            name="footer:button"
            :loading="loadingPage"
            :error-message="errorMessage"
            :route-path="routePath"
          ></slot>
        </div>
      </slot>
    </template>
  </meta-form-page>
</template>
<script setup lang="ts" generic="T extends OperationalDataRequest">
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
import OperationalFormSkeleton from './OperationalFormSkeleton.vue'
import { bus } from 'src/common/event-bus'
import { OperationalDataRequest } from 'src/common/model/operational.model'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { OperationalRoutePath } from 'src/common/enum/operational.enum'
import InternalError from '../images/InternalError.vue'
import { id } from 'src/common/interfaces/response.interface'

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

const route = useRoute()

const router = useRouter()

const FormPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import(`src/components/page/${props.meta.name}/${routePath.value}/FormPage.vue`),
    errorComponent: ErrorNotFound,
  })
})

const ProductPickPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import(`src/components/page/${props.meta.name}/ProductPickPage.vue`),
  })
})

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits<T>>()

const { t } = useI18n()

const metaService = new MetaService(props.meta)

const formId = computed(() => route.params?.id)

const fromWarehouseId = computed(() => (form.value as unknown as { fromWarehouseId: id }).fromWarehouseId)

const loadingPage = ref(false)

const allowAccessPage = computed(() => true)

const errorMessage = ref<string | null>(null)

const routePath = computed<OperationalRoutePath>(() => route.meta?.routePath as OperationalRoutePath)

const currentTitle = computed(() => {
  if (formId.value) return form.value?.receiveNumber || form.value?.transferNumber
  return `${t('create')} ${props.meta.title}`
})

const panel = ref(PANEL_FORM)

const metaFormPageRef = ref<ComponentPublicInstance<MetaFormPageExposed> | null>(null)

const form = computed({
  get: () => props?.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const validate = (): Promise<boolean> => {
  return metaFormPageRef.value?.validate() ?? Promise.resolve(false)
}

const fetchSingle = async () => {
  try {
    const repository = await metaService.repository()
    errorMessage.value = null
    if (repository.getOne) {
      loadingPage.value = true
      const response = await repository.getOne(formId.value)
      form.value = response as T
    } else {
      throw new Error(ERROR_ENDPOINT_NOT_DEFINED)
    }
  } catch (error) {
    errorMessage.value = getErrorMessage(error as Error)
    Notify.error({
      message: error as Error,
    })
  } finally {
    loadingPage.value = false
  }
}

const handleUpdate = async () => {
  try {
    const repository = await metaService.repository()
    if (repository.update) {
      if (!formId.value) throw new ErrorId('FormId')
      Loading.show()
      await repository.update(formId.value, { ...form.value })
      Notify.success({
        message: t('notification.successUpdate'),
      })
      router.back()
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
        message: t('notification.successCreate'),
      })
      router.back()
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

const handleSubmitDraft = async () => {
  const validate = await metaFormPageRef.value?.validate()
  if (validate) {
    if (formId.value) handleUpdate()
    else handleCreate()
  }
}

const handleBack = () => {
  router.push({
    name: `${props.meta.name}-list`,
  })
}

onMounted(() => {
  if (formId.value) fetchSingle()

  bus.on('product:pick', () => {
    panel.value = PANEL_PRODUCT
  })
})

defineExpose({
  validate,
})
</script>
