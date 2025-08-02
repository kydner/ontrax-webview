<template>
  <k-page padding="normal" class="tw-bg-transparent">
    <k-toolbar :header-title="t('myProfile')" @back="router.push({ name: 'home' })" />
  </k-page>
</template>
<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()
</script>
