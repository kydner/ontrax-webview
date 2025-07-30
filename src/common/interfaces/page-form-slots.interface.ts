import { VNode } from 'vue'

export interface PageFormSlots {
  'additional:form': (data: { form: any }) => VNode
}
