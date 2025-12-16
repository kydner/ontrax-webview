<template>
  <scrollable-container :suffix-event="metaVendorShipment.name">
    <meta-list-page
      v-bind="{ ...props }"
      :meta="metaVendorShipment"
      :allow-access="allowAccessPage"
      class="tw-relative tw-h-screen"
    >
      <!-- prettier-ignore -->
      <template v-for="(_, slotName) in ($slots as unknown)" #[slotName]="data" :key="slotName">
      <slot :name="slotName" v-bind="(data as VendorShipmentV1ResponsePage)" />
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
          <q-tab-panels v-model="tab" keep-alive animated class="tw-bg-transparent">
            <q-tab-panel :name="TAB_SEND" class="tw-px-0">
              <component
                v-if="allowSend"
                :is="ReceiveListPage"
                :meta="metaVendorShipment"
                :suffix-scroll="metaVendorShipment.name"
                @click:item="(data: any) => handleUpdate(data, 'send')"
              />
              <access-denied v-else>
                <h3 class="tw-text-2xl tw-font-semibold">Access Denied</h3>
                <p>Sorry, you are not allowed to access this page</p>
              </access-denied>
            </q-tab-panel>

            <q-tab-panel :name="TAB_QUALITY_CONTROL" class="tw-px-0">
              <component
                v-if="allowQC"
                :is="QualityControlListPage"
                :meta="metaVendorShipment"
                :suffix-scroll="metaVendorShipment.name"
                @click:item="(data: any) => handleUpdate(data, 'quality-control')"
              />
              <access-denied v-else>
                <h3 class="tw-text-2xl tw-font-semibold">Access Denied</h3>
                <p>Sorry, you are not allowed to access this page</p>
              </access-denied>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </slot>

      <div v-if="allowCreate" class="inventory-add-button">
        <k-btn fab icon="add" color="secondary" rounded @click="handleCreate" />
      </div>
    </meta-list-page>
  </scrollable-container>
</template>
<script setup lang="ts">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import MetaListPage from 'src/components/lib/MetaListPage.vue'
import { computed, defineAsyncComponent, nextTick, VNode } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { Notify } from 'src/common/utils/plugin.utils'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'
import ScrollableContainer from 'src/components/ui/ScrollableContainer.vue'
import AccessDenied from 'src/components/images/AccessDenied.vue'
import { Loading } from 'quasar'
// import { useAppStore } from 'src/stores/app.store'
import { VendorShipmentV1ResponsePage } from 'src/common/model/vendor-shipment-v1.model'
import { VendorShipment, VendorShipmentV1 } from 'src/common/constants/meta.constant'

const TAB_SEND = 'send'

const TAB_QUALITY_CONTROL = 'quality-control'

const metaVendorShipment: IMetaListModule<VendorShipmentV1ResponsePage> = VendorShipmentV1

interface ListContentEvent {
  item: VendorShipmentV1ResponsePage
}

const { t } = useI18n()

const tab = ref(TAB_SEND)

interface Props {
  keyName?: keyof VendorShipmentV1ResponsePage
}

interface Slots<T> {
  default: () => VNode
  toolbar: () => VNode
  filter: () => VNode
  'filter:left': () => VNode
  'filter:right': () => VNode
  'list:content': (props: { item: VendorShipmentV1ResponsePage }) => VNode
  list: (props: { items: T[] }) => VNode
}

// const appStore = useAppStore()

// const profile = computed(() => appStore.$state.profile)

// const menus = computed(() => profile.value?.menus || [])

const ReceiveListPage = computed(() =>
  defineAsyncComponent({
    loader: () => import('./shared/send/ListPage.vue'),
    errorComponent: ErrorNotFound,
  }),
)

const QualityControlListPage = computed(() =>
  defineAsyncComponent({
    loader: () => import('./shared/quality-control/ListPage.vue'),
    errorComponent: ErrorNotFound,
  }),
)

const allowSend = computed(() => {
  return true
})

const allowQC = computed(() => {
  return true
})

const allowCreate = computed(() => {
  const isReceiveTab = tab.value === TAB_SEND
  const notReceiveItem = metaVendorShipment.name !== 'receive-item'

  return notReceiveItem && isReceiveTab && (allowQC.value || allowSend.value)
})

const props = withDefaults(defineProps<Props>(), {
  keyName: 'id',
})

defineSlots<Slots<VendorShipmentV1ResponsePage>>()

const router = useRouter()

const allowAccessPage = computed(() => true)

const handleCreate = async () => {
  try {
    Loading.show()
    await router.push({
      name: `${VendorShipment.name}-form-create`,
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

const handleUpdate = async (data: ListContentEvent, routePath: 'send' | 'quality-control') => {
  try {
    const { item } = data
    const keyName = item[props.keyName]
    const routeName = `${VendorShipment.name}-${routePath}-form-update`
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
