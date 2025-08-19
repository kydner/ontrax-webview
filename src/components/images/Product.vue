<template>
  <!-- loading from API -->
  <div v-if="isLoading" class="tw-flex tw-items-center tw-justify-center" style="width: 45px; height: 45px">
    <q-spinner-tail size="24px" color="secondary" />
  </div>

  <!-- success image -->
  <q-img
    v-else-if="imageUrl"
    :src="imageUrl"
    no-spinner
    width="45px"
    height="45px"
    class="tw-cursor-pointer"
    @click.stop="showPreview = true"
    @load="onLoad"
    @error="onError"
  />

  <!-- fallback image -->
  <q-img v-else src="/images/no-image.svg" no-spinner width="45px" height="45px" />

  <!-- PREVIEW DIALOG -->
  <q-dialog v-model="showPreview" maximized persistent>
    <q-card class="bg-dark tw-flex tw-flex-col tw-h-screen">
      <!-- close button -->
      <q-card-section class="tw-flex tw-justify-end">
        <q-btn dense flat round icon="close" color="white" v-close-popup />
      </q-card-section>

      <!-- centered images -->
      <q-card-section class="tw-flex tw-items-center tw-justify-center tw-flex-1">
        <q-img :src="imageUrl || '/images/no-image.svg'" fit="contain" style="max-height: 90vh; max-width: 100%" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { id } from 'src/common/interfaces/response.interface'
import { useFileUploadRepository } from 'src/common/repository/file-upload.repository'
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface Props {
  itemId: id
}
const props = defineProps<Props>()

const fileRepository = useFileUploadRepository()

const imageUrl = ref<string | null>(null)
const isLoading = ref(false)
const showPreview = ref(false)

let objectUrl: string | null = null

const fetchData = async () => {
  isLoading.value = true
  try {
    imageUrl.value = await fileRepository.getOne(props.itemId)
  } finally {
    isLoading.value = false
  }
}

const onLoad = () => {
  console.log('Image loaded ✅')
}

const onError = () => {
  console.warn('Image gagal dimuat ❌')
  imageUrl.value = null // fallback ke default
}

onMounted(() => {
  fetchData()
})

onBeforeUnmount(() => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl)
  }
})
</script>
