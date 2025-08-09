<template>
  <k-page padding="none" class="k-index-page">
    <div class="k-main-header tw-bg-transparent">
      <div class="k-main-toolbar tw-p-4 tw-pt-8 tw-pb-4">
        <div class="tw-flex tw-flex-col tw-space-y-2">
          <q-avatar
            size="60px"
            class="overlapping tw-cursor-pointer"
            v-ripple
            @click="router.push({ name: 'profile' })"
          >
            <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
          </q-avatar>
          <div class="tw-text-3xl tw-font-semibold">Welcome Back,</div>
          <div class="tw-text-3xl tw-font-semibold tw-text-primary">{{ fullName }}</div>
        </div>
      </div>
    </div>
    <home-menu :items="menus" />
  </k-page>
</template>

<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import HomeMenu from 'src/components/lib/HomeMenu.vue'
// import * as Meta from 'src/common/constants/meta.constant'
import { computed } from 'vue'
import { useAppStore } from 'src/stores/app.store'
import { useRouter } from 'vue-router'

const appStore = useAppStore()

const router = useRouter()

const profile = computed(() => appStore.$state?.profile)

const fullName = computed(() => profile.value?.fullName)

const menus = computed(() => {
  return profile.value?.menus || []
})

// const menu = [
//   {
//     name: 'Vendor Shipment',
//     icon: 'home',
//     to: `/${Meta.VendorShipment.name}`,
//   },
//   {
//     name: 'Transfer Item',
//     icon: 'person',
//     to: `/${Meta.TransferItem.name}`,
//   },
//   {
//     name: 'Receive Item',
//     icon: 'settings',
//     to: `/${Meta.ReceiveItem.name}`,
//   },
//   {
//     name: 'Inventory Stock',
//     icon: 'logout',
//     to: `/${Meta.InventoryStock.name}`,
//   },
// ]
</script>

<style scoped lang="scss">
.k-index-page {
  &::before {
    background: url('~assets/images/home-background.svg');
    @apply tw-content-['-'] tw-absolute tw-bg-no-repeat md:tw-bg-repeat-x tw-bg-contain tw-text-surface tw-inset-0 tw-top-0;
  }
}
</style>
