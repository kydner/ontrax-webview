const imageCache = new Map<string, string>()

export function getCachedImageUrl(key: string): string | undefined {
  return imageCache.get(key)
}

export function setCachedImageUrl(key: string, blob: Blob): string {
  let url = imageCache.get(key)
  if (!url) {
    url = URL.createObjectURL(blob)
    imageCache.set(key, url)
  }
  return url
}

export function clearImageUrl(key: string) {
  const url = imageCache.get(key)
  if (url) {
    URL.revokeObjectURL(url)
    imageCache.delete(key)
  }
}

export function clearAllImages() {
  for (const url of imageCache.values()) {
    URL.revokeObjectURL(url)
  }
  imageCache.clear()
}
