<template>
  <k-page padding="normal" :allow-access="allowAccess" class="tw-bg-transparent">
    <!-- Bagian Header -->
    <div class="tw-flex tw-flex-col">
      <slot name="toolbar">
        <k-toolbar v-if="showToolbar" :header-title="`${t('create')} ${props.meta?.title}`" @back="handleBack" />
      </slot>

      <!-- Bagian Form -->
      <Form as="form" ref="observerRef" @invalid-submit="invalidSubmit" @submit="emit('form:submit')">
        <slot />
      </Form>
    </div>

    <!-- Bagian Footer -->
    <slot name="footer" />
  </k-page>
</template>

<script setup lang="ts" generic="T">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import KPage from './KPage.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, VNode } from 'vue'
import { Form, FormValidationResult, GenericObject, InvalidSubmissionContext } from 'vee-validate'
import { Notify } from 'src/common/utils/plugin.utils'
import KToolbar from '../ui/KToolbar.vue'

interface Props<T> {
  meta: IMetaListModule<T>
  showToolbar?: boolean
  allowAccess?: boolean
}

interface Emits {
  (event: 'form:submit'): void
}

interface Slots {
  default: () => VNode
  toolbar: () => VNode
  filter: () => VNode
  footer: () => VNode
  'filter:left': () => VNode
  'page:sticky': () => VNode
  'filter:right': () => VNode
}

const props = withDefaults(defineProps<Props<T>>(), {
  showToolbar: true,
  allowAccess: false,
})

const emit = defineEmits<Emits>()

defineSlots<Slots>()

const router = useRouter()

const { t } = useI18n()

const observerRef = ref<InstanceType<typeof Form>>()

const handleBack = () => {
  router.push({
    name: `${props.meta.name}-list`,
  })
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

defineExpose({
  validate,
})
</script>
