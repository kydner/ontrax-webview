<template>
  <k-page padding="normal" class="k-profile-page">
    <!-- Konten utama -->
    <div class="tw-flex-1 tw-flex tw-flex-col tw-min-h-[90vh]">
      <!-- Toolbar -->
      <k-toolbar :header-title="t('myProfile')" @back="router.push({ name: 'home' })" />

      <!-- Avatar -->
      <div class="tw-flex tw-items-center tw-justify-center tw-min-h-[25vh]">
        <q-avatar size="80px" class="overlapping tw-cursor-pointer" v-ripple @click="router.push({ name: 'profile' })">
          <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
        </q-avatar>
      </div>

      <!-- Kartu profil -->
      <div>
        <k-card>
          <q-card-section>
            <h3 class="tw-font-semibold tw-text-lg tw-my-2">{{ fullName }}</h3>

            <!-- Email -->
            <k-popup-edit
              :model-value="profile?.email"
              t-label="attachFile"
              :show-label="false"
              required
              horizontal-label
            >
              <template #default="scope">
                <k-input
                  color="accent"
                  v-model="scope.value"
                  dense
                  autofocus
                  :show-label="false"
                  t-label="attachFile"
                  @keyup.enter="scope.set"
                />
              </template>
              <template #preview:prefix>
                <q-icon name="mail" class="tw-text-primary" />
              </template>
            </k-popup-edit>

            <!-- Phone -->
            <k-popup-edit
              :model-value="profile?.email"
              t-label="attachFile"
              :show-label="false"
              required
              horizontal-label
            >
              <template #default="scope">
                <k-input
                  color="accent"
                  v-model="scope.value"
                  dense
                  autofocus
                  :show-label="false"
                  t-label="attachFile"
                  @keyup.enter="scope.set"
                />
              </template>
              <template #preview:prefix>
                <q-icon name="phone" class="tw-text-primary" />
              </template>
            </k-popup-edit>
          </q-card-section>
        </k-card>
      </div>
    </div>

    <!-- Footer Logout -->
    <template #footer>
      <div class="tw-sticky tw-bottom-0">
        <k-btn color="secondary" :label="t('logout')" class="fit tw-bg-border" @click="onLogout" />
      </div>
    </template>
  </k-page>
</template>

<script setup lang="ts">
import KPage from 'src/components/lib/KPage.vue'
import KToolbar from 'src/components/ui/KToolbar.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import KCard from 'src/components/ui/KCard.vue'
import { useAppStore } from 'src/stores/app.store'
import { computed, nextTick } from 'vue'
import KPopupEdit from 'src/components/ui/KPopupEdit.vue'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import { Loading } from 'quasar'
import { useAuthenticationRepository } from 'src/common/repository/authentication.repository'

const { t } = useI18n()

const router = useRouter()

const appStore = useAppStore()

const authRepo = useAuthenticationRepository()

const profile = computed(() => appStore.$state?.profile)

const fullName = computed(() => profile.value?.fullName)

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

const onLogout = () => {
  $confirm({
    title: t('message'),
    message: t('notification.logoutFromThisPage'),
    button: {
      submit: {
        label: t('logout'),
      },
    },
    callback: (confirm) => {
      if (confirm) {
        logout()
      }
    },
  })
}
</script>
<style scoped lang="scss">
.k-profile-page {
  @apply tw-flex tw-flex-col tw-justify-between tw-h-screen;
  &::before {
    background: url('~assets/images/home-background.svg');
    @apply tw-content-['-'] tw-absolute tw-bg-no-repeat md:tw-bg-repeat-x tw-bg-contain tw-text-surface tw-inset-0 tw-top-0;
  }
}
</style>
