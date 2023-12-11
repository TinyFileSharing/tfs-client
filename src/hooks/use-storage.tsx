import { useAuth0 } from '@auth0/auth0-react'
import {
   deleteRecordById,
   fetchDetails,
   fetchPresignedGetURL,
   fetchPresignedPostURL,
   fetchRecords,
} from '../api/storage'
import { useEffect, useState } from 'react'

export const useStorage = () => {
   const { getAccessTokenSilently, isAuthenticated } = useAuth0()
   const [token, setToken] = useState<string>()
   const [fileRecords, setFileRecords] = useState<FileRecord[] | undefined>()
   const [storageDetails, setStorageDetails] = useState<StorageDetails | undefined>()

   useEffect(() => {
      if (isAuthenticated) {
         getAccessTokenSilently().then(handleAuthentication).catch(console.log)
      }
   }, [isAuthenticated])

   const handleAuthentication = async (token: string) => {
      const paginatedRecords = await fetchRecords(token)
      setFileRecords(paginatedRecords?.results)

      const details = await fetchDetails(token)
      setStorageDetails(details)

      setToken(token)
   }

   const deleteFile = async (id: string) => {
      if (!token) {
         throw Error('Cannot delete file. Client is not authenticated!')
      }
      await deleteRecordById(token, id)
   }

   const downloadFile = async (id: string) => {
      if (!token) {
         throw Error('Cannot download file. Client is not authenticated!')
      }
      const presignedURL = await fetchPresignedGetURL(token, id)

      console.log(presignedURL)

      // TODO - implement download
   }

   const uploadFile = async (filePathIThink: any) => {
      if (!token) {
         throw Error('Cannot upload file. Client is not authenticated!')
      }
      const presignedURL = await fetchPresignedPostURL(token)

      console.log(presignedURL)

      // TODO - implement upload
   }

   return { storageDetails, fileRecords, downloadFile, uploadFile, deleteFile }
}
