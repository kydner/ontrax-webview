import { storePlugin } from './services/store-plugin.service'
import { useKSecurity } from './utils/encryption.utils'

const kSecurity = useKSecurity()

const encrypt = (value: string) => kSecurity.encrypt(value)

const decrypt = (value: string) => (value ? (kSecurity.decrypt(value) ?? '') : '')

export const piniaPlugin = storePlugin({
  stores: ['authentication', 'app'],
  storage: localStorage,
  encrypt,
  decrypt,
})
