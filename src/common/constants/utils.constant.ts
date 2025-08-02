import { VECTOR_MENU_BACKGROUNDS } from './svg.constant'

export const BOOLEAN_OPTIONS = [
  {
    label: 'No',
    value: false,
  },
  {
    label: 'Yes',
    value: true,
  },
]

export const getRandomMenuVectors = () => {
  const randomIndex = Math.floor(Math.random() * VECTOR_MENU_BACKGROUNDS.length)
  return VECTOR_MENU_BACKGROUNDS[randomIndex]
}
