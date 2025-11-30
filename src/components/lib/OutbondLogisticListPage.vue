<template>
  <scrollable-container :suffix-event="props.meta.name">
    <meta-list-page v-bind="{ ...props }" :allow-access="allowAccessPage" class="tw-relative tw-h-screen">
      <!-- prettier-ignore -->
      <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as any)" />
    </template>
      <!-- end-prettier-ignore -->

      <slot>
        <q-card flat dark class="tw-bg-transparent">
          <component
            v-if="allowAccess"
            :is="ListPage"
            :meta="props.meta"
            :suffix-scroll="props.meta.name"
            @click:item="(data: ListContentEvent) => handleUpdate(data)"
          />
          <access-denied v-else>
            <h3 class="tw-text-2xl tw-font-semibold">Access Denied</h3>
            <p>Sorry, you are not allowed to access this page</p>
          </access-denied>
        </q-card>
      </slot>

      <div v-if="allowCreate" class="inventory-add-button">
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
import { findMenuByKey, Notify } from 'src/common/utils/plugin.utils'
import { OperationalResponse } from 'src/common/model/operational.model'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'
import ScrollableContainer from '../ui/ScrollableContainer.vue'
import AccessDenied from '../images/AccessDenied.vue'
import { Loading } from 'quasar'
import { useAppStore } from 'src/stores/app.store'
import { AccessCode } from 'src/common/enum/operational.enum'

interface ListContentEvent {
  item: T
}

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

const appStore = useAppStore()

const profile = computed(() => appStore.$state.profile)

const menus = computed(() => profile.value?.menus || [])

const ListPage = computed(() =>
  defineAsyncComponent({
    loader: () => import(`src/components/page/${props.meta.name}/ListPage.vue`),
    errorComponent: ErrorNotFound,
  }),
)

const allowAccess = computed(() => {
  const accessCodeMap: Record<string, string> = {
    'vendor-shipment': AccessCode.VendorShipmentSend,
    'transfer-item': AccessCode.TransferItemSend,
    'receive-item': AccessCode.ReceiveItemReceive,
    'delivery-send': AccessCode.DeliverySend,
  }

  const code = accessCodeMap[props.meta.name]
  return code ? !!findMenuByKey(menus.value, 'code', code) : false
})

const allowCreate = computed(() => {
  return false
})

const props = withDefaults(defineProps<Props>(), {
  keyName: 'id',
})

defineSlots<Slots<T>>()

const router = useRouter()

const allowAccessPage = computed(() => true)

const handleCreate = async () => {
  try {
    Loading.show()
    await router.push({
      name: `${props.meta.name}-form-create`,
    })
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    await nextTick()
    Loading.hide()
  }
}

const handleUpdate = async (data: ListContentEvent) => {
  try {
    const { item } = data
    const keyName = item[props.keyName]
    const routeName = `${props.meta.name}-form-update`
    Loading.show()
    await router.push({
      name: routeName,
      params: {
        id: keyName as string,
      },
    })
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    await nextTick()
    Loading.hide()
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
