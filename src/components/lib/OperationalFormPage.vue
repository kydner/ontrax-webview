<template>
  <meta-form-page
    ref="metaFormPageRef"
    v-bind="{ ...props }"
    :show-toolbar="false"
    :allow-access="allowAccessPage"
    class="bg-body-base"
  >
    <div class="tw-flex tw-flex-1 tw-flex-col tw-overflow-hidden">
      <q-tab-panels v-model="panel" animated class="tw-bg-transparent">
        <q-tab-panel :name="PANEL_FORM" class="tw-p-0 tw-overflow-hidden">
          <k-toolbar :header-title="currentTitle" :loading="loadingPage" @back="handleBack" />
          <operational-form-skeleton v-if="loadingPage" />
          <component v-else :is="FormPage" v-model="form"></component>
        </q-tab-panel>

        <q-tab-panel :name="PANEL_PRODUCT" class="tw-p-0 tw-overflow-hidden">
          <component :is="ProductPickPage" v-model="form" @back="panel = PANEL_FORM" />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <template v-if="panel === PANEL_FORM" #footer>
      <div class="tw-flex tw-sticky tw-bottom-0 tw-flex-col tw-space-y-2">
        <k-btn
          v-if="form.status === 'RECEIVED'"
          :label="t('qcPass')"
          color="secondary"
          class="fit"
          :disable="loadingPage || !!errorMessage"
          @click="handleSubmitQcPass"
        />

        <k-btn
          v-if="form.status === 'IN_TRANSIT'"
          :label="t('receive')"
          color="secondary"
          class="fit"
          :disable="loadingPage || !!errorMessage"
          @click="handleSubmitReceive"
        />

        <k-btn
          v-if="form.status === 'DRAFT'"
          :label="t('saveToInTransit')"
          color="secondary"
          class="fit"
          :disable="loadingPage || !!errorMessage"
          @click="handleSubmitInTransit"
        />

        <k-btn
          v-if="form.status === undefined || form.status === 'DRAFT'"
          :label="t('button.save')"
          color="secondary"
          class="fit"
          :disable="loadingPage || !!errorMessage"
          @click="handleSubmitDraft"
        />
      </div>
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
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import { ErrorId } from 'src/common/exceptions/error-id'
import { ERROR_ENDPOINT_NOT_DEFINED } from 'src/common/constants/error.constant'
import { Loading } from 'quasar'
import OperationalFormSkeleton from './OperationalFormSkeleton.vue'
import { bus } from 'src/common/event-bus'
import { useVendorShipmentRepository } from 'src/common/repository/vendor-shipment.repository'
import { isoDate } from 'src/common/interfaces/response.interface'
import { OperationalDataRequest } from 'src/common/model/operational.model'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'
import { getErrorMessage } from 'src/common/utils/error.utils'
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

const FormPage = computed(() => {
  return defineAsyncComponent({
    loader: () => import(`src/components/page/${props.meta.name}/FormPage.vue`),
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

const router = useRouter()

const vendorShipmentRepository = useVendorShipmentRepository()

const route = useRoute()

const { t } = useI18n()

const metaService = new MetaService(props.meta)

const formId = computed(() => route.params?.id)

const loadingPage = ref(false)

const allowAccessPage = computed(() => true)

const errorMessage = ref<string | null>(null)

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

const fetchSingle = async () => {
  try {
    const repository = await metaService.repository()
    if (repository.getOne) {
      loadingPage.value = true
      errorMessage.value = null
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

const handleSubmitInTransit = async () => {
  const validate = await metaFormPageRef.value?.validate()
  if (!validate) return
  $confirm({
    message: `${t('saveToInTransit')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as string
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()

          const repository = await metaService.repository()
          await repository.update(formId.value, { ...form.value })
          await vendorShipmentRepository.inTransit(shipmentId)
          Notify.success({
            message: t('success'),
          })
          router.back()
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

const handleSubmitReceive = () => {
  $confirm({
    message: `${t('receive')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as string
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()
          await vendorShipmentRepository.receive(shipmentId, new Date().toISOString() as isoDate)
          Notify.success({
            message: t('success'),
          })
          router.back()
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

const handleSubmitQcPass = () => {
  $confirm({
    message: `${t('qcPass')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const shipmentId = formId.value as string
          if (!shipmentId) throw new ErrorId('ShipmentId')
          Loading.show()
          await vendorShipmentRepository.qualityCheck(shipmentId, form.value.qcItems || [])
          Notify.success({
            message: t('success'),
          })
          router.back()
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
</script>
