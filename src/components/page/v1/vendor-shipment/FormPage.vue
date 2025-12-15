<template>
  <meta-form-page
    ref="metaFormPageRef"
    v-bind="{ ...props }"
    :meta="VendorShipment"
    :show-toolbar="false"
    :allow-access="allowAccessPage"
    class=""
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
          <k-toolbar :header-title="currentTitle" :loading="loadingPage" @back="handleBack">
            <template v-if="form.status === 'DRAFT'" #title:right>
              <k-btn icon="img:/icons/trash__negative.svg" flat rounded size="xs" padding="xs" @click="handleDelete" />
            </template>
          </k-toolbar>
          <operational-form-skeleton v-if="loadingPage" />
          <template v-else>
            <Form as="form" ref="observerRef" @invalid-submit="invalidSubmit" @submit="emit('form:submit')">
              <component :is="FormData" v-model="form"></component>
            </Form>
          </template>
        </q-tab-panel>

        <q-tab-panel :name="PANEL_PRODUCT" class="tw-p-0 tw-overflow-hidden">
          <component :is="ProductDataPickPage" v-model="form" @back="panel = PANEL_FORM" />
        </q-tab-panel>

        <q-tab-panel :name="PANEL_PRODUCT_SCAN" class="tw-p-0 tw-overflow-hidden">
          <component :is="ProductDataScanPage" v-model="form" @back="panel = PANEL_FORM" />
        </q-tab-panel>

        <q-tab-panel :name="PANEL_PRODUCT_NEW" class="tw-p-0 tw-overflow-hidden">
          <component :is="ProductDataNewPage" @back="panel = PANEL_PRODUCT_SCAN" />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <template v-if="!errorMessage && panel === PANEL_FORM" #footer>
      <slot name="footer">
        <div class="tw-flex tw-sticky tw-bottom-0 tw-flex-col tw-space-y-2 tw-pb-2">
          <k-btn
            v-if="(form.status === undefined || form.status === 'DRAFT') && !loadingPage"
            :label="form.status === 'DRAFT' ? t('saveDraft') : t('button.save')"
            class="fit tw-text-white"
            :class="form.status === 'DRAFT' ? 'tw-bg-secondary-text' : 'tw-bg-secondary'"
            :disable="loadingPage || !!errorMessage || globalLoading"
            @click="handleSubmitDraft"
          />

          <slot
            name="footer:button"
            :loading="loadingPage || globalLoading"
            :error-message="errorMessage"
            :route-path="routePath"
          ></slot>
        </div>
      </slot>
    </template>
  </meta-form-page>
</template>
<script setup lang="ts">
import MetaFormPage from 'src/components/lib/MetaFormPage.vue'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ComponentPublicInstance } from 'vue'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useRoute, useRouter } from 'vue-router'
import { MetaService } from 'src/common/services/meta.service'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import { ErrorId } from 'src/common/exceptions/error-id'
import { ERROR_ENDPOINT_NOT_DEFINED } from 'src/common/constants/error.constant'
import { Loading } from 'quasar'
import OperationalFormSkeleton from 'src/components/lib/OperationalFormSkeleton.vue'
import { bus } from 'src/common/event-bus'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { OperationalRoutePath } from 'src/common/enum/operational.enum'
import InternalError from 'src/components/images/InternalError.vue'
import { useAppStore } from 'src/stores/app.store'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { VendorShipmentV1DataRequest, VendorShipmentV1ResponsePage } from 'src/common/model/vendor-shipment-v1.model'
import { VendorShipment, VendorShipmentV1 } from 'src/common/constants/meta.constant'
import { Form, FormValidationResult, GenericObject, InvalidSubmissionContext } from 'vee-validate'

const PANEL_FORM = 'panel-form'
const PANEL_PRODUCT = 'panel-product'
const PANEL_PRODUCT_SCAN = 'panel-product-scan'
const PANEL_PRODUCT_NEW = 'panel-product-new'

interface Props {
  modelValue: VendorShipmentV1DataRequest
}

