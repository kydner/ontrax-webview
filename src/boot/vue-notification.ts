import { boot } from 'quasar/wrappers'
import VueNotification from 'src/components/lib/vue-notification'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app } /* { app, router, ... } */) => {
  // something to do
  app.use(VueNotification)
})
