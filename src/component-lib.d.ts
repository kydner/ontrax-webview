// src/global-components.d.ts
import KInput from 'components/ui/KInput.vue'
import KCurrency from 'components/ui/KCurrency.vue'
import KPassword from 'components/ui/KPassword.vue'
import KBtn from './components/ui/KBtn.vue'
import KDate from './components/ui/KDate.vue'
import KLabel from './components/ui/KLabel.vue'
import KSelect from './components/ui/KSelect.vue'
import KSelectModule from './components/ui/KSelectModule.vue'
import KSelectParameter from './components/ui/KSelectParameter.vue'
import KOptionGroup from './components/ui/KOptionGroup.vue'
import KToggle from './components/ui/KToggle.vue'
import KSeparator from './components/ui/KSeparator.vue'
import KRadio from './components/ui/KRadio.vue'
import KEditor from './components/ui/KEditor.vue'
import KInnerLoading from './components/ui/KInnerLoading.vue'
import KCheckbox from './components/ui/KCheckbox.vue'
import KFieldWrapper from './components/ui/KFieldWrapper.vue'
import KNumber from './components/ui/KNumber.vue'
import KSwitch from './components/ui/KSwitch.vue'
import KMenu from './components/ui/KMenu.vue'
import KInputPhone from './components/ui/KInputPhone.vue'
import KInputMobilePhone from './components/ui/KInputMobilePhone.vue'
import KTextArea from './components/ui/KTextArea.vue'
import KStatusBadge from './components/ui/KStatusBadge.vue'
declare module 'vue' {
  export interface GlobalComponents {
    KInput: typeof KInput
    KCurrency: typeof KCurrency
    KPassword: typeof KPassword
    KBtn: typeof KBtn
    KDate: typeof KDate
    KLabel: typeof KLabel
    KSelect: typeof KSelect
    KSelectModule: typeof KSelectModule
    KSelectParameter: typeof KSelectParameter
    KToggle: typeof KToggle
    KSeparator: typeof KSeparator
    KOptionGroup: typeof KOptionGroup
    KRadio: typeof KRadio
    KEditor: typeof KEditor
    KInnerLoading: typeof KInnerLoading
    KCheckbox: typeof KCheckbox
    KFieldWrapper: typeof KFieldWrapper
    KNumber: typeof KNumber
    KSwitch: typeof KSwitch
    KMenu: typeof KMenu
    KInputPhone: typeof KInputPhone
    KInputMobilePhone: typeof KInputMobilePhone
    KTextArea: typeof KTextArea
    KStatusBadge: typeof KStatusBadge
  }
}
