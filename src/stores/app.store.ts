import { setLocale } from '@vee-validate/i18n'
import { defineStore } from 'pinia'
import { MessageLanguages } from 'src/boot/i18n'
import { FormMode } from 'src/common/enum/form.enum'
import { IMetaModule, IMetaState } from 'src/common/interfaces/meta.interface'
import { IInquiryState } from 'src/common/interfaces/store.interface'
import { ProfileResponse } from 'src/common/model/profile.model'

interface IState extends IMetaState {
  loading: boolean

  locale: MessageLanguages

  profile?: ProfileResponse
}

export const useAppStore = defineStore('app', {
  state: (): IState => ({
    loading: false,
    locale: 'en-US',
    meta: {},
  }),
  actions: {
    setLoading(value: boolean): void {
      this.$state.loading = value
    },

    setFormId(data: { meta: IMetaModule; formId: number }): void {
      const { formId, meta } = data

      const metaModule = { ...this.$state.meta[meta.name] }

      this.$state.meta[meta.name] = {
        ...metaModule,
        formId,
      }
    },

    setFormMode(data: { meta: IMetaModule; formMode: FormMode | null }): void {
      const { formMode, meta } = data

      const metaModule = { ...this.$state.meta[meta.name] }

      this.$state.meta[meta.name] = {
        ...metaModule,
        formMode,
      }
    },

    setInquiryForm(data: { meta: IMetaModule; form: IInquiryState }) {
      const { meta, form } = data
      const inquiry = { ...this.$state.meta[meta.name]?.inquiry }

      this.$state.meta[meta.name].inquiry = {
        ...inquiry,
        ...form,
      }
    },

    setStoreData<T>(meta: IMetaModule, storeData: T) {
      this.$state.meta[meta.name].storeData = storeData
    },

    setLocale(value: MessageLanguages) {
      setLocale(value)
      this.$state.locale = value
    },

    setVisibleColumn(data: { meta: IMetaModule; columns: string[] }) {
      const { meta, columns } = data

      const metaModule = { ...this.$state.meta[meta.name] }

      /** create object meta first */
      this.$state.meta[meta.name] = {
        ...metaModule,
      }

      this.$state.meta[meta.name].hideColumns = []

      this.$state.meta[meta.name].hideColumns = columns
    },
  },
})
