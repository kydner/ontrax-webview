<template>
  <k-btn :icon="icon" padding="none" flat>
    <q-menu>
      <q-list class="k-list-size">
        <q-item
          v-for="option in computedItemOptions"
          :key="option.value"
          clickable
          @click="emit('downloadOriginal', option.value)"
          v-close-popup
        >
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </k-btn>
</template>
<script setup lang="ts">
import { QMenu, QMenuProps, QMenuSlots, QList, QItem, QItemSection } from 'quasar'
import { computed } from 'vue'

interface Props extends QMenuProps {
  itemOptions?: { label: string; value: boolean }[]
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  itemOptions: () => [],
  icon: 'download',
})

export type KInputEmits = (e: 'downloadOriginal', value: boolean) => void

const emit = defineEmits<KInputEmits>()

const computedItemOptions = computed(() => props.itemOptions || [])

defineSlots<QMenuSlots>()
</script>
<style lang="scss">
.k-list-size {
  min-width: 100px;
}
</style>
