<template>
  <div class="tw-flex-wrap tw-space-y-4">
    <div class="tw-basis-full">
      <q-table
        v-bind="{ ...props }"
        table-header-class="k-table-header"
        :pagination="isPagination ? { page: 1, rowsPerPage: 0 } : undefined"
        :hide-pagination="isPagination"
        :loading="loading"
        class="k-table-pagination"
        :class="props.tableClass"
        @row-dblclick="(evt: any, row: any, index: number) => emit('row-dblclick', evt, row, index)"
      >
        <!-- prettier-ignore -->
        <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
          <slot :name="slotName" v-bind="data" />
        </template>
        <!-- end-prettier-ignore -->
      </q-table>
    </div>
    <div v-if="isPagination" class="tw-basis-full">
      <div class="tw-flex tw-justify-end tw-px-6">
        <div class="tw-flex tw-items-center">
          <label for=""> {{ t('label.recordPerPage') }}: </label>
          <q-select
            class="tw-mx-4 tw-min-w-10"
            v-model="rowsPerPageValue"
            borderless
            :options="rowsPerPageOptions"
            dense
          />
        </div>
        <q-pagination
          v-model="currentPaginationValue"
          :max="paginationMax"
          :max-pages="paginationMaxPage"
          direction-links
          boundary-links
          :ellipses="true"
          :boundary-numbers="true"
          :disable="loading"
          color="grey-4"
          class="k-pagination"
          active-design="unelevated"
          active-color="primary"
          active-text-color="grey-1"
          icon-first="keyboard_double_arrow_left"
          icon-last="keyboard_double_arrow_right"
          icon-prev="chevron_left"
          icon-next="chevron_right"
          @update:model-value="(value: number | undefined) => emit('update:pagination-value', value || 1)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { QTableSlots, QTableProps } from 'quasar'
import { useI18n } from 'vue-i18n'
import { parsedQuery } from 'src/common/utils/converter.utils'
export interface KTableProps extends QTableProps {
  paginationMaxPage?: number
  paginationMax?: number
  paginationValue?: number
  loading?: boolean
  isPagination?: boolean
  tableClass?: string
}

export interface KTableEmits {
  (event: 'row-dblclick', evt: Event, row: unknown, index: number): void
  (event: 'update:pagination-value', value: number | undefined): void
  (event: 'update:rows-per-page', value: number): void
}

export interface KTableSlots extends QTableSlots {
  default: unknown
}
const { t } = useI18n()
const props = withDefaults(defineProps<KTableProps>(), {
  formId: 'id',
  paginationMaxPage: 10,
  paginationValue: 1,
  paginationMax: 1,
  isPagination: true,
  bordered: false,
  wrapCells: true,
})

const emit = defineEmits<KTableEmits>()

defineSlots<KTableSlots>()

const query = computed(() => parsedQuery())

const currentPaginationValue = computed({
  get: () => props.paginationValue,
  set: (value) => emit('update:pagination-value', value),
})

const rowsPerPageValue = ref((query.value?.size as number) ?? props.paginationMaxPage)

const rowsPerPageOptions = [5, 10, 20, 50, 100]

watch(rowsPerPageValue, (value) => {
  emit('update:rows-per-page', value)
})
</script>

<style scoped lang="scss">
::v-deep(.k-table-header th) {
  white-space: nowrap;
}
</style>

<style lang="scss">
.k-table-header {
  height: 3.25rem !important;
  border: none !important;
  & th {
    @apply tw-text-gray-800 tw-font-semibold tw-text-sm;
  }
}
.k-pagination {
  .q-pagination__content {
    .q-btn {
      border-radius: 2px;
    }
  }
}

.q-table__top {
  @apply tw-px-0;
}

.k-table-pagination {
  &:hover {
    .q-table__middle.scroll {
      overflow: auto;
    }
  }
  .q-table__middle.scroll {
    overflow: hidden;
    &::-webkit-scrollbar {
      @apply tw-h-2;
    }
    &::-webkit-scrollbar-track {
      @apply tw-bg-gray-100;
    }
    &::-webkit-scrollbar-thumb {
      @apply tw-rounded-full tw-bg-gray-300 tw-shadow-lg;
    }
  }
}
</style>
<style scoped lang="scss">
.k-table-pagination {
  @apply tw-border-none tw-rounded-none tw-shadow-none;
  border-bottom: 1px solid $grey-2;

  &:hover {
    .q-table__middle.scroll {
      overflow: auto;
    }
  }
  .q-table__middle.scroll {
    overflow: hidden;
    &::-webkit-scrollbar {
      @apply tw-w-2;
    }
    &::-webkit-scrollbar-track {
      @apply tw-bg-gray-100;
    }
    &::-webkit-scrollbar-thumb {
      @apply tw-rounded-full tw-bg-gray-300 tw-shadow-lg;
    }
  }
}
</style>
