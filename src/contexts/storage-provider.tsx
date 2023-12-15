import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import fileDownload from 'js-file-download'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import {
   deleteRecordById,
   fetchDetails,
   fetchPresignedGetURL,
   fetchPresignedPostURL,
   fetchRecords,
} from '../api/storage'

interface StorageContextProps {
   isLoading: boolean
   isUploading: boolean
   storageDetails: Partial<StorageDetails>
   fileRecords: FileRecord[]
   loadNextRecords: () => Promise<void>
   deleteFile: (fileId: string) => Promise<void>
   downloadFile: (fileId: string) => Promise<void>
   uploadFile: (file: File) => Promise<void>
   shareFile: (fileId: string) => Promise<void>
}

const StorageContext = createContext<StorageContextProps | undefined>(undefined)

export const useStorage = () => {
   const context = useContext(StorageContext)
   if (!context) {
      throw new Error('useStorageContext must be used within a StorageProvider')
   }
   return context
}

export const StorageProvider = ({ children }: PropsWithChildren) => {
   const { getAccessTokenSilently, isAuthenticated } = useAuth0()
   const [isLoading, setIsLoading] = useState<boolean>(true)
   const [isUploading, setIsUploading] = useState<boolean>(false)
   const [token, setToken] = useState<string>()
   const [storageDetails, setStorageDetails] = useState<Partial<StorageDetails>>({})
   const [fileRecords, setFileRecords] = useState<FileRecord[]>([])
   const [nextPageIndex, setNextPageIndex] = useState(0)

   useEffect(() => {
      if (isAuthenticated) {
         getAccessTokenSilently()
            .then(handleAuthentication)
            .then(() => setIsLoading(false))
            .catch(console.log)
      }
   }, [getAccessTokenSilently, isAuthenticated])

   const handleAuthentication = async (token: string) => {
      const paginatedRecords = await fetchRecords(token, nextPageIndex)
      setFileRecords(paginatedRecords?.results ?? [])
      const details = await fetchDetails(token)
      setStorageDetails(details!)
      setNextPageIndex(prev => prev + 1)
      setToken(token)
   }

   const deleteFile = async (fileId: string) => {
      if (!token) {
         throw Error('Cannot delete file. Client is not authenticated!')
      }
      await deleteRecordById(token, fileId)
      setFileRecords(prev => prev?.filter(file => file.id !== fileId))
   }

   const downloadFile = async (fileId: string) => {
      if (!token) {
         throw Error('Cannot download file. Client is not authenticated!')
      }
      const presignedURL = await fetchPresignedGetURL(token, fileId)
      const response = await axios.get<Blob>(presignedURL.url, { responseType: 'blob' })
      const file = fileRecords.filter(file => file.id === fileId)[0]
      fileDownload(response.data, file.name, file.type)
   }

   const uploadFile = async (file: File) => {
      if (!token) {
         throw Error('Cannot upload file. Client is not authenticated!')
      }

      setIsUploading(true)

      const presignedURL = await fetchPresignedPostURL(token)

      const formData = new FormData()
      Object.entries(presignedURL.fields).forEach(([key, value]) => {
         formData.append(key, value)
      })
      formData.delete('X-Amz-Meta-Record-Name')
      formData.append('X-Amz-Meta-Record-Name', file.name)
      formData.delete('X-Amz-Meta-Record-Type')
      formData.append('X-Amz-Meta-Record-Type', file.type)
      formData.delete('File')
      formData.append('File', file)

      await axios.post(presignedURL.url, formData).catch(console.log)

      const dummyRecord: FileRecord = {
         ...presignedURL.dummyRecord,
         name: file.name,
         type: file.type,
         size: file.size,
      }

      setIsUploading(false)

      setFileRecords(prev => [dummyRecord, ...prev])
   }

   const loadNextRecords = async () => {
      if (!token) {
         throw Error('Cannot load next file records. Client is not authenticated!')
      }
      const paginatedRecords = await fetchRecords(token, nextPageIndex)
      setFileRecords(prev => [...prev, ...paginatedRecords?.results!])
      setNextPageIndex(prev => prev + 1)
   }

   const shareFile = async (fileId: string) => {
      // TODO - implement sharing
   }

   const contextValue: StorageContextProps = {
      isLoading,
      isUploading,
      storageDetails,
      fileRecords,
      loadNextRecords,
      downloadFile,
      uploadFile,
      deleteFile,
      shareFile,
   }

   return <StorageContext.Provider value={contextValue}>{children}</StorageContext.Provider>
}
