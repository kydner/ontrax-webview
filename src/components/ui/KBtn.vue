<template>
  <q-btn ref="qBtnRef" v-bind="{ ...props }" :label="currentLabel">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as unknown)" #[slotName] :key="slotName">
      <slot :name="slotName" />
    </template>
    <!-- end-prettier-ignore -->
    <template #loading>
      <slot name="loading">
        <q-spinner-oval size="1.75rem" class="on-left" />
        {{ t('loading') }}...
      </slot>
    </template>
  </q-btn>
</template>
<script setup lang="ts">
import { QBtn, QBtnProps, QBtnSlots } from 'quasar'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props extends QBtnProps {
  tLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'grey-5',
  dense: false,
  noCaps: true,
})

const { t } = useI18n()

const qBtnRef = ref<InstanceType<typeof QBtn>>()

const currentLabel = computed(() => {
  if (props.tLabel) return t(props.tLabel)
  return props.label
})

const focus = () => {
  qBtnRef.value?.$el?.focus()
}

defineExpose({
  focus,
})
defineSlots<QBtnSlots>()
</script>
