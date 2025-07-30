<template>
  <div class="tw-grid tw-grid-cols-12 tw-gap-2">
    <q-card
      v-for="i in 10"
      :key="i"
      dark
      flat
      class="tw-bg-overlay tw-rounded-base tw-col-span-12 md:tw-col-span-4 lg:tw-col-span-3"
    >
      <q-card-section>
        <div class="tw-flex tw-items-start tw-justify-between">
          <div class="tw-basis-6/12">
            <div class="tw-flex tw-flex-col tw-space-y-2">
              <div class="tw-font-semibold">PR-990551</div>
              <div class="tw-flex tw-flex-col tw-space-y-2">
                <div class="tw-basis-auto">
                  <div class="tw-flex tw-items-center tw-space-x-2">
                    <q-icon name="calendar_today" color="primary"></q-icon>
                    <span class="tw-text-xs tw-text-secondary-text">PT Megah Dunia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tw-basis-6/12">
            <div class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-space-y-2">
              <span class="tw-font-semibold">65 Items</span>
              <span class="tw-p-2 tw-px-3 tw-rounded-base tw-bg-secondary tw-text-sm">In Transit</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts"></script>
