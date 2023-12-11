import axios from 'axios'

const baseUrl = 'https://testing.tinyfilesharing.com/api/storage'

async function fetchWithToken<T>(url: string, token: string) {
   const response = await axios.get<T>(baseUrl + url, {
      headers: { Authorization: `Bearer ${token}` },
   })
   return response.data
}

async function postWithToken<T>(url: string, token: string, data?: any) {
   const response = await axios.post<T>(baseUrl + url, data, {
      headers: { Authorization: `Bearer ${token}` },
   })
   return response
}

async function deleteWithToken<T>(url: string, token: string) {
   await axios.delete(baseUrl + url, {
      headers: { Authorization: `Bearer ${token}` },
   })
}

export const fetchDetails = async (token: string): Promise<StorageDetails | undefined> => {
   return await fetchWithToken<StorageDetails>('/details', token)
}

export const fetchRecords = async (token: string): Promise<PaginatedResults<FileRecord> | undefined> => {
   // TODO - Add pagination query params
   return await fetchWithToken<PaginatedResults<FileRecord>>('/files/list', token)
}

export const deleteRecordById = async (token: string, fileId: string) => {
   await deleteWithToken('/files/delete/' + fileId, token)
}

export const fetchPresignedPostURL = async (token: string) => {
   return await postWithToken('/files/presignedurl/post', token)
}

export const fetchPresignedGetURL = async (token: string, fileId: string) => {
   return await postWithToken('/files/presignedurl/get/' + fileId, token)
}
