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
          <component v-else :is="FormData" v-model="form"></component>
        </q-tab-panel>

        <q-tab-panel :name="PANEL_PRODUCT" class="tw-p-0 tw-overflow-hidden">
          <component :is="ProductPickPage" v-model="form" :warehouse-id="fromWarehouseId" @back="panel = PANEL_FORM" />
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
import { id } from 'src/common/interfaces/response.interface'
import { useAppStore } from 'src/stores/app.store'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { VendorShipmentV1DataRequest, VendorShipmentV1ResponsePage } from 'src/common/model/vendor-shipment-v1.model'
import { VendorShipment, VendorShipmentV1 } from 'src/common/constants/meta.constant'

const PANEL_FORM = 'panel-form'
const PANEL_PRODUCT = 'panel-product'

interface Props {
  modelValue: VendorShipmentV1DataRequest
}

interface Emits<T> {
  (e: 'update:modelValue', value: T): void
}

type MetaFormPageExposed = {
  validate: () => Promise<boolean>
}

const metaVendorShipment: IMetaListModule<VendorShipmentV1ResponsePage> = VendorShipmentV1

const route = useRoute()

const router = useRouter()

const FormData = computed(() => {
  return defineAsyncComponent({
    loader: () => import('./FormData.vue'),
    errorComponent: ErrorNotFound,
  })
})

const ProductPickPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import(`src/components/page/${metaVendorShipment.name}/ProductPickPage.vue`),
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

const fromWarehouseId = computed(() => (form.value as unknown as { fromWarehouseId: id }).fromWarehouseId)

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
  const validate = await metaFormPageRef.value?.validate()
  if (validate) {
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
})

defineExpose({
  validate,
})
</script>
