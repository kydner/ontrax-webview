<template>
  <k-card v-for="n in size" :key="'skeleton-' + n" class="tw-my-2">
    <q-card-section class="tw-p-2 tw-py-3">
      <div class="tw-flex tw-items-center tw-justify-between">
        <!-- Gambar & Text -->
        <div class="tw-flex tw-space-x-2">
          <q-skeleton type="QAvatar" size="40px" />
          <div class="tw-flex tw-flex-col tw-space-y-1">
            <q-skeleton type="text" width="80px" />
            <q-skeleton type="text" width="120px" />
          </div>
        </div>
        <!-- Qty -->
        <div class="tw-flex tw-items-center tw-space-x-2">
          <q-skeleton type="text" width="20px" />
          <q-skeleton type="QAvatar" size="20px" />
        </div>
      </div>
    </q-card-section>
  </k-card>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), {
  size: 5,
})
</script>
