<template>
  <k-page padding="normal" class="k-profile-page">
    <!-- Konten utama -->
    <div class="tw-flex-1 tw-flex tw-flex-col tw-min-h-[80vh]">
      <!-- Toolbar -->
      <k-toolbar :header-title="t('myProfile')" @back="router.push({ name: 'home' })" />

      <!-- Avatar -->
      <div class="tw-flex tw-items-center tw-justify-center tw-min-h-[25vh]">
        <template v-if="userState.isLoading">
          <q-skeleton type="circle" size="80px" />
        </template>
        <template v-else>
          <q-avatar
            size="80px"
            class="overlapping tw-cursor-pointer"
            :color="avatarColor(fullName)"
            v-ripple
            @click="router.push({ name: 'profile' })"
          >
            {{ fullName?.charAt(0)?.toUpperCase() }}
          </q-avatar>
        </template>
      </div>

      <!-- profil -->
      <div>
        <k-card>
          <q-card-section>
            <!-- Nama -->
            <template v-if="userState.isLoading">
              <q-skeleton type="text" width="60%" class="tw-my-2" />
            </template>
            <template v-else>
              <h3 class="tw-font-semibold tw-text-lg tw-my-2">{{ fullName }}</h3>
            </template>

            <!-- Email -->
            <template v-if="userState.isLoading">
              <div class="tw-flex tw-items-center tw-gap-2 tw-my-2">
                <q-skeleton type="QAvatar" size="24px" />
                <q-skeleton type="text" width="70%" />
              </div>
            </template>
            <template v-else>
              <k-popup-edit
                v-model="userEmail"
                t-label="email"
                :show-label="false"
                required
                horizontal-label
                @save="(newEmail) => handleUpdateProfile({ email: newEmail })"
              >
                <template #default="scope">
                  <k-input
                    color="accent"
                    v-model="scope.value"
                    dense
                    autofocus
                    :show-label="false"
                    t-label="email"
                    @keyup.enter="scope.set"
                  />
                </template>
                <template #preview:prefix>
                  <q-icon name="mail" class="tw-text-primary" />
                </template>
              </k-popup-edit>
            </template>

            <!-- Phone -->
            <template v-if="userState.isLoading">
              <div class="tw-flex tw-items-center tw-gap-2 tw-my-2">
                <q-skeleton type="QAvatar" size="24px" />
                <q-skeleton type="text" width="50%" />
              </div>
            </template>
            <template v-else>
              <k-popup-edit
                v-model="userPhoneNumber"
                t-label="phoneNumber"
                :show-label="false"
                required
                horizontal-label
                @save="(newPhone) => handleUpdateProfile({ phoneNumber: newPhone })"
              >
                <template #default="scope">
                  <k-input
                    color="accent"
                    v-model="scope.value"
                    dense
                    autofocus
                    :show-label="false"
                    :mask="MASK_MOBILE_PHONE"
                    rules="min:9"
                    t-label="phoneNumber"
                    @keyup.enter="scope.set"
                  />
                </template>
                <template #preview:prefix>
                  <q-icon name="phone" class="tw-text-primary" />
                </template>
              </k-popup-edit>
            </template>
          </q-card-section>
        </k-card>
      </div>
    </div>

    <!-- Footer Logout -->
    <template #footer>
      <div class="tw-sticky tw-bottom-0">
        <k-btn
          color="secondary"
          :label="t('logout')"
          class="fit tw-bg-border"
          :disable="userState.isLoading"
          @click="handleLogout"
        />
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
import { computed, nextTick, onMounted, reactive } from 'vue'
import KPopupEdit from 'src/components/ui/KPopupEdit.vue'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import { Loading } from 'quasar'
import { useAuthenticationRepository } from 'src/common/repository/authentication.repository'
import { useUserRepository } from 'src/common/repository/user.repository'
import { ResponseState } from 'src/common/interfaces/response.interface'
import { ErrorId } from 'src/common/exceptions/error-id'
import { UserResponse } from 'src/common/model/user.model'
import { getErrorMessage } from 'src/common/utils/error.utils'
import { MASK_MOBILE_PHONE } from 'src/common/constants/mask-input.constant'
import { avatarColor } from 'src/common/utils/converter.utils'

const { t } = useI18n()

const router = useRouter()

const appStore = useAppStore()

const authRepo = useAuthenticationRepository()

const userRepo = useUserRepository()

const profile = computed(() => appStore.$state?.profile)

const userId = computed(() => profile.value?.id)

const fullName = computed(() => profile.value?.fullName)

const userState = reactive<ResponseState<UserResponse>>({
  isLoading: false,
  data: {} as UserResponse,
  errorMessage: null,
})

const userEmail = computed({
  get: () => userState.data?.email ?? '',
  set: (val: string) => {
    if (userState.data) {
      userState.data.email = val
    }
  },
})
const userPhoneNumber = computed({
  get: () => userState.data?.phoneNumber ?? '',
  set: (val: string) => {
    if (userState.data) {
      userState.data.phoneNumber = val
    }
  },
})

const fetchUser = async () => {
  try {
    userState.isLoading = true
    userState.data = {} as UserResponse
    userState.errorMessage = null
    if (!userId.value) throw new ErrorId('UserId')
    const response = await userRepo.getOne(userId.value)
    userState.data = response
  } catch (error) {
    userState.errorMessage = getErrorMessage(error as Error)
    Notify.error({
      message: error as Error,
    })
  } finally {
    userState.isLoading = false
  }
}

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

const handleLogout = () => {
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

const handleUpdateProfile = async (payload?: Partial<UserResponse>) => {
  try {
    if (!userId.value) throw new ErrorId('UserId')
    Loading.show()

    const updateData = {
      ...(userState.data as UserResponse),
      ...payload, // merge dengan perubahan terakhir
    }

    await userRepo.update(userId.value, updateData)

    Notify.success({
      message: t('notification.successUpdate'),
    })
  } catch (error) {
    fetchUser()
    Notify.error({
      message: error as Error,
    })
  } finally {
    Loading.hide()
  }
}

onMounted(() => {
  fetchUser()
})
</script>
<style scoped lang="scss">
.k-profile-page {
  position: relative;
  min-height: 100vh;
  position: relative;
  &::before {
    content: '';
    background: url('~assets/images/home-background.svg');
    @apply tw-absolute tw-inset-0 tw-bg-no-repeat md:tw-bg-repeat-x tw-bg-contain;
    z-index: -1;
  }

  &::after {
    content: '';
    @apply tw-absolute tw-inset-0;
    background: linear-gradient(180deg, #2d2d33 0%, #0c0c0f 100%);
    z-index: -2;
  }
}
</style>
