import { KCurrencyOption } from '../interfaces/currency.interface'

const CURRENCY_OPTION: KCurrencyOption = {
  debug: false,
  masked: false,
  prefix: '',
  suffix: '',
  thousands: '.',
  decimal: ',',
  precision: 2,
  disableNegative: false,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  modelModifiers: {
    number: false,
  },
  shouldRound: true,
  focusOnRight: true,
}

export { CURRENCY_OPTION }
