export const toReadableSize = (bytes: number, round = false, extension = true): string => {
   if (bytes === 0) return extension ? '0 Bytes' : '0'
   const k = 1024
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
   const i = Math.floor(Math.log(bytes) / Math.log(k))
   const float = parseFloat((bytes / Math.pow(k, i)).toFixed(2))
   const finalSize = round ? Math.round(float) : float
   return finalSize + (extension ? ' ' + sizes[i] : '')
}
