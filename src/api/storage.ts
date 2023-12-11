import axios from 'axios'

const baseUrl = 'https://testing.tinyfilesharing.com'

async function fetchWithToken<T>(url: string, token: string) {
   return await axios.get<T>(baseUrl + url, {
      headers: { Authorization: `Bearer ${token}` },
   })
}

export const fetchDetails = async (token: string): Promise<StorageDetails | undefined> => {
   try {
      const res = await fetchWithToken<StorageDetails>('/api/storage/details', token)
      return res.data
   } catch (error) {
      console.log('Error fetching storage details', error)
   }
}

export const fetchRecords = async (token: string): Promise<PaginatedResults<FileRecord> | undefined> => {
   try {
      // TODO - Add pagination query params
      const res = await fetchWithToken<PaginatedResults<FileRecord>>('/api/storage/files/list', token)
      return res.data
   } catch (error) {
      console.log('Error fetching file records', error)
   }
}
