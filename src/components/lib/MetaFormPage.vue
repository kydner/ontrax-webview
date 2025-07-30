<template>
  <k-page padding="normal" class="tw-bg-transparent">
    <div class="tw-flex tw-flex-col tw-space-y-4">
      <slot name="toolbar">
        <div class="tw-flex tw-items-center tw-space-x-4 tw-py-2">
          <k-btn
            icon="img:/icons/arrow-left.svg"
            flat
            rounded
            size="xs"
            padding="none"
            @click="
              router.push({
                name: `${meta.name}-list`,
              })
            "
          />
          <div class="tw-font-semibold">{{ t('create') }} {{ props.meta?.title }}</div>
        </div>
      </slot>
    </div>
  </k-page>
</template>
<script setup lang="ts">
import { IMetaModule } from 'src/common/interfaces/meta.interface'
import KPage from './KPage.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export interface MetaFormPageProps {
  meta: IMetaModule
}

const props = withDefaults(defineProps<MetaFormPageProps>(), {})

const router = useRouter()

const { t } = useI18n()
</script>
