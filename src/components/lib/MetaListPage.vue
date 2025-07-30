<template>
  <k-page padding="normal" class="tw-bg-transparent">
    <div class="tw-flex tw-flex-col tw-space-y-4">
      <slot name="toolbar">
        <div class="tw-flex tw-items-center tw-space-x-4 tw-py-2">
          <k-btn icon="img:/icons/arrow-left.svg" flat rounded size="xs" padding="none" @click="router.push('/')" />
          <div class="tw-font-semibold">{{ props.meta?.title }}</div>
        </div>
      </slot>
      <slot name="filter">
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-basis-6/12">
            <slot name="filter:left">
              <div class="tw-flex tw-items-center tw-space-x-2">
                <q-icon name="search" class="tw-text-secondary-text"></q-icon>
                <k-btn icon="list" outline :label="t('status')" size="xs" class="tw-p-1 tw-py-0" />
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

      <slot>
        <q-card flat dark class="tw-bg-transparent">
          <q-tabs
            v-model="tab"
            dense
            class="meta-tab-list text-grey"
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
              <k-list-table />
            </q-tab-panel>

            <q-tab-panel :name="TAB_QUALITY_CONTROL" class="tw-px-0">
              <k-list-table />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </slot>
    </div>
    <q-page-sticky position="bottom-right" :offset="[25, 25]">
      <k-btn
        fab
        icon="add"
        color="secondary"
        rounded
        @click="
          router.push({
            name: `${meta.name}-form-create`,
          })
        "
      />
    </q-page-sticky>
  </k-page>
</template>
<script setup lang="ts">
import { IMetaModule } from 'src/common/interfaces/meta.interface'
import { useRouter } from 'vue-router'
import KPage from './KPage.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import KListTable from '../ui/KListTable.vue'

const TAB_SEND = 'send'

const TAB_QUALITY_CONTROL = 'quality-control'

export interface MetaListPageProps {
  meta: IMetaModule
}

const props = withDefaults(defineProps<MetaListPageProps>(), {})

const router = useRouter()

const { t } = useI18n()

const tab = ref(TAB_SEND)
</script>

<style scoped lang="scss">
::v-deep(.meta-tab-list) {
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
