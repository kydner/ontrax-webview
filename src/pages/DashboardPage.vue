<template>
  <k-page :allow-access="true">
    <template #header>
      <h3 class="page-title">{{ t('dashboardInformation') }}</h3>
    </template>
    <div class="tw-basis-full"></div>
  </k-page>
</template>
<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
