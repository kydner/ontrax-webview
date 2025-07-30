export const EXTENSION_TO_MIME: Record<TExtension, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  webp: 'image/webp',
  apng: 'image/apng',
  avif: 'image/avif',
  bmp: 'image/bmp',
  gif: 'image/gif',
  txt: 'text/plain',
  pdf: 'application/pdf',
  aac: 'audio/aac',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '7z': 'application/x-7z-compressed',
  zip: 'application/zip',
  csv: 'text/csv',
} as const

export type TExtension =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'svg'
  | 'tif'
  | 'tiff'
  | 'webp'
  | 'apng'
  | 'avif'
  | 'bmp'
  | 'gif'
  | 'txt'
  | 'pdf'
  | 'aac'
  | 'xls'
  | 'xlsx'
  | 'doc'
  | 'docx'
  | '7z'
  | 'zip'
  | 'csv'
