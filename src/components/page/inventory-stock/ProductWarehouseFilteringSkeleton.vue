<template>
  <div v-for="n in 3" :key="n" class="tw-basis-full">
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
      <div class="tw-col-span-12">
        <div class="tw-flex tw-items-center tw-justify-between tw-px-2">
          <q-skeleton type="text" width="40%" height="20px" />
          <q-skeleton type="text" width="10%" height="20px" />
        </div>
        <q-separator spaced="0.25rem" dark></q-separator>
      </div>

      <div class="tw-col-span-12">
        <div v-for="m in 2" :key="m" class="tw-my-2">
          <q-card flat bordered>
            <q-card-section class="tw-px-2">
              <div class="tw-flex tw-items-center tw-justify-between">
                <div class="tw-basis-auto">
                  <q-skeleton type="text" width="120px" height="16px" />
                </div>
                <div class="tw-basis-auto tw-flex tw-items-center tw-space-x-4">
                  <q-skeleton type="text" width="30px" height="16px" />
                  <q-skeleton type="QAvatar" size="20px" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), {
  size: 5,
})
</script>
