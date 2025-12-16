import { defineStore } from 'pinia'
import { ITopic } from 'src/common/enum/web-socket.enum' // ITopic tetap digunakan sebagai kunci
import { reactive } from 'vue'

type ChannelMessage<T = any> = T

export const useChannelStore = defineStore('channel', {
  state: () => ({
    channels: reactive(new Map<ITopic, ChannelMessage>()),
  }),

  getters: {
    getData: (state) => {
      return <T>(topic: ITopic): ChannelMessage<T> | null => (state.channels.get(topic) as ChannelMessage<T>) ?? null
    },
  },
  actions: {
    updateData<T>(topic: ITopic, message: ChannelMessage<T>) {
      this.channels.set(topic, message) // sekarang reactive
    },

    clearData(topic: ITopic) {
      this.channels.delete(topic)
    },
  },
})