interface Emits<T> {
  (e: 'update:modelValue', value: T): void
  (e: 'form:submit'): void
}

type MetaFormPageExposed = {
  validate: () => Promise<boolean>
}

const metaVendorShipment: IMetaListModule<VendorShipmentV1ResponsePage> = VendorShipmentV1

const route = useRoute()

const router = useRouter()

const FormData = computed(() => {
  return defineAsyncComponent({
    loader: () => import('./shared/FormData.vue'),
    errorComponent: ErrorNotFound,
  })
})

const ProductDataPickPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('src/components/page/v1/vendor-shipment/shared/ProductDataPick.vue'),
  })
})

const ProductDataNewPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('src/components/page/v1/vendor-shipment/shared/ProductDataNew.vue'),
  })
})

const ProductDataScanPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import('src/components/page/v1/vendor-shipment/shared/ProductDataScan.vue'),
  })
})

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits<VendorShipmentV1DataRequest>>()

const { t } = useI18n()

const metaService = new MetaService(metaVendorShipment)

const appStore = useAppStore()

// const profile = computed(() => appStore.$state.profile)

// const menus = computed(() => profile.value?.menus || [])

const globalLoading = computed(() => appStore.$state?.loading)

const formId = computed(() => route.params?.id)

const loadingPage = ref(false)

const allowAccessPage = computed(() => {
  return true
})

const errorMessage = ref<string | null>(null)

const routePath = computed<OperationalRoutePath>(() => route.meta?.routePath as OperationalRoutePath)

const currentTitle = computed(() => {
  if (formId.value) return form.value?.referenceNumber
  return `${t('create')} ${metaVendorShipment.title}`
})

const panel = ref(PANEL_FORM)

const metaFormPageRef = ref<ComponentPublicInstance<MetaFormPageExposed> | null>(null)

const observerRef = ref<InstanceType<typeof Form>>()

const form = computed({
  get: () => props?.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const validate = async () => {
  const promises = [observerRef.value?.validate()]
  for (const promise of promises) {
    const result = await promise
    if (result?.valid !== true) {
      Notify.create({
        message: Object.values(result?.errors as Record<string, string>)?.[0],
        type: 'negative',
        icon: 'warning',
      })
      return false
    }
  }
  return true
}

const fetchSingle = async () => {
  try {
    const repository = await metaService.repository()
    errorMessage.value = null
    if (repository.getOne) {
      loadingPage.value = true
      const response = await repository.getOne(formId.value)
      form.value = response as VendorShipmentV1DataRequest
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
      handleBack()
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
      handleBack()
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

const handleDelete = () => {
  $confirm({
    message: t('title.deleteThisData'),
    callback: async (confirm) => {
      if (confirm) {
        try {
          const repository = await metaService.repository()
          if (!repository.delete) throw new Error('Repository delete not exist')
          Loading.show()
          await repository.delete(formId.value)
          handleBack()
          Notify.success({
            message: t('notification.successDelete'),
          })
        } catch (error) {
          Notify.error({
            message: error as Error,
          })
        } finally {
          Loading.hide()
        }
      }
    },
  })
}

const handleSubmitDraft = async () => {
  const isValid = await validate()
  if (isValid) {
    if (formId.value) handleUpdate()
    else handleCreate()
  }
}

const handleBack = () => {
  router.push({
    name: `${VendorShipment.name}-list`,
  })
}

onMounted(() => {
  if (formId.value) fetchSingle()

  bus.on('product:pick', () => {
    panel.value = PANEL_PRODUCT
  })

  bus.on('product:scan', () => {
    panel.value = PANEL_PRODUCT_SCAN
  })

  bus.on('product:new', () => {
    panel.value = PANEL_PRODUCT_NEW
  })
})

const invalidSubmit = (
  event:
    | InvalidSubmissionContext<GenericObject>
    | FormValidationResult<Record<string, unknown>, Record<string, unknown>>,
) => {
  const { errors } = event
  Notify.create({
    message: Object.values(errors)?.[0],
    type: 'negative',
    icon: 'warning',
  })
}

defineExpose({
  validate,
})
</script>
