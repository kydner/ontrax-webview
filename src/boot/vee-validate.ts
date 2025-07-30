import { boot } from 'quasar/wrappers'
import { configure, defineRule } from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  min_value,
  max_value,
  confirmed,
  length,
  numeric,
  digits,
  regex,
  is_not,
} from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import id from '@vee-validate/i18n/dist/locale/id.json'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { isArray } from 'lodash'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do

  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)
  defineRule('min_value', min_value)
  defineRule('max_value', max_value)
  defineRule('confirmed', confirmed)
  defineRule('length', length)
  defineRule('numeric', numeric)
  defineRule('digits', digits)
  defineRule('regex', regex)
  defineRule('is_not', is_not)

  defineRule('npwp', (value: string) => {
    const regex = /^0[1-9]\.(\d{3})\.(\d{3})\.\d-(\d{3})\.(\d{3})$/
    return !!regex.exec(value?.toString() || '')
  })

  defineRule('alphanumeric', (value: string) => {
    const regex = /^\w+$/
    return !!regex.exec(value?.toString() || '')
  })

  defineRule('alphabet', (value: string) => {
    const regex = /^[A-Za-z ]+$/
    return !!regex.exec(value?.toString() || '')
  })

  defineRule('username', (value: string) => {
    const regex = /^(?!\s)(?!.*\s)[A-Za-z0-9_-]{5,20}$/
    return !!regex.exec(value?.toString() || '')
  })

  defineRule('required_option', (value: string | boolean | number | []) => {
    if (isArray(value)) {
      return value?.length > 0
    }
    return value !== null && value !== undefined
  })

  defineRule('zero_validation', (value: string | number) => {
    return Number(value) !== 0
  })

  defineRule('required_file', (value: File | null) => {
    return !!value
  })

  defineRule('percentage', (value: string | number) => {
    return Number(value) <= 100
  })

  defineRule('url_page', (value: string) => {
    const regex = /^(?!-)(?!.*--)[a-z]+(-[a-z]+)*$/
    return !!regex.exec(value?.toString() || '')
  })

  configure({
    generateMessage: localize({
      'en-US': {
        ...en,
        messages: {
          ...en.messages,
          npwp: 'The {field} field must be npwp format',
          alphanumeric: 'The {field} field must be alphanumeric',
          required_option: 'The {field} field is required',
          requiredCurrency: 'The {field} field is required',
          percentage: 'The {field} field max 100',
          required_file: 'The {field} field must be upload',
          zero_validation: 'The {field} field cannot be zero',
          url_page: 'The {field} format invalid. ex: data-entry',
          menu_icon: 'The {field} format invalid. ex: menu_book',
        },
      },
      'id-ID': {
        ...id,
        messages: {
          ...id.messages,
          npwp: 'Field {field} harus sesuai format npwp',
          alphanumeric: 'Field {field} harus alfanumerik',
          required_option: 'Field {field} harus diisi',
          requiredCurrency: 'Field {field} harus diisi',
          percentage: 'Field {field} maksimal 100',
          required_file: 'Field {field} harus diupload',
          zero_validation: 'Field {field} tidak boleh nol',
          url_page: 'Field {field} tidak valid. contoh: data-entry',
          menu_icon: 'Format {field} tidak valid. contoh: menu_book',
        },
      },
    }),
  })
})
