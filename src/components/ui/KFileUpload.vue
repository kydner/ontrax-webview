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
          ref="fileInputRef"
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
          :clearable="false"
          :class="`${!!errorMessage ? 'tw-animate-shake-invalid' : ''} ${!!errorMessage ? 'show-error' : ''} ${inputClass}`"
          :placeholder="currentPlaceholder"
          :outlined="borderless ? false : props.outlined"
          :accept="accept"
          :disable="disable || uploading"
          class="tw-hidden"
          @rejected="handleRejected"
          @clear="handleClear"
        >
          <!-- Placeholder custom -->
          <span
            v-if="!(selectedFile || props.modelValue) && showLabel"
            class="tw-absolute tw-left-0 tw-top-1/2 -tw-translate-y-1/2 tw-text-disable-text tw-pointer-events-none"
          >
            {{ currentPlaceholder }}
          </span>
          <!-- prettier-ignore -->
          <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
            <slot :name="slotName" />
          </template>
          <!-- end-prettier-ignore -->
          <template #prepend>
            <q-icon :name="icon" :class="`${icon ? '' : 'tw-rotate-45'} tw-cursor-pointer`" @click="openFileDialog" />
          </template>

          <template #append>
            <slot name="append">
              <q-btn
                v-if="(selectedFile || props.modelValue) && !isRequired && props.clearable"
                icon="highlight_off"
                padding="none"
                rounded
                size="xs"
                color="grey-6"
                flat
                @click="handleClear"
              />
              <q-btn
                v-if="modelValue"
                icon="download"
                padding="none"
                rounded
                size="xs"
                :loading="downloading"
                flat
                @click="handleDownload"
              />
              <q-spinner v-if="uploading" size="1rem" />
            </slot>
          </template>

          <template v-if="!selectedFile && showAttachmentInfo">
            <div class="tw-absolute tw-left-0 tw-top-1/2 -tw-translate-y-1/2 tw-flex tw-items-center tw-text-white">
              <span>{{ truncate(showAttachmentInfo.filename, props.filenameMaxLength) }}</span>
              <q-tooltip>{{ showAttachmentInfo?.filename }}</q-tooltip>
            </div>
          </template>

          <template #file="{ file }">
            <div class="tw-flex tw-items-center">
              <span>{{ truncate(file.name, props.filenameMaxLength) }}</span>
              <q-tooltip>{{ file.name }}</q-tooltip>
            </div>
          </template>
        </q-file>

        <!-- CUSTOM UPLOAD BOX -->
        <!-- UPLOAD BOX -->
        <div
          class="tw-w-full tw-border tw-border-disable-text tw-border-dashed tw-rounded tw-p-3 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-cursor-pointer hover:tw-border-gray-300 tw-select-none"
          @click.stop="!uploading && openFileDialog()"
        >
          <!-- LOADING MODE -->
          <template v-if="uploading">
            <q-spinner size="20px" color="gray-300" />
            <span class="tw-text-gray-300">Uploading...</span>
          </template>

          <!-- NORMAL MODE -->
          <template v-else>
            <q-icon name="attach_file" class="tw-text-gray-300" />
            <span class="tw-text-gray-400">Upload file</span>
          </template>
        </div>

        <!-- IF FILE ALREADY UPLOADED -->
        <div v-if="uploadedFileInfo || showAttachmentInfo" class="tw-mt-2 tw-flex tw-items-center tw-gap-2">
          <span class="tw-text-yellow-400 tw-text-xs">
            {{ truncate((selectedFile?.name || showAttachmentInfo?.filename)!, props.filenameMaxLength) }}
          </span>

          <span class="tw-relative tw-cursor-pointer" v-ripple @click="handleClear">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.5 4.5L8.5 8.5M8.5 4.5L4.5 8.5M1.83333 0.5H11.1667C11.903 0.5 12.5 1.09695 12.5 1.83333V11.1667C12.5 11.903 11.903 12.5 11.1667 12.5H1.83333C1.09695 12.5 0.5 11.903 0.5 11.1667V1.83333C0.5 1.09695 1.09695 0.5 1.83333 0.5Z"
                stroke="#F44336"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <!-- IF UPLOAD ERROR -->
        <div v-if="uploadError" class="tw-text-red-500 tw-text-xs tw-mt-1">
          {{ uploadError }}
        </div>
      </Field>
    </template>
  </k-label>
