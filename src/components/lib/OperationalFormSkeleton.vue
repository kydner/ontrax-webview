<template>
  <div class="tw-space-y-2">
    <q-skeleton type="text" width="100px" height="50px" />

    <q-skeleton height="12px" class="tw-rounded-md" />
    <q-skeleton height="12px" class="tw-rounded-md" />
    <q-skeleton height="12px" class="tw-rounded-md" />
    <q-skeleton height="12px" class="tw-rounded-md" />
    <q-skeleton height="12px" class="tw-rounded-md" />
    <q-skeleton height="12px" class="tw-rounded-md" />

    <q-skeleton type="text" width="120px" height="80px" />
    <!-- Skeleton untuk product-data-list -->
    <q-card v-for="i in 2" :key="i" flat class="tw-my-2">
      <q-card-section class="tw-p-2 tw-flex tw-items-center tw-space-x-4">
        <q-skeleton type="QAvatar" width="40px" height="40px" />
        <div class="tw-flex-1">
          <q-skeleton height="14px" width="50%" class="tw-mb-1" />
          <q-skeleton height="12px" width="30%" />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <q-card v-for="i in 3" :key="'skeleton-' + i" flat class="tw-my-2">
    <q-card-section class="tw-p-2 tw-flex tw-items-center tw-space-x-4">
      <q-skeleton type="QAvatar" width="40px" height="40px" />
      <div class="tw-flex-1">
        <q-skeleton height="14px" width="50%" class="tw-mb-1" />
        <q-skeleton height="12px" width="30%" />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts"></script>
