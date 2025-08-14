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
      <k-btn
        v-if="form.status === 'QC_SEND'"
        :label="t('readyToSend')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleReadyToSend"
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
import { TransferItemQualityCheckResponse } from 'src/common/model/transfer-item-quality-check.model'
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

const handleReadyToSend = () => {
  $confirm({
    message: `${t('ReadyToSend')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const transferId = formId.value as id
          if (!transferId) throw new ErrorId('transferId')
          Loading.show()
          const qcBeforeSend = form.value.qcBeforeSend

          const data: TransferItemQualityCheckResponse = {
            qcNotes: qcBeforeSend.qcNotes || '',
            qcStockTransferId: qcBeforeSend.qcStockTransferId,
            qcStockTransferItems: qcBeforeSend?.qcStockTransferItems?.map((item) => {
              return {
                qcStockTransferItemId: item.qcStockTransferItemId ?? '',
                itemId: item.itemId,
                qtyReject: item.qtyReject,
                note: item.notes,
              }
            }),
          }
          await repository.qualityCheck(transferId, data)
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
