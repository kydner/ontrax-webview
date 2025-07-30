import { App } from 'vue'
import VueNotification from './VueNotification.vue'

export default {
  install(app: App, args: Record<string, unknown> = {}): void {
    const componentName = typeof args.componentName === 'string' ? args.componentName : 'vue-notification'

    app.component(componentName, VueNotification)
  },
}
