<template>
  <q-dialog v-model="currentValue" no-backdrop-dismiss no-esc-dismiss persistent>
    <q-card style="width: 420px; max-width: 80vw" class="tw-rounded-base tw-bg-surface" dark>
      <q-card-section class="tw-pt-10">
        <div class="tw-text-lg tw-font-medium tw-text-center">
          <q-icon :name="icon" :class="`notification-icon ${params.type}`" />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="tw-my-2 tw-mb-3 tw-text-center tw-font-medium tw-text-secondary-text">
          {{ params.message }}
        </div>
      </q-card-section>

      <q-separator dark />
      <q-card-actions class="tw-p-0 flex">
        <button
          id="vueNotificationButton"
          ref="notifButtonRef"
          class="notification-button"
          @click="
            (e: Event) => {
              onOk(e, true)
            }
          "
        >
          {{ t('button.ok') }}
        </button>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { bus } from 'src/common/event-bus'
import { IOptionNotification } from 'src/common/interfaces/lib.interface'
import { onMounted, ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const currentValue = ref(false)

const params = ref({} as IOptionNotification)

const { t } = useI18n()

const icon = computed(() => {
  const type = params.value.type
  let icon = 'check'
  switch (type) {
    case 'negative':
      icon = 'priority_high'
      break
    case 'info':
      icon = 'priority_high'
      break
    case 'warning':
      icon = 'report_problem'
      break

    default:
      break
  }
  return icon
})

const notifButtonRef = ref<HTMLInputElement>()

const focus = () => {
  notifButtonRef.value?.focus()
}

const open = (args: IOptionNotification) => {
  currentValue.value = true
  params.value = args
}

const close = () => {
  currentValue.value = false
}

const onOk = (e: Event, confirm?: boolean) => {
  const target = e.target as HTMLElement
  if (target?.id !== 'vueNotificationButton') return
  close()
  if (params.value?.callback) {
    params.value.callback(confirm)
  }
}

watch(
  () => currentValue.value,
  (value) => {
    if (value) {
      setTimeout(
        () => focus(),

        200,
      )
    }
  },
)

onMounted(() => {
  bus.on('$notification', (params: IOptionNotification) => open(params))
})
</script>
<style lang="scss">
.notification-button {
  @apply tw-flex-1 tw-py-4 tw-rounded-none hover:tw-rounded-none tw-font-medium hover:tw-bg-surface/10;
  &:focus {
    @apply tw-outline-none;
  }
}
</style>

<style scoped lang="scss">
.notification-icon {
  @apply tw-text-5xl tw-rounded-full tw-w-16 tw-h-16 tw-border-2;
  &.positive {
    @apply tw-bg-positive/10 tw-text-positive tw-border-positive/10;
  }
  &.negative {
    @apply tw-bg-negative/10 tw-text-negative tw-border-negative/10;
  }
  &.warning {
    @apply tw-bg-warning/10 tw-text-warning tw-border-warning/10 tw-text-4xl;
  }
  &.info {
    @apply tw-bg-info/10 tw-text-info tw-border-info/10;
  }
}
</style>
