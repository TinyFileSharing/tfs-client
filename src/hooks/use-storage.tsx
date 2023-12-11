import { useAuth0 } from '@auth0/auth0-react'
import { fetchDetails, fetchRecords } from '../api/storage'
import { useEffect, useState } from 'react'

export const useStorage = () => {
   const { getAccessTokenSilently, isAuthenticated } = useAuth0()
   const [fileRecords, setFileRecords] = useState<FileRecord[] | undefined>()
   const [storageDetails, setStorageDetails] = useState<StorageDetails | undefined>()

   useEffect(() => {
      if (isAuthenticated) {
         getAccessTokenSilently().then(fetchData).catch(console.log)
      }
   }, [getAccessTokenSilently, isAuthenticated])

   const fetchData = async (token: string) => {
      const paginatedRecords = await fetchRecords(token)
      setFileRecords(paginatedRecords?.results)

      const details = await fetchDetails(token)
      setStorageDetails(details)
   }

   return { storageDetails, fileRecords }
}
