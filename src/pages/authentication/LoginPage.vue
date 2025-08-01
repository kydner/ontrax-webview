<template>
  <Form ref="observerRef" v-slot="{}" @submit="validSubmit" @invalid-submit="invalidSubmit">
    <div class="tw-basis-full">
      <k-input
        v-model="form.username"
        t-label="username"
        required
        :disable="loading"
        label-padding="none"
        :autocomplete="false"
        :placeholder="t('username')"
        :dense="false"
      >
        <template #prepend>
          <q-icon name="img:/icons/mail.svg" />
        </template>
      </k-input>
    </div>
    <div class="tw-basis-full">
      <k-password
        v-model="form.password"
        t-label="password"
        required
        :disable="loading"
        :autocomplete="false"
        label-padding="none"
        :placeholder="t('password')"
        :dense="false"
      >
        <template #prepend>
          <q-icon name="img:/icons/lock.svg" />
        </template>
      </k-password>
    </div>
    <div class="tw-basis-full tw-my-3 tw-mb-8">
      <k-btn
        :label="t('button.enter')"
        color="secondary"
        type="submit"
        size="lg"
        class="fit login-button"
        :loading="loading"
      />
    </div>
  </Form>
</template>
<script setup lang="ts">
import KInput from 'src/components/ui/KInput.vue'
import KPassword from 'src/components/ui/KPassword.vue'
import KBtn from 'src/components/ui/KBtn.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, FormValidationResult, GenericObject, InvalidSubmissionContext } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { LoginDataRequest } from 'src/common/model/authentication.model'
import { Notify } from 'src/common/utils/plugin.utils'
import { AxiosError, HttpStatusCode } from 'axios'
import { BaseResponse } from 'src/common/interfaces/response.interface'
import { useKSecurity } from 'src/common/utils/encryption.utils'
import { useAuthenticationRepository } from 'src/common/repository/authentication.repository'

const router = useRouter()

const authRepo = useAuthenticationRepository()

const kSecurity = useKSecurity()

const { t } = useI18n()

const form = reactive<LoginDataRequest>({} as LoginDataRequest)

const loading = ref(false)

const observerRef = ref<InstanceType<typeof Form>>()

const validSubmit = () => {
  loading.value = true
  authRepo
    .login(form)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      const errorResponse = (error as AxiosError<BaseResponse<{ accessToken: string; accessTokenExpired: string }>>)
        ?.response
      if (errorResponse?.status === HttpStatusCode.Unauthorized) {
        /**
         * Redirect to change page if error code is
         * 54 = account disable
         * 58 = password expired
         */
        if (['54', '58'].includes(errorResponse?.data?.code)) {
          const token = kSecurity.encrypt(String(errorResponse?.data?.data?.accessToken))
          router?.push({ name: 'change-password', params: { token } })
        }
      }
      Notify.error({
        message: error,
      })
    })
    .finally(() => (loading.value = false))
}

const invalidSubmit = (
  event:
    | InvalidSubmissionContext<GenericObject>
    | FormValidationResult<Record<string, unknown>, Record<string, unknown>>,
) => {
  const { errors } = event
  Notify.create({
    message: Object.values(errors)?.[0],
    type: 'negative',
    icon: 'warning',
  })
}
</script>
<style scoped lang="scss">
.login-button::before {
  background: linear-gradient(133deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-secondary)) 100%);
}
</style>
