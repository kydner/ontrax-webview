<template>
  <outbond-logistic-list-page :meta="metaDeliverySend"> </outbond-logistic-list-page>
</template>
<script setup lang="ts">
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import OutbondLogisticListPage from 'src/components/lib/OutbondLogisticListPage.vue'
import { DeliverySendResponsePage } from 'src/common/model/delivery-send.model'
import { DeliverySend } from 'src/common/constants/meta.constant'

const metaDeliverySend: IMetaListModule<DeliverySendResponsePage> = DeliverySend
</script>
