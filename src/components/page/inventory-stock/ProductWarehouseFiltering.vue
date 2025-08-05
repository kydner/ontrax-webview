<template>
  <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-my-4">
    <div v-for="i in 5" :key="i" class="tw-col-span-12" @click="handleDetailPage">
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12">
          <div class="tw-flex tw-items-center tw-justify-between tw-px-2">
            <div class="tw-text-lg">880123 - Besi Panjang</div>
            <div class="tw-text-lg">{{ Math.floor(Math.random() * 100) + 1 }}</div>
          </div>
          <q-separator spaced="0.25rem" dark></q-separator>
        </div>

        <div class="tw-col-span-12">
          <k-card v-for="b in 2" :key="b" class="tw-my-2" v-ripple>
            <q-card-section class="tw-px-2">
              <div class="tw-flex tw-items-center tw-justify-between">
                <div class="tw-basis-auto">
                  <span class="tw-text-secondary-text">Kantor Pusat</span>
                </div>
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-items-center tw-justify-end tw-space-x-4">
                    <div class="tw-basis-auto">
                      <div class="tw-flex tw-items-center tw-justify-between tw-space-x-2">
                        <span>15</span>
                        <span class="tw-text-secondary-text">pcs</span>
                      </div>
                    </div>

                    <div class="tw-basis-auto">
                      <q-icon name="img:/icons/chevron-right.svg" size="1.35rem" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </k-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { InventoryStock } from 'src/common/constants/meta.constant'
import KCard from 'src/components/ui/KCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleDetailPage = () => {
  router.push({
    name: `${InventoryStock.name}-filter-detail`,
  })
}
</script>
