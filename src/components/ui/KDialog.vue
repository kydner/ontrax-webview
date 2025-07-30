<template>
  <q-dialog
    v-bind="{ ...props }"
    v-model="currentValue"
    :no-backdrop-dismiss="noBackdropDismiss"
    :no-esc-dismiss="noEscDismiss"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :transition-duration="transitionDuration"
    :full-height="isMaximize"
    :full-width="isMaximize"
    class="k-dialog"
    @before-show="
      () => {
        isMaximize = props.maximize
        loadingDialog = true
      }
    "
    @show="loadingDialog = false"
  >
    <q-card
      :style="`width: ${width}; max-width: 90vw`"
      class="k-dialog__card tw-relative tw-rounded-base tw-scroll-smooth"
    >
      <q-card-section class="tw-sticky tw-top-0 tw-py-4 tw-bg-white tw-z-10">
        <slot name="header">
          <div class="tw-relative tw-flex tw-items-center tw-justify-between">
            <slot name="header:title">
              <div class="tw-basis-auto tw-font-semibold tw-text-lg">
                {{ headerTitle }}
              </div>
            </slot>
            <div class="">
              <k-btn
                v-if="showMaximize"
                flat
                :icon="isMaximize ? 'fullscreen_exit' : 'fullscreen'"
                rounded
                dense
                size="0.75rem"
                color="grey-7"
                @click="onResizeDialog"
              >
                <q-tooltip>{{ isMaximize ? t('minimize') : t('maximize') }}</q-tooltip>
              </k-btn>
              <k-btn
                flat
                icon="close"
                rounded
                dense
                size="0.75rem"
                @click="onCancel"
                color="grey-7"
                :disable="!allowCancel"
              >
                <q-tooltip>{{ t('close') }}</q-tooltip>
              </k-btn>
            </div>
          </div>
        </slot>
      </q-card-section>

      <q-separator class="tw-sticky tw-top-[3.75rem] tw-z-10"></q-separator>

      <q-card-section
        :class="`${loading || loadingDialog ? 'tw-py-6' : 'tw-py-0'} tw-h-fit ${isMaximize ? 'tw-min-h-[85vh]' : ''}`"
      >
        <div v-if="!loadingDialog" class="tw-m-2 tw-py-2">
          <Form as="form" ref="observerRef" @invalid-submit="invalidSubmit" @submit="emit('submit')">
            <slot></slot>
          </Form>
        </div>
        <q-inner-loading :showing="loading || loadingDialog">
          <q-spinner size="30px" color="primary" />
        </q-inner-loading>
      </q-card-section>

      <slot name="footer">
        <q-separator v-if="isDisable ? false : showFooter" :class="``" />
        <q-card-section
          v-if="isDisable ? false : showFooter"
          :class="`tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-3`"
        >
          <slot name="footer:cancel">
            <k-btn :label="t('button.cancel')" flat :disable="!allowCancel" @click="onCancel" />
          </slot>
          <slot name="footer:submit">
            <k-btn
              v-if="allowSubmit"
              :label="props.submitLabel || t('button.submit')"
              :disable="loading"
              @click="onSubmit"
            />
          </slot>
        </q-card-section>
      </slot>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { VNode, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form, FormValidationResult, GenericObject, InvalidSubmissionContext } from 'vee-validate'
import { QDialogProps } from 'quasar'
import { ERROR_ACTION_NOT_ALLOWED } from 'src/common/constants/error.constant'
import { Notify } from 'src/common/utils/plugin.utils'

export interface KDialogProps extends QDialogProps {
  modelValue: boolean
  headerTitle?: string
  width?: string
  loading?: boolean
  submitLabel?: string
  allowSubmit?: boolean
  allowCancel?: boolean
  beforeCancel?: () => boolean
  maximize?: boolean
  showMaximize?: boolean
  isDisable?: boolean
  visibleSubmitButton?: boolean
  onBeforeSubmit?: () => Promise<boolean>
  showFooter?: boolean
}

export interface KDialogEmits {
  (event: 'update:model-value', value: KDialogProps['modelValue']): void
  (event: 'submit'): void
  (event: 'before-show'): void
  (event: 'cancel'): void
}

export interface KDialogSlots {
  default: () => VNode
  header: () => VNode
  footer: () => VNode
  'footer:submit': () => VNode
  'footer:cancel': () => VNode
  'header:title': () => VNode
}

const props = withDefaults(defineProps<KDialogProps>(), {
  width: '860px',
  allowSubmit: true,
  allowCancel: true,
  maximize: false,
  showMaximize: true,
  isDisable: false,
  visibleSubmitButton: true,
  showFooter: true,
  transitionShow: 'slide-down',
  transitionHide: 'slide-up',
  transitionDuration: '400',
  noEscDismiss: false,
  noBackdropDismiss: true,
})

const emit = defineEmits<KDialogEmits>()

defineSlots<KDialogSlots>()

const { t } = useI18n()

const isMaximize = ref(false)

const currentValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})

const loadingDialog = ref(true)

const observerRef = ref<InstanceType<typeof Form>>()

const resetForm = () => {
  observerRef.value?.resetForm()
}

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

const onSubmit = async () => {
  if (!props.allowSubmit || props.isDisable)
    return Notify.create({
      color: 'warning',
      message: ERROR_ACTION_NOT_ALLOWED,
    })

  if (props.onBeforeSubmit && (await props.onBeforeSubmit()) === false)
    return Notify.create({
      message: t('notification.fieldRequired'),
      type: 'negative',
      icon: 'warning',
    })

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
  emit('submit')
}

const onResizeDialog = () => {
  isMaximize.value = !isMaximize.value
}

const onCancel = () => {
  if (props.beforeCancel && props.beforeCancel() === false) return
  emit('update:model-value', false)
  emit('cancel')
}

defineExpose({
  resetForm,
})
</script>

<style lang="scss" scoped>
.k-dialog {
  @apply tw-overflow-y-hidden;
}

.k-dialog__card {
  @apply tw-overflow-y-auto;
  overflow: hidden;

  &:hover {
    overflow: auto;
  }

  &::-webkit-scrollbar {
    @apply tw-w-2;
  }

  &::-webkit-scrollbar-track {
    @apply tw-bg-gray-100;
  }

  &::-webkit-scrollbar-thumb {
    @apply tw-rounded-full tw-bg-gray-300 tw-shadow-lg;
  }
}

.k-dialog__confirm-button {
  @apply tw-flex-1 tw-py-4 tw-rounded-none hover:tw-rounded-none tw-font-medium hover:tw-bg-primary/10;
  &:focus {
    @apply tw-outline-none;
  }
  &.left {
    @apply tw-text-gray-darker;
  }
  &.right {
    @apply tw-font-semibold;
    &.positive {
      @apply tw-text-positive;
    }

    &.primary {
      @apply tw-text-primary;
    }

    &.negative {
      @apply tw-text-negative;
    }
  }
}
</style>
