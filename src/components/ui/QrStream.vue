<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4">
    <!-- Kotak base 1:1 -->
    <div
      class="tw-w-96 tw-max-w-full tw-aspect-square tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center"
      :class="errorMessage ? 'tw-bg-red-100' : 'tw-bg-[#D9D9D9]'"
    >
      <!-- Kalau scanner belum aktif -->
      <div v-if="!scannerActive" class="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <q-btn
          v-if="!checkingPermission"
          color="primary"
          icon="photo_camera"
          :loading="isRequesting"
          label="Allow Camera Access"
          @click="requestCameraAccess"
        />
      </div>

      <!-- Scanner aktif -->
      <div v-else class="qr-wrapper">
        <QrStream
          class="qr-stream tw-rounded-base tw-object-cover"
          @detect="onDecode"
          @camera-on="onCameraOn"
          @error="onError"
          :constraints="{ audio: false, video: true }"
        >
          <span v-if="props.loading">On Process</span>
        </QrStream>
      </div>

      <!-- Pesan error di dalam kotak -->
      <p v-if="errorMessage" class="tw-text-negative tw-text-center tw-mt-2">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QrStream } from 'vue3-qr-reader'

interface Props {
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const scannerActive = ref(false)
const checkingPermission = ref(true)
const isRequesting = ref(false)
const errorMessage = ref<string | null>(null)
const emit = defineEmits(['decode', 'loaded', 'error'])

onMounted(async () => {
  if ('permissions' in navigator && (navigator as any).permissions.query) {
    try {
      const result = await (navigator as any).permissions.query({ name: 'camera' })
      if (result.state === 'granted') {
        // langsung aktifkan scanner
        scannerActive.value = true
      }
      // kalau denied / prompt → tetap tampil tombol
    } catch (e) {
      console.warn('Permissions API not fully supported:', e)
    }
  }
  checkingPermission.value = false
})

// tombol allow camera
const requestCameraAccess = async () => {
  errorMessage.value = null
  isRequesting.value = true
  try {
    const isCameraSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)

    if (!isCameraSupported) {
      errorMessage.value = 'Camera API not supported. Use HTTPS or update browser.'
    }

    await navigator.mediaDevices.getUserMedia({ video: true })
    scannerActive.value = true
  } catch (err: any) {
    console.error('Camera access error:', err)
    switch (err.name) {
      case 'NotAllowedError':
        errorMessage.value = 'Camera access denied. Please allow permission in browser settings.'
        break
      case 'NotFoundError':
        errorMessage.value = 'No camera device found.'
        break
      case 'NotReadableError':
        errorMessage.value = 'Camera is already in use by another app.'
        break
      case 'NotSupportedError':
        errorMessage.value = 'Camera only works over HTTPS or localhost.'
        break
      default:
        errorMessage.value = err.message || 'Unknown camera error'
    }
    emit('error', err)
  } finally {
    isRequesting.value = false
  }
}

const onDecode = async (value: Promise<{ content: string }>) => {
  const content = (await value).content
  emit('decode', content)
}

const onCameraOn = () => {
  emit('loaded')
}

const onError = (error: any) => {
  console.error('QR Reader runtime error:', error)
  if (!errorMessage.value) {
    errorMessage.value = error?.message || 'Unknown QR Reader error'
  }
  emit('error', error)
}
</script>

<style scoped lang="scss">
.qr-wrapper {
  width: 100%;
  max-width: 1080px;
  aspect-ratio: 1 / 1;
  border-radius: var(--tw-border-radius-base);
  overflow: hidden;
}

.qr-stream {
  width: 100%;
  height: 100%;
  border-radius: var(--tw-border-radius-base);
  overflow: hidden;
}
</style>
