<template>
  <scrollable-container>
    <meta-list-page v-bind="{ ...props }" class="tw-relative bg-body-base tw-h-screen">
      <!-- prettier-ignore -->
      <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as any)" />
    </template>
      <!-- end-prettier-ignore -->

      <slot>
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
              <component :is="SendListPage" @click:item="(data: ListContentEvent) => handleUpdate(data, 'send')" />
            </q-tab-panel>

            <q-tab-panel :name="TAB_QUALITY_CONTROL" class="tw-px-0">
              <component
                :is="QualityControlListPage"
                @click:item="(data: ListContentEvent) => handleUpdate(data, 'qc')"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </slot>

      <div class="inventory-add-button">
        <k-btn fab icon="add" color="secondary" rounded @click="handleCreate" />
      </div>
    </meta-list-page>
  </scrollable-container>
</template>
<script setup lang="ts" generic="T extends OperationalResponse">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from './MetaListPage.vue'
import { computed, defineAsyncComponent, nextTick, VNode } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { Notify } from 'src/common/utils/plugin.utils'
import { OperationalResponse } from 'src/common/model/operational.model'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'
import ScrollableContainer from '../ui/ScrollableContainer.vue'

const TAB_SEND = 'send'

const TAB_QUALITY_CONTROL = 'quality-control'

interface ListContentEvent {
  item: T
}

const { t } = useI18n()

const tab = ref(TAB_SEND)

interface Props {
  meta: IMetaListModule<T>
  keyName?: keyof T
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

const SendListPage = computed(() =>
  defineAsyncComponent({
    loader: () => import(`src/components/page/${props.meta.name}/send/ListPage.vue`),
    errorComponent: ErrorNotFound,
  }),
)

const QualityControlListPage = computed(() =>
  defineAsyncComponent({
    loader: () => import(`src/components/page/${props.meta.name}/quality-control/ListPage.vue`),
    errorComponent: ErrorNotFound,
  }),
)

const props = withDefaults(defineProps<Props>(), {
  keyName: 'id',
})

defineSlots<Slots<T>>()

const router = useRouter()

const handleCreate = () => {
  router.push({
    name: `${props.meta.name}-form-create`,
  })
}

const handleUpdate = async (data: ListContentEvent, routePath: 'send' | 'qc') => {
  try {
    const { item } = data
    const keyName = item[props.keyName]
    const routeName = `${props.meta.name}-${routePath}-form-update`
    await router.push({
      name: routeName,
      params: {
        id: keyName as string,
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
@use 'sass:math';

$half-page-width: math.div($max-page-width, 2);

.inventory-add-button {
  position: fixed;
  bottom: 20px;
  right: clamp(16px, calc(50% - #{$half-page-width} + 25px), 100%);
  z-index: 999;
}

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
