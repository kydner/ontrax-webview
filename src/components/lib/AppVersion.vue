<template>
  <p class="tw-text-xs tw-font-semibold tw-my-1 tw-cursor-pointer tw-text-gray-600" @click="showDialog = true">
    {{ t('version') }} {{ currentVersion }}
  </p>
  <k-dialog
    v-model="showDialog"
    :header-title="t('version')"
    :show-footer="false"
    width="600px"
    :show-maximize="false"
    :no-backdrop-dismiss="false"
  >
    <div class="tw-flex tw-flex-wrap tw-justify-start tw-text-base">
      <div v-if="state.errorMessage">{{ state.errorMessage }}</div>
      <div v-for="(release, key) in state.data" :key="key" class="tw-basis-full tw-mb-2">
        <h3>
          v{{ release.version }}
          <span class="tw-ml-1 tw-text-gray-dark tw-text-sm tw-font-light">{{ release.date }}</span>
        </h3>
        <ul class="tw-list-disc tw-list-inside tw-pl-2">
          <li v-for="(note, k) in release.notes" :key="k" class="tw-text-left tw-leading-6 tw-text-gray-800">
            {{ note }}
          </li>
        </ul>
      </div>
    </div>
  </k-dialog>
</template>
<script setup lang="ts">
import axios from 'axios'
import { ResponseState } from 'src/common/interfaces/response.interface'
import { Notify } from 'src/common/utils/plugin.utils'
import { ref, onMounted, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import * as yaml from 'yaml-front-matter'
import KDialog from '../ui/KDialog.vue'

interface ReleaseData {
  version: string
  date: string
  notes: string
}

const { t } = useI18n()

const showDialog = ref(false)

const state = reactive<ResponseState<ReleaseData[]>>({
  isLoading: false,
  data: null,
  errorMessage: null,
})

const currentVersion = computed(() => (state.data?.length === 0 ? '1.0.0' : state?.data?.[0]?.version))

const loadData = () => {
  state.errorMessage = null
  state.isLoading = false
  axios
    .get('/release-note-app.md')
    .then(({ data }) => {
      const ymls = yaml.loadFront(data)
      state.data = (ymls?.releases as ReleaseData[])?.filter((x) => x.version !== 'next')
    })
    .catch((error) => {
      Notify.error({ message: error })
    })
}

onMounted(() => {
  loadData()
})
</script>
