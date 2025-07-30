<template>
  <Item v-for="item in props.items" :key="item.id" :item="item" :mini-state="props.miniState" />
</template>
<script setup lang="ts">
import { MenuProfile } from 'src/common/model/profile.model'
import Item from './ExpandMenuItem.vue'

interface Props {
  items: MenuProfile[]
  miniState?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
})
</script>
