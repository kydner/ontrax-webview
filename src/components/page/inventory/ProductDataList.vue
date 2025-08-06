<template>
  <k-btn color="secondary" label="Add Product" />

  <div class="tw-my-2">
    <k-card v-for="i in 5" :key="i" class="tw-my-2">
      <q-card-section class="tw-p-2">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-flex tw-space-x-2">
            <q-img src="~assets/images/product-example.svg" no-spinner width="40px" />
            <div class="tw-basis-auto">
              <div class="tw-flex tw-flex-col">
                <span class="tw-text-secondary-text">190033</span>
                <span>190033</span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </k-card>
  </div>
</template>
<script setup lang="ts">
import KCard from 'src/components/ui/KCard.vue'
</script>
