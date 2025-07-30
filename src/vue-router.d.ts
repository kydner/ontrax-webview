// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
import 'vue-router'
import { IMiddleware } from 'src/common/pipeline.midleware'
import { MessageSchema } from './boot/i18n'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    middlewares?: IMiddleware[]
    title?: string
    t?: keyof MessageSchema
  }
}
