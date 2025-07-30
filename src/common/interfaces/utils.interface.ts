export interface IKOptionGroup {
  /**
   * Label to display along the component
   */
  label: string
  /**
   * Value of the option that will be used by the component model
   */
  value: any
  /**
   * If true, the option will be disabled
   */
  disable?: boolean
  /**
   * Any other props from QToggle, QCheckbox, or QRadio
   */
  [props: string]: unknown
}
