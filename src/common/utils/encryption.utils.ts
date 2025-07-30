import { ERROR_DECRYPT_EMPTY_CHIPERTEXT, ERROR_EMPTY_SECRET_KEY } from '../constants/error.constant'
import CryptoJS, { AES } from 'crypto-js'
import {
  compress,
  decompress,
  compressToBase64,
  decompressFromBase64,
  compressToUTF16,
  decompressFromUTF16,
} from 'lz-string'
import { defineBase } from './plugin.utils'

export const useCompress = defineBase({
  compress: (input: string) => {
    try {
      return compress(input)
    } catch (error) {
      throw new Error(`${error}`)
    }
  },
  decompress: (compressed: string) => {
    try {
      return decompress(compressed)
    } catch (error) {
      throw new Error(`${error}`)
    }
  },
  compressToBase64: (input: string) => {
    return compressToBase64(input)
  },
  decompressFromBase64: (compressed: string) => {
    return decompressFromBase64(compressed)
  },
  compressToUTF16: (input: string) => {
    return compressToUTF16(input)
  },
  decompressFromUTF16: (compressed: string) => {
    return decompressFromUTF16(compressed)
  },
})

export const useAES = defineBase({
  encrypt: (input: string, key?: string) => {
    try {
      if (!key) throw new Error(ERROR_EMPTY_SECRET_KEY)
      return AES.encrypt(input, key)?.toString()
    } catch (error) {
      throw new Error(`${error}`)
    }
  },

  decrypt: (encrypted: string | null, key?: string): string | null => {
    try {
      if (encrypted === null) throw new Error(ERROR_DECRYPT_EMPTY_CHIPERTEXT)
      if (!key) throw new Error(ERROR_EMPTY_SECRET_KEY)
      return AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8)
    } catch (error: unknown) {
      console.error('Decrypt error:', error)
      return null
    }
  },
})

export const useBase4 = defineBase({
  encode: (input: string): string => {
    try {
      const wordArray = CryptoJS.enc.Utf8.parse(input) // Convert string to WordArray
      return CryptoJS.enc.Base64.stringify(wordArray)
    } catch (error) {
      throw new Error(`${error}`)
    }
  },
  decode: (encode: string): string | null => {
    try {
      const wordArray = CryptoJS.enc.Base64.parse(encode) // Parse Base64 to WordArray
      return CryptoJS.enc.Utf8.stringify(wordArray)
    } catch (error: unknown) {
      console.error('Decode error:', error)
      return null
    }
  },
})

export const useKSecurity = defineBase({
  encrypt: (input: string, key: string | undefined = process.env.APP_SECRET_KEY): string => {
    const compress = useCompress()
    const aes = useAES()
    const base64 = useBase4()

    const compressed = compress.compressToUTF16(input)
    const encrypted = aes.encrypt(compressed, key)
    const encode = base64.encode(encrypted)
    return encode
  },
  decrypt: (encrypted: string, key: string | undefined = process.env.APP_SECRET_KEY): string | null => {
    try {
      const compress = useCompress()

      const aes = useAES()
      const base64 = useBase4()
      const decrypted = aes.decrypt(base64.decode(encrypted), key)
      if (!decrypted) throw new Error('Failed to decompressed')
      const decompressed = compress.decompressFromUTF16(decrypted)
      return decompressed
    } catch (error) {
      console.error('Decode error:', error)
      return null
    }
  },
})
