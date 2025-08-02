<template>
  <q-dialog v-model="currentValue" no-backdrop-dismiss :no-esc-dismiss="false">
    <q-card style="width: 360px; max-width: 80vw" bordered flat class="tw-rounded-base">
      <q-card-section class="tw-py-4">
        <div class="tw-text-lg tw-font-medium tw-text-center">
          {{ optionConfirm.title || t('message') }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="tw-my-2 tw-mb-3 tw-text-center tw-text-secondary-text">
          {{ optionConfirm.message }}
        </div>
      </q-card-section>

      <q-separator />
      <q-card-actions class="tw-p-0 flex">
        <button
          class="confirm-button left tw-border-r"
          @click="
            () => {
              currentValue = false
              optionConfirm.callback(false)
            }
          "
        >
          {{ optionConfirm.button?.cancel?.label || t('button.cancel') }}
        </button>
        <button
          ref="confirmBtnRef"
          :class="`confirm-button right ${optionConfirm.submitColor || 'primary'}`"
          @click="handleSubmit"
        >
          {{ optionConfirm.button?.submit?.label || t('button.submit') }}
        </button>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import { bus } from 'src/common/event-bus'
import { IOptionConfirm } from 'src/common/interfaces/lib.interface'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const currentValue = ref(false)

const optionConfirm = ref({} as IOptionConfirm)

const { t } = useI18n()

const confirmBtnRef = ref<HTMLInputElement>()

const focus = () => {
  confirmBtnRef.value?.focus()
}

const handleSubmit = debounce(
  () => {
    optionConfirm.value.callback(true)
    currentValue.value = false
  },
  500,
  { leading: true, trailing: false },
)

watch(
  () => currentValue.value,
  (value) => {
    if (value) {
      setTimeout(() => focus(), 200)
    }
  },
)

onMounted(() => {
  bus.on('$confirm', (args: IOptionConfirm) => {
    currentValue.value = true

    optionConfirm.value = args

    if (typeof args.callback === 'function') {
      args.callback()
    }
  })
})
</script>

<style lang="scss" scoped>
.confirm-button {
  @apply tw-flex-1 tw-py-4 tw-rounded-none hover:tw-rounded-none tw-font-medium hover:tw-bg-primary/10;
  &:focus {
    @apply tw-outline-none;
  }
  &.left {
    @apply tw-text-gray-darker;
  }
  &.right {
    &.positive {
      @apply tw-text-positive;
    }

    &.primary {
      @apply tw-text-primary;
    }

    &.negative {
      @apply tw-text-negative;
    }
  }
}
</style>
