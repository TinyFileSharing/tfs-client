import { fileIcons } from './fileIcons'

const baseUrl = 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons'

export const filenameToSvgIcon = (filename: string) => {
   const candidateExtension = filename.split('.').pop()

   if (!candidateExtension) {
      return baseUrl + `/${fileIcons.defaultIcon.name}.svg`
   }

   const icon = fileIcons.icons.filter(i => i.fileExtensions?.includes(candidateExtension))[0] ?? fileIcons.defaultIcon

   return baseUrl + `/${icon.name}.svg`
}
