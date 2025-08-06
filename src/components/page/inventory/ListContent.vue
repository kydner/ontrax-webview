<template>
  <div class="tw-flex tw-items-start tw-justify-between tw-cursor-pointer" v-ripple @click.stop="handleClick"></div>
</template>
<script setup lang="ts" generic="T extends InventoryResponsePage">
import { InventoryResponsePage } from 'src/common/model/inventory.model'

interface Props {
  item: T
}

interface Emits {
  (e: 'click', data: { item: T }): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click', { item: props.item })
}
</script>
