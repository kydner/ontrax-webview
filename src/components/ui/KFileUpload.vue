<template>
  <k-label
    v-bind="{ ...props }"
    :for="currentFor"
    :required="isRequired"
    :class="`target-section-${props.name || snakeCase(props.tLabel)}`"
  >
    <template #additional:prefix-label>
      <slot name="additional:prefix-label" />
    </template>

    <template #label="{ label }">
      <slot name="label" :label="label" />
    </template>

    <template #additional:suffix-label>
      <slot name="additional:suffix-label" />
    </template>

    <template #default="{ tLabel, screen }">
      <Field
        :name="props.name || tLabel"
        :label="tLabel"
        v-slot="{ errorMessage, field }"
        :rules="currentRules"
        :model-value="props.modelValue"
      >
        <q-file
          v-bind="{ ...props, name: field.name }"
          v-model="selectedFile"
          :for="props.for || props.label"
          :label="
            screen?.lt?.md
              ? tLabel
              : props.labelInput
                ? tLabel
                : props.modelValue
                  ? undefined
                  : currentPlaceholder || ''
          "
          :error="!!errorMessage"
          :rules="undefined"
          dense
          :error-message="errorMessage"
          :clearable="isRequired ? false : props.clearable"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''} ${!!errorMessage ? 'show-error' : ''} ${inputClass}`"
          :placeholder="currentPlaceholder"
          :outlined="borderless ? false : props.outlined"
          :accept="accept"
          :disable="disable || uploading"
          @rejected="handleRejected"
          @clear="handleClear"
        >
          <!-- prettier-ignore -->
          <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
            <slot :name="slotName" />
          </template>
          <!-- end-prettier-ignore -->
          <template #prepend>
            <q-icon name="attach_file" class="tw-rotate-45" />
          </template>

          <template #append>
            <slot name="append">
              <q-btn
                v-if="modelValue && !isMenu"
                icon="download"
                padding="none"
                rounded
                size="xs"
                flat
                @click="emit('download')"
              />
              <k-menu
                v-if="modelValue && isMenu"
                :item-options="itemOptions"
                @downloadOriginal="emit('downloadOriginal', $event)"
              />
              <q-spinner v-if="uploading" size="1rem" />
            </slot>
          </template>
        </q-file>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QFileProps, QFileSlots, QRejectedEntry } from 'quasar'
import { KLabelProps, KLabelSlots } from 'src/components/ui/KLabel.vue'
import { computed } from 'vue'
import { Field, RuleExpression } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { validationRules, isRequiredField } from 'src/common/utils/validation.utils'
import { id } from 'src/common/interfaces/response.interface'
import { snakeCase } from 'lodash'
import { watch } from 'vue'
import { ref } from 'vue'
import { useFileUploadRepository } from 'src/common/repository/file-upload.repository'
import { FileUploadRequest } from 'src/common/model/file-upload.model'

export interface KInputProps extends KLabelProps {
  modelValue: id | null
  name?: string
  label?: string
  labelInput?: boolean
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: QFileProps['modelValue']
  fileName?: string
  isMenu?: boolean
  disable?: boolean
  itemOptions?: { label: string; value: boolean }[]
  borderless?: boolean
  outlined?: boolean
  clearable?: boolean
  accept?: string // optional, e.g. '.jpg,.png,.pdf'
  payload: FileUploadRequest
  inputClass?: string
}

export interface KInputEmits {
  (e: 'update:model-value', value: KInputProps['modelValue']): void
  (e: 'download', event?: Event): void
  (e: 'downloadOriginal', value: boolean): void
}

// interface Emit extends QInputProps
/**
 * @type {import ('components/ui/KInput.vue').props}
 */
const props = withDefaults(defineProps<KInputProps>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  horizontalLabel: false,
  required: false,
  clearable: true,
  unmaskedValue: true,
  clearIcon: 'highlight_off',
  dark: true,
})

const emit = defineEmits<KInputEmits>()

defineSlots<QFileSlots & KLabelSlots>()

const { t } = useI18n()

const uploadRepository = useFileUploadRepository()

const currentFor = computed(() => props.for || props.label)

const currentPlaceholder = computed(() => {
  if (props.labelInput) return null
  if (props.placeholder) return props.placeholder
  const label = props.tLabel ? t(props.tLabel) : props.label
  return `${t('input')} ${label}`
})

const isRequired = computed(() => {
  return isRequiredField(currentRules.value)
})

const currentRules = computed(() => {
  return validationRules(props.rules, props.disable ? false : props.required)
})

const selectedFile = ref<File | null>(null)

const uploading = ref(false)

watch(selectedFile, async (file) => {
  if (!file) return
  uploading.value = true

  try {
    const data = await uploadRepository.upload(file, props.payload)
    console.log(data)
    emit('update:model-value', data.fileId)
  } catch (err) {
    console.error('Upload failed:', err)
    emit('update:model-value', null)
  } finally {
    uploading.value = false
  }
})

const handleRejected = (entries: QRejectedEntry[]) => {
  entries.forEach((entry) => {
    console.warn(`File "${entry.file.name}" ditolak. Alasan:`, entry.failedPropValidation)
  })
}

const handleClear = () => {
  emit('update:model-value', null)
}
</script>
