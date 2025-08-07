<template>
  <q-dialog v-model="internalModel">
    <q-card class="tw-w-72">
      <q-card-section>
        <div class="text-h6">Ubah Nilai</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model.number="tempValue" type="number" label="Nilai baru" dense autofocus />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Batal" color="grey" @click="close" />
        <q-btn flat label="Confirm" color="primary" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  value: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'confirm', value: number): void
}>()

const internalModel = ref(props.modelValue)
const tempValue = ref(props.value)

watch(
  () => props.modelValue,
  (v) => {
    internalModel.value = v
    tempValue.value = props.value
  },
)

watch(internalModel, (v) => emit('update:modelValue', v))

function close() {
  internalModel.value = false
}

function confirm() {
  emit('confirm', tempValue.value)
  close()
}
</script>
