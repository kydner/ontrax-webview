export interface KCurrencyOption {
  debug?: boolean
  masked?: boolean
  prefix?: string
  suffix?: string
  thousands?: string
  decimal?: string
  precision?: number
  disableNegative?: boolean
  disabled?: boolean
  min?: string | null
  max?: string | null
  allowBlank?: boolean
  minimumNumberOfCharacters?: number
  modelModifiers?: KMoneyOptionModelModifiers
  shouldRound?: boolean
  focusOnRight?: boolean
}

export interface KMoneyOptionModelModifiers {
  number: boolean
}
