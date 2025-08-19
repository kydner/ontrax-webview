// src/common/cache/image-cache.ts
import { id } from '../interfaces/response.interface'

const imageCache = new Map<id, string>()

export async function getCachedImageUrl(fileId: id, fetcher: () => Promise<Blob>): Promise<string> {
  const cached = imageCache.get(fileId)
  if (cached !== undefined) {
    return cached
  }

  const blob = await fetcher()
  const url = URL.createObjectURL(blob)
  imageCache.set(fileId, url)
  return url
}

export function clearImageUrl(fileId: id) {
  const url = imageCache.get(fileId)
  if (url !== undefined) {
    URL.revokeObjectURL(url)
    imageCache.delete(fileId)
  }
}

export function clearAllImages() {
  for (const url of imageCache.values()) {
    URL.revokeObjectURL(url)
  }
  imageCache.clear()
}
