<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-page-container>
      <router-view />
    </q-page-container>
    <teleport to="body">
      <vue-confirm-dialog></vue-confirm-dialog>
      <vue-notification></vue-notification>
    </teleport>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { idleTime, isIdle, refreshidleTime } from 'src/common/utils/auth.utils'
import { Loading } from 'quasar'
import { $showNotif, Notify } from 'src/common/utils/plugin.utils'
import { ERROR_SESSION_TIMEOUT } from 'src/common/constants/error.constant'
// import { useAppStore } from 'src/stores/app.store'
import { debounce } from 'lodash'
import { useCancelTokenStore } from 'src/stores/cancel-token.store'
import { useAuthenticationRepository } from 'src/common/repository/authentication.repository'

const events = ['scroll', 'visibilitychange'] as const

type EventName = (typeof events)[number]

const debouncedEvents = new Set<EventName>(['scroll'])

// eslint-disable-next-line no-undef
const listeners: [string, EventListenerOrEventListenerObject][] = []

// const appStore = useAppStore()

const authRepo = useAuthenticationRepository()

const cancelTokenStore = useCancelTokenStore()

// const { t } = useI18n()

// const $q = useQuasar()

const router = useRouter()

const logout = async () => {
  try {
    Loading.show()
    await authRepo.logout()
    await router.push({ name: 'authentication' })
  } catch (error) {
    Notify.error({
      message: error as Error,
    })
  } finally {
    await nextTick()
    Loading.hide()
  }
}

const handleBeforeUnload = () => {
  cancelTokenStore.cancelAll()
}

onMounted(() => {
  const showAlert = () => {
    $showNotif({
      message: ERROR_SESSION_TIMEOUT,
      type: 'negative',
      callback: (confirm) => {
        if (confirm) logout()
      },
    })
  }
  let time: any = null
  time = setInterval(() => {
    /** force logout if idle time morethan 8 hours */
    if (idleTime() > 60 * 60 * 8) return logout()

    if (isIdle()) {
      showAlert()
      clearInterval(time)
    }
  }, 1000 * 1)

  const handler = (eventName: EventName) => {
    const refresh = () => {
      if (eventName !== 'visibilitychange' || !document.hidden) {
        refreshidleTime()
      }
    }

    return debouncedEvents.has(eventName) ? debounce(refresh, 1000) : refresh
  }

  events.forEach((eventName) => {
    const fn = handler(eventName)
    listeners.push([eventName, fn])
    document.addEventListener(eventName, fn)
  })

  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  listeners.forEach(([eventName, fn]) => {
    document.removeEventListener(eventName, fn)
  })

  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style lang="scss">
.main-layout {
  max-width: $max-page-width;
  @apply tw-container tw-mx-auto tw-w-full;
}
.list__logo {
  height: $toolbar-min-height;
  display: flex;
  align-items: center;
}
</style>
