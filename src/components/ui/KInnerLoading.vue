<template>
  <q-inner-loading v-bind="{ ...props }" label-style="font-size: 1rem" color="primary" />
</template>
<script setup lang="ts">
import { QInnerLoadingProps } from 'quasar'

interface Props extends QInnerLoadingProps {}

const props = withDefaults(defineProps<Props>(), {})
</script>
