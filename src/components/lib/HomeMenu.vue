<template>
  <div class="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-4">
    <div
      v-for="item in props.items"
      :key="item.name"
      v-ripple
      class="tw-relative tw-rounded-base tw-bg-overlay tw-col-span-6 tw-py-4 tw-px-1 tw-cursor-pointer"
      @click="router.push(item.page)"
    >
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2">
        <q-avatar
          text-color="primary"
          size="60px"
          :icon="item.icon"
          :style="{
            backgroundImage: randomBg,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        ></q-avatar>
        <div class="tw-text-xs tw-text-center">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getRandomMenuVectors } from 'src/common/constants/utils.constant'
import { UserMenu } from 'src/common/model/profile.model'
import { useRouter } from 'vue-router'

interface Props {
  items: UserMenu[]
}

const props = withDefaults(defineProps<Props>(), {})

const router = useRouter()

const randomBg = getRandomMenuVectors()
</script>
