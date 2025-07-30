/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    APP_NAME?: 'development' | 'poc' | 'sbii' | 'jtrust'
    ENV_NAME:
      | 'development'
      | 'poc'
      | 'sbii'
      | 'sbii-development'
      | 'sbii-uat'
      | 'sbii-sit'
      | 'jtrust'
      | 'jtrust-development'
      | 'jtrust-uat'
      | 'jtrust-sit'
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
  }
}
