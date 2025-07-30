import ApexCharts from 'apexcharts'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts
  }
}
