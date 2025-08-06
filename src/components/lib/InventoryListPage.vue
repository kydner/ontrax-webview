<template>
  <meta-list-page v-bind="{ ...props }" class="tw-relative bg-body-base tw-h-screen">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as any)" />
    </template>
    <!-- end-prettier-ignore -->

    <slot>
      <slot name="filter">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-basis-6/12">
            <slot name="filter:left">
              <div class="tw-flex tw-items-center tw-space-x-2">
                <q-icon name="search" class="tw-text-secondary-text" size="sm"></q-icon>
                <k-btn icon="list" outline :label="t('status')" size="sm" class="tw-p-1 tw-py-0" />
              </div>
            </slot>
          </div>

          <div class="tw-basis-6/12">
            <slot name="filter:right">
              <div class="tw-flex tw-items-center tw-justify-end tw-space-x-2">
                <span class="tw-text-xs tw-text-secondary-text">{{ t('sortBy') }}</span>
                <q-icon name="img:/icons/sort-by.svg"></q-icon>
              </div>
            </slot>
          </div>
        </div>
      </slot>

      <q-card flat dark class="tw-bg-transparent">
        <q-tabs
          v-model="tab"
          dense
          class="logistic-tab-list text-grey"
          active-color="grey-5"
          indicator-color="grey-5"
          align="justify"
          no-caps
          narrow-indicator
        >
          <q-tab :name="TAB_SEND" :label="t('send')" class="tw-flex-1" />
          <q-tab :name="TAB_QUALITY_CONTROL" :label="t('qualityControl')" class="tw-flex-1" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated class="tw-bg-transparent">
          <q-tab-panel :name="TAB_SEND" class="tw-px-0">
            <k-meta-list-table :meta="props.meta">
              <!-- prettier-ignore -->
              <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
                <slot :name="slotName" v-bind="(data as Record<string, unknown>)" />
              </template>
              <!-- end-prettier-ignore -->

              <template #list:content="{ item }">
                <component :is="ListContentPage" :item="item" @click="handleUpdate" />
              </template>
            </k-meta-list-table>
          </q-tab-panel>

          <q-tab-panel :name="TAB_QUALITY_CONTROL" class="tw-px-0">
            <k-meta-list-table :meta="props.meta">
              <!-- prettier-ignore -->
              <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
                <slot :name="slotName" v-bind="(data as any)" />
              </template>
              <!-- end-prettier-ignore -->

              <template #list:content="{ item }">
                <component :is="ListContentPage" :item="item" @click="handleUpdate" />
              </template>
            </k-meta-list-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </slot>

    <div class="tw-absolute tw-right-0 tw-pr-6" :style="{ top: `calc(100vh - 80px)` }">
      <k-btn fab icon="add" color="secondary" rounded @click="handleCreate" />
    </div>
  </meta-list-page>
</template>
<script setup lang="ts" generic="T extends InventoryResponse">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from './MetaListPage.vue'
import { computed, defineAsyncComponent, nextTick, VNode } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import KMetaListTable from '../ui/KMetaListTable.vue'
import { ref } from 'vue'
import { InventoryResponse } from 'src/common/model/inventory.model'
import { Notify } from 'src/common/utils/plugin.utils'

const TAB_SEND = 'send'

const TAB_QUALITY_CONTROL = 'quality-control'

const { t } = useI18n()

const tab = ref(TAB_SEND)

interface Props {
  meta: IMetaListModule<T>
  formId?: keyof T
}

interface Slots<T> {
  default: () => VNode
  toolbar: () => VNode
  filter: () => VNode
  'filter:left': () => VNode
  'filter:right': () => VNode
  'list:content': (props: { item: T }) => VNode
  list: (props: { items: T[] }) => VNode
}

const ListContentPage = computed(() => {
  if (props.meta) {
    return defineAsyncComponent({
      loader: () => import(`../page/${props.meta.name}/ListContent.vue`),
    })
  }
  return defineAsyncComponent({
    loader: () => import('../page/inventory/ListContent.vue'),
  })
})
const props = withDefaults(defineProps<Props>(), {
  formId: 'id',
})

defineSlots<Slots<T>>()

const router = useRouter()

const handleCreate = () => {
  router.push({
    name: `${props.meta.name}-form-create`,
  })
}

const handleUpdate = async (data: { item: T }) => {
  try {
    const { item } = data
    const formId = item[props.formId]
    await router.push({
      name: `${props.meta.name}-form-update`,
      params: {
        id: formId as string,
      },
    })
  } catch (error) {
    await nextTick()
    Notify.error({
      message: error as Error,
    })
  }
}
</script>

<style scoped lang="scss">
::v-deep(.logistic-tab-list) {
  .q-tabs__content {
    @apply tw-border-2 tw-border-disable-text tw-rounded-base !important;
    .q-tab {
      @apply tw-bg-disable-text;
      .q-tab__content {
        .q-tab__label {
          @apply tw-text-xs tw-text-secondary-text;
        }
      }
      &.q-tab--active {
        @apply tw-bg-overlay tw-rounded-sm;
        .q-tab__content {
          .q-tab__label {
            @apply tw-text-xs tw-text-white;
          }
          .q-tab__indicator {
            @apply tw-hidden;
          }
        }
      }
    }
  }
}
</style>
