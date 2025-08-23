import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { LoginDataResponse } from 'src/common/model/authentication.model'

interface IState extends Partial<LoginDataResponse> {
  idle: number
  isLoggedIn: boolean
}

export const useAuthenticationStore = defineStore('authentication', {
  state: (): IState => ({
    isLoggedIn: false,
    idle: 0,
  }),
  getters: {},
  actions: {
    reset() {
      this.$state.isLoggedIn = false
      this.$state.token = null
      this.$state.idle = 0
      this.$state.accessTokenExpired = 0
      LocalStorage.clear()
    },

    isExpiredRefresh(): boolean {
      // kalau expireDuration 0/null → expired
      if (!this.$state.expireDuration) return true

      // kalau tidak ada startRefreshTime → expired
      if (!this.$state.startRefreshTime) return true

      const start = this.$state.startRefreshTime
      const now = Date.now()

      console.log(now - start > this.$state.expireDuration)
      return now - start > this.$state.expireDuration
    },
  },
})
