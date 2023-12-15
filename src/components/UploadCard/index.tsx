import './styles.css'
import { useStorage } from '../../contexts/storage-provider'
import { Card } from '../Card'
import { useState, useRef, useEffect } from 'react'

export const UploadCard = () => {
   const { storageDetails, uploadFile, isUploading } = useStorage()
   const [selectedFile, setSelectedFile] = useState<File | undefined>()
   const [isDragging, setIsDragging] = useState<boolean>(false)
   const fileInputRef = useRef<HTMLInputElement>(null) // Create a ref for the file input

   useEffect(() => {
      if (selectedFile) {
         uploadFile(selectedFile)
      }
   }, [selectedFile])

   useEffect(() => {
      if (!isUploading) {
         setSelectedFile(undefined)
      }
   }, [isUploading])

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

   const handleCardClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click()
      }
   }

   return (
      <Card className='upload-card' onClick={handleCardClick}>
         <div className='upload-title'>
            {selectedFile ? (
               <>
                  <span className='bold'>{selectedFile.name}</span>
                  <span className='regular-alt'>Uploading...</span>
               </>
            ) : (
               <>
                  <span className='bold'>
                     Drag and drop files or <span className='cta'>browse</span>
                  </span>
                  <span className='regular-alt'>Max file size {storageDetails?.maxUploadSize} MB</span>
               </>
            )}
         </div>
         <input type='file' onChange={handleSelect} ref={fileInputRef} style={{ display: 'none' }} />
         {/* {isDragging && <div className='overlay' />} */}
      </Card>
   )
}
