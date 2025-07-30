<template>
  <q-expansion-item
    :id="isBusinessFlow ? `expansion-${item.page}` : undefined"
    :icon="item.icon"
    :label="props.item?.name"
    :header-inset-level="props.level"
    :hide-expand-icon="!props.item?.childMenus || props.item?.childMenus?.length === 0"
    :class="`expansion-essential ${miniState ? 'mini-state' : ''}`"
    :active-class="`expansion-essential__active`"
    :to="item?.childMenus && item?.childMenus?.length > 0 ? undefined : `/${item?.page}`"
  >
    <div v-if="props.item?.childMenus && props.item?.childMenus.length > 0">
      <component
        :is="ExpandMenuItem"
        v-for="child in props.item?.childMenus || []"
        :level="props.level + 0.75"
        :key="child?.id"
        :item="child"
        class="expansion__children"
      />
    </div>
  </q-expansion-item>
</template>
<script setup lang="ts">
import { CategoryMenuCode, MenuProfile } from 'src/common/model/profile.model'
import ExpandMenuItem from './ExpandMenuItem.vue'
import { computed, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from 'src/stores/app.store'
interface Props {
  item: MenuProfile
  level?: number
  miniState?: boolean
}

// const router = useRouter()

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  miniState: false,
})

const route = useRoute()

const appStore = useAppStore()

const profile = computed(() => appStore.$state?.profile)

const menus = computed(() => profile.value?.menus)

const businessFlows = computed(() =>
  menus.value?.filter((menu) => {
    return menu.categoryCode === CategoryMenuCode.BusinessFlow
  }),
)

const isBusinessFlow = computed(() => {
  return businessFlows.value?.find((menu) => menu.page === props.item?.page)
})

const setActivePage = () => {
  const substract = route.path?.split('/')
  // console.log(substract, substract?.[2] === 'form', substract?.[1])

  const expansionItem = document.getElementById(`expansion-${props.item?.page}`)

  nextTick(() => {
    if (expansionItem) {
      const container = expansionItem.querySelector('.q-expansion-item__container')

      nextTick(() => {
        if (container) {
          const qItem = container.querySelector('.q-item')

          nextTick(() => {
            if (qItem) {
              if (substract?.[1] === props.item?.page) {
                qItem.classList.add('q-router-link--exact-active', 'expansion-essential__active')
              } else {
                qItem.classList.remove('q-router-link--exact-active', 'expansion-essential__active')
              }
            }
          })
        }
      })
    }
  })
}

watch(
  () => route.path,
  () => {
    setActivePage()
    // }
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  setActivePage()
})
</script>
<style lang="scss">
.expansion-essential {
  @apply tw-text-gray-400
  tw-font-medium
  tw-mx-2;
}

.expansion-essential .q-expansion-item__container .q-item {
  @apply tw-py-3 !important;
}

.expansion-essential.expansion-essential.q-expansion-item--standard .expansion-essential__active {
  @apply tw-bg-primary/30 tw-backdrop-filter tw-backdrop-blur-md tw-text-primary tw-font-semibold !important;
}

.expansion-essential__active {
  @apply tw-text-black
  tw-font-medium
  tw-rounded-base
  tw-bg-white
  tw-shadow-base;
}

.expansion-essential__active .q-item__section .q-icon {
  @apply tw-text-white
  tw-bg-primary
  tw-p-2
  tw-rounded-lg
  !important;
}
.expansion-essential__active .q-item__section .q-icon::before {
  @apply tw-text-amber-dark !important;
}

.expansion-essential.expansion__children {
  @apply tw-font-medium
  tw-mx-0;
}

.expansion-essential.mini-state {
  @apply tw-ml-4;
}

.expansion-essential.mini-state .q-expansion-item__container .q-item {
  @apply tw-bg-transparent
  tw-pl-0
  !important;
}

.expansion-essential .q-expansion-item__container .q-item .q-item__section--avatar .q-icon {
  @apply tw-text-slate-500
  tw-p-2
  tw-rounded-base
  tw-bg-slate-800/10
  tw-text-xl
  tw-shadow-base;
}
</style>
