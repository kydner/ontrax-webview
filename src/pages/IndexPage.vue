<template>
  <k-page padding="none" class="k-index-page">
    <q-header class="k-main-header tw-bg-transparent" :bordered="false" :elevated="false">
      <q-toolbar class="k-main-toolbar tw-p-4 tw-pt-8 tw-pb-4">
        <div
          class="tw-flex tw-flex-col md:tw-flex-row tw-space-y-2 md:tw-space-y-0 tw-space-x-0 md:tw-space-x-4 md:tw-items-center"
        >
          <q-avatar size="60px" class="overlapping">
            <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
          </q-avatar>
          <div class="tw-text-3xl tw-font-semibold">Welcome Back,</div>
          <div class="tw-text-3xl tw-font-semibold tw-text-primary">Jhon Doe</div>
        </div>
      </q-toolbar>
    </q-header>
    <home-menu :menu="menu" />
  </k-page>
</template>

<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import HomeMenu from 'src/components/lib/HomeMenu.vue'
import * as Meta from 'src/common/constants/meta.constant'

const menu = [
  {
    name: 'Vendor Shipment',
    icon: 'home',
    to: `/${Meta.VendorShipment.name}`,
  },
  {
    name: 'Transfer Item',
    icon: 'person',
    to: `/${Meta.TransferItem.name}`,
  },
  {
    name: 'Receive Item',
    icon: 'settings',
    to: `/${Meta.ReceiveItem.name}`,
  },
  {
    name: 'Inventory Stock',
    icon: 'logout',
    to: `/${Meta.InventoryStock.name}`,
  },
]
</script>

<style scoped lang="scss">
.k-index-page {
  &::before {
    content: '';
    position: absolute;
    background: url('~assets/images/home-background.svg');
    background-repeat: no-repeat;
    background-size: contain;
    color: rgb(var(--color-surface));
    inset: 0;
    top: 0;
  }
}
</style>
