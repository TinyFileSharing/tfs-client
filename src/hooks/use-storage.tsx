import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import fileDownload from 'js-file-download'
import axios from 'axios'
import {
   deleteRecordById,
   fetchDetails,
   fetchPresignedGetURL,
   fetchPresignedPostURL,
   fetchRecords,
} from '../api/storage'

export const useStorage = () => {
   const { getAccessTokenSilently, isAuthenticated } = useAuth0()
   const [token, setToken] = useState<string>()
   const [fileRecords, setFileRecords] = useState<FileRecord[] | undefined>()
   const [storageDetails, setStorageDetails] = useState<StorageDetails | undefined>()

   useEffect(() => {
      if (isAuthenticated) {
         getAccessTokenSilently().then(handleAuthentication).catch(console.log)
      }
   }, [getAccessTokenSilently, isAuthenticated])

   const handleAuthentication = async (token: string) => {
      const paginatedRecords = await fetchRecords(token)
      setFileRecords(paginatedRecords?.results)

      const details = await fetchDetails(token)
      setStorageDetails(details)

      setToken(token)
   }

   const deleteFile = async (fileId: string) => {
      if (!token) {
         throw Error('Cannot delete file. Client is not authenticated!')
      }
      await deleteRecordById(token, fileId)
   }

   const downloadFile = async (fileId: string) => {
      if (!token) {
         throw Error('Cannot download file. Client is not authenticated!')
      }
      const presignedURL = await fetchPresignedGetURL(token, fileId)
      const response = await axios.get<Blob>(presignedURL.url, { responseType: 'blob' })
      fileDownload(response.data, 'malou.mp3')
   }

   const uploadFile = async (file: File) => {
      if (!token) {
         throw Error('Cannot upload file. Client is not authenticated!')
      }
      const presignedURL = await fetchPresignedPostURL(token)

      console.log(file)

      console.log(presignedURL)

      const formData = new FormData()
      Object.entries(presignedURL.fields).forEach(([key, value]) => formData.append(key, value))

      formData.delete('X-Amz-Meta-Record-Name')
      formData.append('X-Amz-Meta-Record-Name', file.name)
      formData.delete('X-Amz-Meta-Record-Type')
      formData.append('X-Amz-Meta-Record-Type', file.type)
      formData.delete('file')
      formData.append('file', file)

      await axios.post(presignedURL.url, formData).catch(console.log)
   }

   const shareFile = (fileId: string) => {
      // TODO - implement sharing
   }

   return { storageDetails, fileRecords, downloadFile, uploadFile, deleteFile, shareFile }
}
