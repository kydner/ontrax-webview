<template>
  <k-page padding="normal" class="bg-body-base tw-min-h-screen">
    <k-toolbar header-title="Inventory Stock Movement" @back="handleBack" />

    <div class="tw-flex tw-flex-col tw-space-y-2 tw-my-2">
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-4">Product</div>
        <div class="tw-col-span-8">: 880123</div>
      </div>
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-4">Warehouse</div>
        <div class="tw-col-span-8">: Kantor Pusat</div>
      </div>
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-4">Stock</div>
        <div class="tw-col-span-8">: 125 pcs</div>
      </div>
    </div>

    <div class="tw-flex tw-flex-col tw-my-2 tw-space-y-2">
      <k-card v-for="i in 6" :key="i">
        <q-card-section>
          <div class="tw-flex tw-items-center tw-justify-between">
            <span class="tw-text-secondary tw-text-lg">WRH-OUT-099123</span>
            <span class="tw-text-disable-text">12/07/2025</span>
          </div>
        </q-card-section>

        <q-separator dark></q-separator>

        <q-card-section>
          <div class="tw-flex tw-flex-col tw-space-y-4">
            <div class="tw-basis-full">
              <div class="tw-grid tw-grid-cols-12 tw-gap-2">
                <div class="tw-col-span-3">
                  <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                    <span class="tw-text-secondary-text tw-text-xs">Adjustment</span>
                    <span>-</span>
                  </div>
                </div>

                <div class="tw-col-span-3">
                  <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                    <span class="tw-text-secondary-text tw-text-xs">Last Balance</span>
                    <span>30</span>
                  </div>
                </div>

                <div class="tw-col-span-3">
                  <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                    <span class="tw-text-secondary-text tw-text-xs">Qty Change</span>
                    <span>10</span>
                  </div>
                </div>

                <div class="tw-col-span-3">
                  <div class="tw-flex tw-flex-col tw-items-center tw-space-y-4">
                    <span class="tw-text-secondary-text tw-text-xs">New Balance</span>
                    <span>20</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="tw-basis-full">
              <div class="tw-flex tw-flex-col tw-space-y-4">
                <span class="tw-text-secondary-text tw-text-xs">Remark</span>
                <span>Transfer TR-80922</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </k-card>
    </div>
  </k-page>
</template>
<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useRouter } from 'vue-router'
import KCard from 'src/components/ui/KCard.vue'

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>
