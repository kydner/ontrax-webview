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
    :width="size"
    :height="size"
    class="tw-cursor-pointer tw-rounded-base"
    @click.stop="showPreview = true"
    @load="onLoad"
    @error="onError"
  />

  <!-- fallback image -->
  <q-img v-else src="/images/no-image.svg" no-spinner :width="size" class="tw-rounded-base" :height="size" />

  <!-- PREVIEW DIALOG -->
  <q-dialog v-model="showPreview" maximized persistent transition-duration="300" position="bottom">
    <swipe-wrapper :swipe-down="() => (showPreview = false)">
      <q-card flat class="product-card">
        <!-- close button -->
        <q-card-section class="tw-flex tw-justify-end">
          <q-btn dense flat round icon="close" color="white" v-close-popup />
        </q-card-section>

        <!-- centered images -->
        <q-card-section class="tw-flex tw-items-center tw-justify-center">
          <q-img
            :src="imageUrl || '/images/no-image.svg'"
            fit="contain"
            class="tw-rounded-base"
            style="max-height: 70vh; max-width: 100%"
          />
        </q-card-section>
      </q-card>
    </swipe-wrapper>
  </q-dialog>
</template>

<script setup lang="ts">
import { id } from 'src/common/interfaces/response.interface'
import { useFileUploadRepository } from 'src/common/repository/file-upload.repository'
import { onMounted, ref } from 'vue'
import SwipeWrapper from '../ui/SwipeWrapper.vue'

interface Props {
  itemId: id
  size?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: '45px',
})

const fileRepository = useFileUploadRepository()

const imageUrl = ref<string | null>(null)

const isLoading = ref(false)

const showPreview = ref(false)

const fetchData = async () => {
  isLoading.value = true
  try {
    imageUrl.value = await fileRepository.get(props.itemId)
  } finally {
    isLoading.value = false
  }
}

const onLoad = () => {
  // console.log('Image loaded')
}

const onError = () => {
  console.warn('Image gagal dimuat')
  imageUrl.value = null // fallback ke default
}

onMounted(fetchData)
</script>
<style scoped lang="scss">
.product-card {
  width: $max-page-width;
  max-width: 100vw;
  @apply tw-bg-dark tw-rounded-2xl tw-h-[75vh] bg-body-base tw-mx-auto;
}
</style>