</template>
<script setup lang="ts">
import { QFile, QFileProps, QFileSlots, QRejectedEntry } from 'quasar'
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
import { FileUploadRequest, FileUploadResponse } from 'src/common/model/file-upload.model'
import { useForm } from 'vee-validate'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { resizeImage, truncate } from 'src/common/utils/converter.utils'
import { Notify } from 'src/common/utils/plugin.utils'
import { useFileDownloadRepository } from 'src/common/repository/file-download.repository'

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
  icon?: string
  attachmentInfo?: FileUploadResponse
  filenameMaxLength?: number
}

export interface KInputEmits {
  (e: 'update:model-value', value: KInputProps['modelValue']): void
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
  icon: 'attach_file',
  color: 'secondary',
  accept:
    'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,zip,application/zip,application/x-zip-compressed,application/x-rar-compressed,application/vnd.rar',
  filenameMaxLength: 30,
})

const emit = defineEmits<KInputEmits>()

defineSlots<QFileSlots & KLabelSlots>()

const { t } = useI18n()

const uploadRepository = useFileUploadRepository()

const downloadRepository = useFileDownloadRepository()

const currentFor = computed(() => props.for || props.label)

const { setFieldError } = useForm()

const uploadError = ref<string | null>(null)

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

const fileInputRef = ref<InstanceType<typeof QFile> | null>(null)

const uploading = ref(false)

const downloading = ref(false)

const uploadedFileInfo = ref<{ name: string } | null>(null)

const showAttachmentInfo = computed(() => {
  // kalau modelValue kosong atau sudah di-clear, jangan tampilkan attachmentInfo
  if (!props.modelValue) return null
  return props.attachmentInfo
})

watch(selectedFile, async (file) => {
  if (!file) return
  uploading.value = true
  uploadError.value = null
  uploadedFileInfo.value = null

  try {
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (file.size > maxSize) {
      throw new Error(`File size to long: ${(file.size / 1024 / 1024).toFixed(2)}MB (maks 10MB)`)
    }

    let fileToUpload: File = file

    if (file.type.startsWith('image/')) {
      fileToUpload = await resizeImage(file, 1024, 1024)

      if (fileToUpload.size > maxSize) {
        throw new Error(
          `File masih terlalu besar setelah resize: ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB (maks 10MB)`,
        )
      }
    }

    const data = await uploadRepository.upload(fileToUpload, props.payload)
    emit('update:model-value', data.fileId)
  } catch (error) {
    const message = getErrorMessage(error as Error)
    uploadError.value = message
    setFieldError(props.name || props.tLabel, message)
    emit('update:model-value', null)
    uploadedFileInfo.value = null
    Notify.error({
      message: error as Error,
    })
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
  selectedFile.value = null
  emit('update:model-value', null)
}

const openFileDialog = () => {
  fileInputRef.value?.pickFiles()
}

const handleDownload = async () => {
  try {
    downloading.value = true

    const fileId = props.modelValue as id

    const response = await downloadRepository.download(fileId)

    if (!response || response.size === 0) {
      throw new Error('Empty response from server')
    }

    const url = window.URL.createObjectURL(response)
    const link = document.createElement('a')

    // Tentukan nama file
    const fileName = selectedFile.value?.name || props.attachmentInfo?.filename || `attachment_${new Date().getTime()}`

    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(url)
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    downloading.value = false
  }
}
</script>
