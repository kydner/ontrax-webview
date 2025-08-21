<template>
  <operational-form-page ref="operationalFormPageRef" v-model="form" :meta="metaReceiveItem">
    <template #footer:button="{ loading, errorMessage }">
      <k-btn
        v-if="form.status === 'IN_TRANSIT'"
        :label="t('updateToReceive')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleUpdateToReceive"
      />
      <k-btn
        v-if="form.status === 'RECEIVED'"
        :label="t('updateToQcReceive')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleUpdateToQcReceive"
      />
      <k-btn
        v-if="form.status === 'QC_RECEIVE'"
        :label="t('updateToQcPass')"
        color="secondary"
        class="fit"
        :disable="loading || !!errorMessage"
        @click="handleUpdateToQcPass"
      />
    </template>
  </operational-form-page>
</template>
<script setup lang="ts">
import { Loading } from 'quasar'
import { ReceiveItem } from 'src/common/constants/meta.constant'
import { ErrorId } from 'src/common/exceptions/error-id'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { id } from 'src/common/interfaces/response.interface'
import { ReceiveItemDataRequest } from 'src/common/model/receive-item.model'
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import { useTransferItemRepository } from 'src/common/repository/transfer-item.repository'
import { $confirm, Notify } from 'src/common/utils/plugin.utils'
import OperationalFormPage from 'src/components/lib/OperationalFormPage.vue'
import { ComponentPublicInstance } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { MetaFormPageExposed } from '../transfer-item/FormPage.vue'
import { TransferItemReceiveDataRequest } from 'src/common/model/transfer-item-receive.model'
import { TransferItemQualityCheckResponse } from 'src/common/model/transfer-item-quality-check.model'

const { t } = useI18n()

const router = useRouter()

const repository = useTransferItemRepository()

const metaReceiveItem: IMetaListModule<ReceiveItemResponsePage> = ReceiveItem

const operationalFormPageRef = ref<ComponentPublicInstance<MetaFormPageExposed> | null>(null)

const form = ref({} as ReceiveItemDataRequest)

const formId = computed(() => form.value?.stockTransferId as id)

const handleUpdateToReceive = () => {
  $confirm({
    message: `${t('saveToReadyToSend')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const transferId = formId.value as id
          if (!transferId) throw new ErrorId('transferId')
          Loading.show()
          const data: TransferItemReceiveDataRequest = {
            receiverNotes: form.value?.receiverNotes,
            receivedItems: form.value?.transferItems?.map((item) => {
              return {
                qtyReceived: item.qtyTransfer,
                stockTransferItemId: item.stockTransferItemId,
              }
            }),
          }
          await repository.received(transferId, data)
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

const handleUpdateToQcReceive = () => {
  $confirm({
    message: `${t('saveToReadyToSend')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const transferId = formId.value as id
          if (!transferId) throw new ErrorId('transferId')
          Loading.show()
          await repository.startQcReceived(transferId)
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

const handleUpdateToQcPass = () => {
  $confirm({
    message: `${t('saveToReadyToSend')}?`,
    callback: async (confirm) => {
      if (confirm) {
        try {
          const transferId = formId.value as id
          if (!transferId) throw new ErrorId('transferId')
          Loading.show()

          const qcAfterReceived = form.value?.qcAfterReceived

          const data: TransferItemQualityCheckResponse = {
            qcNotes: form.value.senderNotes || '',
            qcStockTransferId: qcAfterReceived.qcStockTransferId,
            qcStockTransferItems:
              qcAfterReceived?.qcStockTransferItems?.map((item) => {
                return {
                  qcStockTransferItemId: item.qcStockTransferItemId ?? null,
                  qtyReject: item.qtyReject ?? 0,
                  note: item.notes ?? null,
                  fileId: item?.fileId ?? null,
                }
              }) || [],
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
