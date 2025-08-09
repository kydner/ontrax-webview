<template>
  <k-toolbar>
    <template #title>
      <k-input v-model="search" t-label="search" />
    </template>
  </k-toolbar>
</template>
<script setup lang="ts">
import KToolbar from 'src/components/ui/KToolbar.vue'
import { ref } from 'vue'

const search = ref()
</script>
