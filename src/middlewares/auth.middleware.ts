import { IContextRoute } from 'src/common/pipeline.midleware'
import { refreshidleTime } from 'src/common/utils/auth.utils'
import { useAuthenticationStore } from 'src/stores/authentication.store'

export default async function auth({ next }: IContextRoute) {
  try {
    const store = useAuthenticationStore()
    const isLoggedIn = store.$state.isLoggedIn
    if (!isLoggedIn) next({ name: 'authentication' })
    else {
      refreshidleTime()
      next()
    }
  } catch (error: unknown) {
    console.error('Error: Middleware', error)
    next({ name: 'auth' })
  }
}
