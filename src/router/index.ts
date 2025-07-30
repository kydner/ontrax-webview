import { route } from 'quasar/wrappers'
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthenticationStore } from 'src/stores/authentication.store'
import PipelineMiddleware, { IContextRoute } from 'src/common/pipeline.midleware'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
  let createHistory

  if (process.env.SERVER) {
    createHistory = createMemoryHistory
  } else if (process.env.VUE_ROUTER_MODE === 'history') {
    createHistory = createWebHistory
  } else {
    createHistory = createWebHashHistory
  }

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const storeAuth = useAuthenticationStore()
    const isLoggedIn = storeAuth.$state.isLoggedIn

    if (isLoggedIn && to.name === 'authentication') {
      next('/')
      return
    }

    const rawMiddlewares = to.meta?.middlewares
    if (!rawMiddlewares) {
      next()
      return
    }

    // Gunakan Array.isArray untuk memastikan
    if (Array.isArray(rawMiddlewares)) {
      const context: IContextRoute = { to, from, next, store }
      rawMiddlewares[0]({
        ...context,
        next: PipelineMiddleware(context, rawMiddlewares, 1),
      })
    } else {
      next()
    }
  })

  return Router
})
