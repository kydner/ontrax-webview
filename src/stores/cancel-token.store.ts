import { defineStore } from 'pinia'

interface IState {
  controllers: AbortController[]
}

export const useCancelTokenStore = defineStore('cancel-token', {
  state: (): IState => ({
    controllers: [] as AbortController[],
  }),
  actions: {
    add(controller: AbortController) {
      this.controllers.push(controller)
    },

    remove(controller: AbortController) {
      if (!controller) return
      const controllers = this.controllers.filter((item) => item !== controller)
      this.controllers = controllers
    },

    cancelAll() {
      this.controllers.forEach((controller, index) => {
        if (index !== this.controllers.length - 1) controller.abort()
      })
      this.controllers = []
    },
  },
})
