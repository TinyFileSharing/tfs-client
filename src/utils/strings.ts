export const shortenString = (
   text: string,
   maxLength: number,
   position: 'start' | 'center' | 'end' = 'center',
): string => {
   if (text.length <= maxLength) {
      return text
   }

   const ellipsis = '...'
   const remainingChars = maxLength - ellipsis.length

   if (position === 'start') {
      return ellipsis + text.slice(-remainingChars)
   } else if (position === 'end') {
      return text.slice(0, remainingChars) + ellipsis
   } else {
      const startSlice = Math.floor(remainingChars / 2)
      const endSlice = text.length - (remainingChars - startSlice)
      return text.slice(0, startSlice) + ellipsis + text.slice(endSlice)
   }
}
