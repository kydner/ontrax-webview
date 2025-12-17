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

    <template #default="{ tLabel }">
      <Field :name="props.name || tLabel" :label="tLabel" :rules="currentRules" :model-value="props.modelValue">
        <q-file
          ref="fileInputRef"
          v-model="selectedFile"
          class="tw-hidden"
          :accept="accept"
          :disable="disable || uploading"
          @rejected="handleRejected"
        />

        <div
          v-if="!currentAttachment"
          class="tw-w-full tw-border tw-border-disable-text tw-border-dashed tw-rounded tw-p-3 tw-flex tw-items-center tw-justify-center tw-gap-2 hover:tw-border-gray-300"
          :class="[disable ? 'tw-cursor-not-allowed' : 'tw-cursor-pointer']"
          @click.stop="!uploading && !disable && openFileDialog()"
        >
          <template v-if="uploading">
            <q-spinner size="20px" />
            <span class="tw-text-gray-400">Uploading...</span>
          </template>
          <template v-else>
            <q-icon name="attach_file" class="tw-text-gray-400" />
            <span class="tw-text-gray-400">Upload File</span>
          </template>
        </div>

        <div v-if="currentAttachment" class="tw-mt-3">
          <div class="tw-flex tw-items-center tw-justify-between tw-bg-gray-800 tw-p-2 tw-rounded">
            <div class="tw-flex tw-items-center tw-gap-2">
              <q-icon name="insert_drive_file" color="warning" />
              <span class="tw-text-warning tw-text-xs">
                {{ truncate(currentAttachment.filename, props.filenameMaxLength) }}
              </span>
            </div>

            <div class="tw-flex tw-items-center tw-gap-1">
              <q-btn
                icon="download"
                flat
                round
                dense
                size="xs"
                color="white"
                :loading="downloadingId === currentAttachment.id"
                @click="handleDownload(currentAttachment.id, currentAttachment.filename)"
              />
              <span v-if="!disable" class="tw-relative tw-cursor-pointer tw-p-1" v-ripple @click="handleRemoveFile">
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
          </div>
        </div>

        <ErrorMessage :name="props.name || tLabel" class="tw-text-red-500 tw-text-xs tw-mt-1" />

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
import { computed, ref, watch } from 'vue'
import { Field, ErrorMessage, RuleExpression, useForm } from 'vee-validate'
import { validationRules, isRequiredField } from 'src/common/utils/validation.utils'
import { id } from 'src/common/interfaces/response.interface'
import { snakeCase } from 'lodash'
import { FileUploadRequest } from 'src/common/model/file-upload.model'
import { resizeImage, truncate } from 'src/common/utils/converter.utils'
import { Notify } from 'src/common/utils/plugin.utils'
import { useVendorShipmentRepository } from 'src/common/repository/vendor-shipment.repository'
import { VendorShipmentUploadResponse } from 'src/common/model/vendor-shipment-upload.model'
import { getErrorMessage } from 'src/common/utils/error.utils'

export interface KInputProps extends KLabelProps {
  modelValue: id | string | null // Berubah dari array ke single
  name?: string
  label?: string
  labelInput?: boolean
  placeholder?: string
  rules?: RuleExpression<unknown>
  defaultValue?: QFileProps['modelValue']
  fileName?: string
  disable?: boolean
  borderless?: boolean
  outlined?: boolean
  clearable?: boolean
  accept?: string
  payload?: FileUploadRequest
  inputClass?: string
  icon?: string
  attachmentInfo?: VendorShipmentUploadResponse | null // Berubah ke single object
  filenameMaxLength?: number
}

const props = withDefaults(defineProps<KInputProps>(), {
  outlined: true,
  dense: true,
  showLabel: true,
  required: false,
  clearable: true,
  icon: 'attach_file',
  accept:
    'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,zip,application/zip,application/x-zip-compressed,application/x-rar-compressed,application/vnd.rar',
  filenameMaxLength: 30,
  modelValue: null,
})

const emit = defineEmits<{
  (e: 'update:model-value', value: id | string | null): void
}>()

defineSlots<QFileSlots & KLabelSlots>()

const shipmentRepository = useVendorShipmentRepository()
const { setFieldError } = useForm()

const currentFor = computed(() => props.for || props.label)
const uploadError = ref<string | null>(null)
const selectedFile = ref<File | null>(null) // Single file
const fileInputRef = ref<InstanceType<typeof QFile> | null>(null)
const uploading = ref(false)
const downloadingId = ref<id | string | null>(null)

const isRequired = computed(() => isRequiredField(currentRules.value))
const currentRules = computed(() => validationRules(props.rules, props.disable ? false : props.required))

// --- LOGIKA SINGLE PREVIEW ---
const localUploadedFile = ref<VendorShipmentUploadResponse | null>(null)
const isRemovedManually = ref(false)

const currentAttachment = computed(() => {
  if (localUploadedFile.value) return localUploadedFile.value
  if (props.attachmentInfo && !isRemovedManually.value) return props.attachmentInfo
  return null
})

// Reset local state jika parent mengirim data baru
watch(
  () => props.attachmentInfo,
  () => {
    isRemovedManually.value = false
    localUploadedFile.value = null
  },
  { deep: true },
)

watch(selectedFile, async (file) => {
  if (!file) return
  uploading.value = true
  uploadError.value = null

  try {
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) throw new Error(`File ${file.name} (maks 10MB)`)

    let fileToUpload = file
    if (file.type.startsWith('image/')) {
      fileToUpload = await resizeImage(file, 1024, 1024)
    }

    const data = await shipmentRepository.upload(fileToUpload)
    localUploadedFile.value = data
    isRemovedManually.value = false

    emit('update:model-value', data.id)
  } catch (error) {
    const message = getErrorMessage(error as Error)
    uploadError.value = message
    setFieldError(props.name || '', message)
    Notify.error({ message: error as Error })
  } finally {
    uploading.value = false
    selectedFile.value = null
  }
})

const handleRemoveFile = () => {
  emit('update:model-value', null)
  localUploadedFile.value = null
  isRemovedManually.value = true
}

const openFileDialog = () => {
  fileInputRef.value?.pickFiles()
}

const handleDownload = async (fileId: id | string, filename: string) => {
  try {
    downloadingId.value = fileId
    const response = await shipmentRepository.download(fileId as id)
    if (!response || response.size === 0) throw new Error('Empty response')
    const url = window.URL.createObjectURL(response)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    Notify.error({ message: error as Error })
  } finally {
    downloadingId.value = null
  }
}

const handleRejected = (entries: QRejectedEntry[]) => {
  entries.forEach((entry) => {
    console.warn(`File "${entry.file.name}" ditolak.`, entry.failedPropValidation)
  })
}
</script>
