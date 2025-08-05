<template>
  <k-page padding="normal" class="bg-body-base tw-min-h-screen">
    <k-toolbar header-title="Inventory Stock Movement" @back="handleBack" />
  </k-page>
</template>
<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>
