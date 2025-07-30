import { IQTableEvent } from '../interfaces/lib.interface'

/**
 * * * @description Evaluate visibility of action buttons
 * * * @param {boolean | ((data: IQTableEvent) => boolean) | undefined} visible - Visibility condition}
 * * * @param {IQTableEvent} data - Data for the row
 * * * @returns {boolean} - True if visible, false otherwise
 * * * @throws {Error} If visible is not a function or boolean
 */
export function evaluateVisibility(
  visible: boolean | ((data: IQTableEvent) => boolean) | undefined,
  data: IQTableEvent,
): boolean {
  if (typeof visible === 'function') {
    return visible(data)
  }
  return visible ?? true // Default to false if visible is undefined
}

export const scoringColor = (score: number): string => {
  if (score >= 87.0 && score <= 100.0) return 'tw-bg-green-400 tw-text-black'
  else if (score >= 45.0 && score < 87.0) return 'tw-bg-yellow-400 tw-text-black'
  else if (score >= 0.0 && score < 45.0) return 'tw-bg-red-400 tw-text-black'
  return ''
}
