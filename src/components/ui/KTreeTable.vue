<template>
  <q-markup-table flat separator="none" class="tw-mb-4">
    <thead>
      <tr class="">
        <th
          v-for="(column, index) in props.columns"
          :key="index"
          :class="column.headerClasses"
          class="tw-border-b"
          :style="column.headerStyle"
          :align="column.align"
          scope="col"
        >
          <span class="tw-font-semibold tw-text-gray-500 tw-text-[0.85rem]">{{ column.label }}</span>
        </th>
      </tr>
      <tr v-if="props.loading" width="100%" class="tw-p-0 tw-m-0 tw-h-0">
        <th colspan="100%" class="tw-p-0 tw-m-0" scope="col">
          <q-linear-progress indeterminate size="2px" color="grey-8" track-color="transparent" />
        </th>
      </tr>
    </thead>
    <tbody>
      <markup-tag-defines
        v-if="rows && rows.length > 0"
        :rows="currentRows"
        :columns="props.columns"
        :has-rows="hasRows"
      >
        <!-- prettier-ignore -->
        <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
          <slot :name="slotName" v-bind="{ ...data, row: data.row, key: data.key }" />
        </template>
        <!-- end-prettier-ignore -->
      </markup-tag-defines>
      <tr v-else>
        <td v-if="props.loading" colspan="100%" class="tw-text-center tw-border-b">Loading...</td>
        <td v-else colspan="100%" class="tw-text-center tw-border-b">
          <slot name="no-data" :message="t('noData')" icon="warning">
            {{ t('noData') }}
          </slot>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <div v-if="isPagination" class="tw-basis-full">
    <div class="tw-flex tw-justify-end tw-px-6">
      <q-pagination
        :model-value="paginationValue"
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
</template>
<script setup lang="ts">
import { computed, VNode } from 'vue'
import MarkupTagDefines from '../lib/MarkupTagDefines.vue'
import { QMarkupTableSlots, QTableProps } from 'quasar'
import { useI18n } from 'vue-i18n'

export interface KTreeTableProps extends QTableProps {
  isPagination?: boolean
  paginationValue?: number
  paginationMaxPage?: number
  paginationMax?: number
}

export interface KTreeTableSlots extends QMarkupTableSlots {
  'no-data': (data: { message?: string; icon?: string }) => VNode
}

export interface KTreeTableEmits {
  (e: 'loading', value: unknown): void
  (event: 'update:pagination-value', value: number | undefined): void | undefined
}

const props = withDefaults(defineProps<KTreeTableProps>(), {
  paginationMaxPage: 10,
  paginationValue: 1,
  paginationMax: 1,
  isPagination: true,
})

defineSlots<KTreeTableSlots>()

const emit = defineEmits<KTreeTableEmits>()

const { t } = useI18n()

const hasRows = computed(() => {
  const isChildren = (item: any) => item?.children && item?.children?.length > 0
  return currentRows.value?.some(isChildren)
})

const currentRows = computed(
  () => props.rows,
  // [
  //   {
  //     id: 1,
  //     name: 'Composite Rating',
  //     weight: 100,
  //     parentGroupId: null,
  //     children: [
  //       {
  //         id: 4,
  //         name: 'Industry',
  //         weight: 60,
  //         parentGroupId: 3,
  //         children: [
  //           {
  //             id: 4,
  //             name: 'Industry',
  //             weight: 60,
  //             parentGroupId: 3,
  //             children: [{ id: 6, name: 'Manufaktur 1', weight: 90, parentGroupId: 1 }],
  //           },
  //           { id: 6, name: 'Manufaktur 2', weight: 90, parentGroupId: 1 },
  //           { id: 6, name: 'Manufaktur 3', weight: 90, parentGroupId: 1 },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         name: 'Qualitative Aspect',
  //         weight: 40,
  //         parentGroupId: 1,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Financial Ratio',
  //     weight: 60,
  //     parentGroupId: 1,
  //   },
  //   {
  //     id: 3,
  //     name: 'Qualitative Aspect',
  //     weight: 40,
  //     parentGroupId: 1,
  //     children: [
  //       {
  //         id: 4,
  //         name: 'Industry',
  //         weight: 60,
  //         parentGroupId: 3,
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: 'Industry',
  //     weight: 60,
  //     parentGroupId: 3,
  //   },
  //   {
  //     id: 5,
  //     name: 'Management',
  //     weight: 40,
  //     parentGroupId: 3,
  //     children: [
  //       {
  //         id: 4,
  //         name: 'Industry',
  //         weight: 60,
  //         parentGroupId: 3,
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     name: 'Manufaktur',
  //     weight: 90,
  //     parentGroupId: 1,
  //   },
  // ]
)
</script>
