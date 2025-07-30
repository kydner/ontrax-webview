<template>
  <q-img v-if="image" :src="image" width="23px" height="23px" class="tw-mr-4 tw-drop-shadow" />
  <q-select
    v-model="locale"
    dense
    borderless
    map-options
    emit-value
    clear-icon="highlight_off"
    :option-label="screen?.lt?.md ? 'altLabel' : 'label'"
    :options="languageOptions"
    @update:model-value="updateModelValue"
  />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from 'src/stores/app.store'
import { useQuasar } from 'quasar'
import { MessageLanguages } from 'src/boot/i18n'

const { locale } = useI18n({ useScope: 'global' })

const $q = useQuasar()

const appStore = useAppStore()

const image = computed(() => languageOptions.value?.find((item) => item.value === locale.value)?.image)

const languageOptions = ref([
  {
    label: 'English',
    value: 'en-US',
    altLabel: 'US',
    image: '/images/flags/america.png',
  },
  {
    label: 'Indonesia',
    value: 'id-ID',
    altLabel: 'ID',
    image: '/images/flags/indonesia.png',
  },
])

const screen = computed(() => $q.screen)

const updateModelValue = (value: MessageLanguages) => {
  appStore.setLocale(value)
}
</script>
