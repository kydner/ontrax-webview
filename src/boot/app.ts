// import { capitalize } from 'lodash'
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
  // const versionMode = process.env.APP_VERSION_MODE
  // if (versionMode && !['production'].includes(versionMode?.toLocaleLowerCase())) {
  //   document.body.setAttribute('data-version-title', capitalize(versionMode))
  //   document.body.classList?.add('version-mode')
  // }

  const appName = process.env.APP_NAME
  appName && document.documentElement.setAttribute('data-theme', appName)
})
