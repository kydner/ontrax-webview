<template>
  <lottie v-bind="{ ...props }" />
</template>
<script setup lang="ts">
import { Vue3Lottie as Lottie, LottieProps } from 'vue3-lottie'
export interface KLottieProps extends Partial<LottieProps> {}

const props = withDefaults(defineProps<KLottieProps>(), {})
</script>
