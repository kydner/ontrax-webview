<template>
  <div
    class="tw-relative tw-flex tw-items-center tw-justify-between tw-overflow-hidden tw-w-full tw-mb-2"
    style="height: 40px"
  >
    <!-- Left: Search + left component -->
    <div
      class="tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 z-10"
      :class="{ 'tw-opacity-0 tw-pointer-events-none': showInput }"
    >
      <!-- Search Icon -->
      <q-icon
        name="img:/icons/search.svg"
        class="tw-text-secondary-text tw-rounded-full tw-cursor-pointer"
        size="sm"
        v-ripple
        @click="toggleInput(true)"
      />

      <!-- Other left component -->
      <slot name="other-left">
        <q-btn-dropdown icon="list" outline :label="t('status')" size="sm" class="tw-p-1 tw-py-0">
          <q-list dark flat :bordered="false">
            <q-item
              v-for="status in statuses"
              :key="status"
              clickable
              v-close-popup
              @click="emit('item:selected', status)"
            >
              <q-item-section>
                <q-item-label
                  class="tw-flex space tw-items-center tw-justify-between"
                  :class="{ 'tw-text-secondary': status === currentStatus }"
                >
                  <span>{{ status }}</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </slot>
    </div>

    <!-- Right: right component -->
    <div
      class="tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-300 z-10"
      :class="{ 'tw-opacity-0 tw-pointer-events-none': showInput }"
    >
      <slot name="right">
        <div class="tw-flex tw-items-center tw-justify-end tw-space-x-2">
          <span class="tw-text-xs tw-text-secondary-text">{{ t('sortBy') }}</span>
          <q-btn
            flat
            padding="xs"
            size="xs"
            rounded
            :icon="`img:/icons/${sortDirection === 'asc' ? 'sort-by-up.svg' : 'sort-by-down.svg'}`"
            @click="toggleSort"
          ></q-btn>
        </div>
      </slot>
    </div>

    <!-- Flexible Q-Input  -->
    <transition name="slide-in-out" @after-leave="showInput = false">
      <q-input
        v-if="inputVisible"
        v-model="search"
        dense
        outlined
        color="secondary"
        autofocus
        clearable
        :debounce="200"
        placeholder="Search..."
        class="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-full z-20"
        @keyup.enter="emit('search')"
        @update:model-value="handleUpdateModel"
      >
        <template #append>
          <q-icon name="search" class="tw-cursor-pointer" @click="emit('search')" />
          <q-icon name="close" class="tw-cursor-pointer" @click="toggleInput(false)" />
        </template>
      </q-input>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { QInputProps } from 'quasar'
import { TStatus } from 'src/common/enum/operational.enum'
import { ref, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type TsortDirection = 'asc' | 'desc'

interface Props {
  searchValue: QInputProps['modelValue']
  statusValue?: TStatus
  sortDirection: TsortDirection
  statuses: TStatus[]
}

interface Emits {
  (event: 'search'): void
  (event: 'item:selected', value: Props['statusValue']): void
  (event: 'update:search-value', value: QInputProps['modelValue']): void
  (event: 'update:status-value', value: Props['statusValue']): void
  (event: 'update:sort-direction', value: Props['sortDirection']): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const search = computed({
  get: () => props.searchValue,
  set: (value) => emit('update:search-value', value),
})

const currentStatus = computed({
  get: () => props.statusValue,
  set: (value) => emit('update:status-value', value),
})

const showInput = ref(false)

const inputVisible = ref(false)

const toggleSort = () => {
  const newValue = props.sortDirection === 'asc' ? 'desc' : 'asc'
  emit('update:sort-direction', newValue)
}

function toggleInput(show: boolean) {
  if (show) {
    showInput.value = true
    nextTick(() => {
      inputVisible.value = true
    })
  } else {
    inputVisible.value = false
  }
}

const handleUpdateModel = (value: QInputProps['modelValue']) => {
  if (!value) emit('search')
}
</script>

<style scoped>
/* Slide animation */
.slide-in-out-enter-active {
  animation: slide-in 0.3s ease-out forwards;
}
.slide-in-out-leave-active {
  animation: slide-out 0.3s ease-in forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
