import { boot } from 'quasar/wrappers'
import KInput from 'components/ui/KInput.vue'
import KPassword from 'components/ui/KPassword.vue'
import KBtn from 'components/ui/KBtn.vue'
import KDate from 'components/ui/KDate.vue'
import KLabel from 'components/ui/KLabel.vue'
import KSelect from 'components/ui/KSelect.vue'
import KOptionGroup from 'src/components/ui/KOptionGroup.vue'
import KToggle from 'src/components/ui/KToggle.vue'
import KCurrency from 'src/components/ui/KCurrency.vue'
import KRadio from 'src/components/ui/KRadio.vue'
import KEditor from 'src/components/ui/KEditor.vue'
import KInnerLoading from 'src/components/ui/KInnerLoading.vue'
import KCheckbox from 'src/components/ui/KCheckbox.vue'
import KNumber from 'src/components/ui/KNumber.vue'
import KSwitch from 'src/components/ui/KSwitch.vue'
import KMenu from 'src/components/ui/KMenu.vue'
import KInputPhone from 'src/components/ui/KInputPhone.vue'
import KInputMobilePhone from 'src/components/ui/KInputMobilePhone.vue'
import KTextArea from 'src/components/ui/KTextArea.vue'
import KStatusBadge from 'src/components/ui/KStatusBadge.vue'
import KSelectModule from 'components/ui/KSelectModule.vue'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app } /* { app, router, ... } */) => {
  // something to do
  app.component('k-input', KInput)
  app.component('k-password', KPassword)
  app.component('k-btn', KBtn)
  app.component('k-date', KDate)
  app.component('k-label', KLabel)
  app.component('k-select', KSelect)
  app.component('k-select-module', KSelectModule as any)
  app.component('k-toggle', KToggle)
  app.component('k-currency', KCurrency)
  app.component('k-option-group', KOptionGroup)
  app.component('k-radio', KRadio)
  app.component('k-editor', KEditor)
  app.component('k-inner-loading', KInnerLoading)
  app.component('k-checkbox', KCheckbox)
  app.component('k-number', KNumber)
  app.component('k-switch', KSwitch)
  app.component('k-menu', KMenu)
  app.component('k-input-phone', KInputPhone)
  app.component('k-input-mobile-phone', KInputMobilePhone)
  app.component('k-text-area', KTextArea)
  app.component('k-status-badge', KStatusBadge)
})
