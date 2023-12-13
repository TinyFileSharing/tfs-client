import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://testing.tinyfilesharing.com/api/storage'

async function getWithToken<T>(url: string, token: string) {
   const response = await axios.get<T>(baseUrl + url, {
      headers: { Authorization: `Bearer ${token}` },
   })
   return response.data
}

async function postWithToken<T>(url: string, token: string, data?: any) {
   const response = await axios.post<T>(baseUrl + url, data, {
      headers: { Authorization: `Bearer ${token}` },
   })
   return response.data
}

async function deleteWithToken(url: string, token: string) {
   await axios.delete(baseUrl + url, {
      headers: { Authorization: `Bearer ${token}` },
   })
}

export const fetchDetails = async (token: string): Promise<StorageDetails | undefined> => {
   return await getWithToken<StorageDetails>('/details', token)
}

export const fetchRecords = async (token: string): Promise<PaginatedResults<FileRecord> | undefined> => {
   // TODO - Add pagination query params
   return await getWithToken<PaginatedResults<FileRecord>>('/files/list', token)
}

export const deleteRecordById = async (token: string, fileId: string): Promise<void> => {
   await deleteWithToken('/files/delete/' + fileId, token)
}

export const fetchPresignedPostURL = async (token: string): Promise<PresignedPostURL> => {
   return await postWithToken<PresignedPostURL>('/files/presignedurl/post', token)
}

export const fetchPresignedGetURL = async (token: string, fileId: string): Promise<PresignedGetURL> => {
   return await postWithToken<PresignedGetURL>('/files/presignedurl/get/' + fileId, token)
}
