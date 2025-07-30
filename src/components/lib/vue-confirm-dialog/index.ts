import { App } from 'vue'
import VueConfirmDialog from './VueConfirmDialog.vue'
import { bus } from 'src/common/event-bus'
export default {
  install(app: App, args: Record<string, unknown> = {}): void {
    const componentName = typeof args.componentName === 'string' ? args.componentName : 'vue-confirm-dialog'

    app.component(componentName || 'vue-confirm-dialog', VueConfirmDialog)

    const confirm = (params: Record<string, unknown>) => {
      if (typeof params !== 'object' || Array.isArray(params)) {
        const caughtType = typeof params
        throw new Error(`Options type must be an object. Caught: ${caughtType}. Expected: object`)
      }

      if (params.callback && typeof params.callback !== 'function') {
        const callbackType = typeof params.callback
        throw new Error(`Callback type must be an function. Caught: ${callbackType}. Expected: function`)
      }

      bus.emit('open', params)
    }

    confirm.close = () => {
      bus.emit('close')
    }

    // Add to global properties
    app.config.globalProperties.$confirm = confirm
  },
}
