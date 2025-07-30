import { Pinia } from 'pinia'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export interface IContextRoute {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
  store: Pinia
}

export type IMiddleware = (context: IContextRoute) => void

function PipelineMiddleware(context: IContextRoute, middlewares: IMiddleware[], index: number) {
  const middleware = middlewares[index]
  if (!middleware) return context.next
  return () => {
    const nextMiddleware = PipelineMiddleware(context, middlewares, index + 1)
    middleware({ ...context, next: nextMiddleware })
  }
}

export default PipelineMiddleware
