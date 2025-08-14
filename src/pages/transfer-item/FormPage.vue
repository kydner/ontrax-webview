<template>
  <operational-form-page ref="operationalFormPageRef" v-model="form" :meta="metaTransferItem">
    <template #footer:button="{ loading, errorMessage }">
      <k-btn
        v-if="form.status === 'DRAFT'"
        :label="t('saveToReadyToSend')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleSaveToReadyToSend"
      />
    </template>
  </operational-form-page>
</template>
<script setup lang="ts">
import { Loading } from 'quasar'
import { TransferItem } from 'src/common/constants/meta.constant'
import { ErrorId } from 'src/common/exceptions/error-id'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { id } from 'src/common/interfaces/response.interface'
import { TransferItemDataRequest } from 'src/common/model/transfer-item.model'
import { TransferItemResponsePage } from 'src/common/model/transfer-item.model'
import { useTransferItemRepository } from 'src/common/repository/transfer-item.repository'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import OperationalFormPage from 'src/components/lib/OperationalFormPage.vue'
import { ComponentPublicInstance, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

type MetaFormPageExposed = {
  validate: () => Promise<boolean>
}

const { t } = useI18n()

const router = useRouter()

const repository = useTransferItemRepository()

const metaTransferItem: IMetaListModule<TransferItemResponsePage> = TransferItem

const operationalFormPageRef = ref<ComponentPublicInstance<MetaFormPageExposed> | null>(null)

const form = ref({} as TransferItemDataRequest)

const formId = computed(() => form.value?.stockTransferId as id)

const handleSaveToReadyToSend = () => {
  $confirm({
    message: `${t('saveToReadyToSend')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const transferId = formId.value as id
          if (!transferId) throw new ErrorId('transferId')
          Loading.show()
          await repository.startQcSend(transferId)
          Notify.success({
            message: t('success'),
          })
          router.back()
        } catch (error) {
          Notify.error({
            message: error as Error,
          })
        } finally {
          Loading.hide()
        }
      }
    },
  })
}
</script>
