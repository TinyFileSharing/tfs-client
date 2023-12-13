import './styles.css'
import { useStorage } from '../../contexts/storage-provider'
import { Card } from '../Card'
import { useState } from 'react'

export const UploadCard = () => {
   const { storageDetails, uploadFile } = useStorage()
   const [selectedFile, setSelectedFile] = useState<File | undefined>()

   const maxUploadSizeMB = storageDetails?.maxUploadSize! * 1024 * 1024

   const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0]
      if (file && file.size <= maxUploadSizeMB) {
         setSelectedFile(file)
      } else {
         setSelectedFile(undefined)
         alert('File size exceeds the allowed limit!')
      }
   }

   const handleUpload = async () => {
      if (selectedFile) {
         await uploadFile(selectedFile)
            .then(() => console.log('File uploaded successfully!'))
            .catch(error => console.error('Error uploading file:', error))
         setSelectedFile(undefined)
      }
   }

   return (
      <Card>
         <input type='button' value='Upload file' onClick={handleUpload} />
         <input type='file' onChange={handleSelect} />
         <div className='max-file-upload'>Max file size {storageDetails?.maxUploadSize} MB</div>
      </Card>
   )
}
