<template>
  <operational-form-page v-model="form" :meta="metaReceiveItem"></operational-form-page>
</template>
<script setup lang="ts">
import { ReceiveItem } from 'src/common/constants/meta.constant'
import { IMetaListModule } from 'src/common/interfaces/meta.interface'
import { ReceiveItemDataRequest } from 'src/common/model/receive-item.model'
import { ReceiveItemResponsePage } from 'src/common/model/receive-item.model'
import OperationalFormPage from 'src/components/lib/OperationalFormPage.vue'
import { ref } from 'vue'

const metaReceiveItem: IMetaListModule<ReceiveItemResponsePage> = ReceiveItem

const form = ref({} as ReceiveItemDataRequest)
</script>
