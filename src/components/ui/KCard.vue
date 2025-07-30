<template>
  <q-card v-bind="{ ...props }" class="k-card" :flat="props.flat">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
      <slot :name="slotName" />
    </template>
    <!-- end-prettier-ignore -->
  </q-card>
</template>
<script setup lang="ts">
import { QCardProps, QCardSlots } from 'quasar'

interface Props extends QCardProps {
  flat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  flat: false,
})

defineSlots<QCardSlots>()
</script>
<style scoped lang="scss">
.k-card {
  @apply tw-rounded-lg
  tw-shadow-base;
}
</style>
true
