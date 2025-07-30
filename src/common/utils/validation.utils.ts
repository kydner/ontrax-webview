import { date } from 'quasar'
import { RuleExpression } from 'vee-validate'

export const validationRules = (rules: RuleExpression<unknown> | undefined, required: boolean) => {
  const defaultMax = 'max:100'

  if (typeof rules === 'object' && rules !== null && !Array.isArray(rules)) {
    const rulesObj = rules as Record<string, unknown>
    return {
      ...rulesObj,
      ...(required ? { required: true } : {}),
      max: Object.hasOwn(rulesObj, 'max') ? rulesObj['max'] : 100,
    }
  }

  if (typeof rules === 'string' && rules.trim()) {
    const ruleParts = rules.split('|')
    const hasMax = ruleParts.some((r) => r.startsWith('max:'))
    if (!hasMax) {
      ruleParts.push(defaultMax)
    }
    let result = ruleParts.join('|')
    if (required) result += '|required'
    return result
  }

  return required ? `${defaultMax}|required` : defaultMax
}

export const validationCurrencyRules = (rules: RuleExpression<unknown>, required: boolean) => {
  if (typeof rules === 'object') {
    return { ...rules, ...(required ? { required: true } : {}) }
  }

  if (rules) {
    return `${rules}${required ? '|zero_validation' : ''}`
  }

  return `${required ? 'zero_validation' : ''}`
}

export const validationFileRules = (rules: RuleExpression<unknown>, required: boolean) => {
  if (typeof rules === 'object') {
    return { ...rules, ...(required ? { required: true } : {}) }
  }

  if (rules) {
    return `${rules}${required ? '|required_file' : ''}`
  }

  return `${required ? 'required_file' : ''}`
}

export const validationOptionRules = (rules: RuleExpression<unknown>, required: boolean) => {
  if (typeof rules === 'object') {
    return { ...rules, ...(required ? { required: true } : {}) }
  }

  if (rules) {
    return `${rules}${required ? '|required_option' : ''}`
  }

  return `${required ? 'required_option' : ''}`
}

export const isRequiredField = (rules: RuleExpression<unknown>): boolean => {
  if (typeof rules === 'object') {
    return (rules as { required: boolean })['required']
  } else {
    return (rules as string).indexOf('required') > -1 || (rules as string).indexOf('zero_validation') > -1
  }
}

export const isDisableRequired = (isDisable: boolean, required: boolean) => !isDisable && required

export const isFile = (value: unknown): boolean => 'File' in window && value instanceof File

export const isValidDate = (datetime: number | string): boolean => date.isValid(datetime)

export const isIsoStringDate = (isoString: string): boolean => isValidDate(isoString)
