<template>
  <div @click.stop class="tw-flex tw-items-center tw-space-x-2">
    <q-icon name="attach_file" class="-tw-ml-[0.15rem]"></q-icon>
    <q-spinner v-if="downloading" color="secondary" />
    <div class="tw-text-white tw-text-xs tw-cursor-pointer" @click.stop="handleDownload(attachmentInfo?.fileId)">
      {{ attachmentInfo?.filename || '-' }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { id } from 'src/common/interfaces/response.interface'
import { FileUploadResponse } from 'src/common/model/file-upload.model'
import { useFileDownloadRepository } from 'src/common/repository/file-download.repository'
import { Notify } from 'src/common/utils/plugin.utils'
import { ref } from 'vue'

interface Props {
  attachmentInfo?: FileUploadResponse
}

const props = withDefaults(defineProps<Props>(), {})

const downloadRepository = useFileDownloadRepository()

const downloading = ref(false)

const handleDownload = async (fileId?: id) => {
  try {
    if (!fileId) return
    if (downloading.value === true) return
    downloading.value = true

    const response = await downloadRepository.download(fileId)

    if (!response || response.size === 0) {
      throw new Error('Empty response from server')
    }

    const url = window.URL.createObjectURL(response)
    const link = document.createElement('a')

    // Tentukan nama file
    const fileName = props.attachmentInfo?.filename || `attachment_${new Date().getTime()}`

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
