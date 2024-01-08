import axios from 'axios'

const storageUrl = process.env.REACT_APP_STORAGE_URL || 'https://t-api.tinyfilesharing.com/api/storage'
const shareUrl = process.env.REACT_APP_SHARE_URL || 'https://t-api.tinyfilesharing.com/share'

async function getWithToken<T>(url: string, token: string) {
   const response = await axios.get<T>(storageUrl + url, {
      headers: { Authorization: `Bearer ${token}` },
   })
   return response.data
}

async function postWithToken<T>(url: string, token: string, data?: any) {
   const response = await axios.post<T>(storageUrl + url, data, {
      headers: { Authorization: `Bearer ${token}` },
   })
   return response.data
}

async function deleteWithToken(url: string, token: string) {
   await axios.delete(storageUrl + url, {
      headers: { Authorization: `Bearer ${token}` },
   })
}

export const fetchDetails = async (token: string): Promise<StorageDetails | undefined> => {
   return await getWithToken<StorageDetails>('/details', token)
}

export const fetchRecords = async (
   token: string,
   offset = 0,
   count = 25,
): Promise<PaginatedResults<FileRecord> | undefined> => {
   return await getWithToken<PaginatedResults<FileRecord>>(`/files/list?offset=${offset}&count=${count}`, token)
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

export const shortenUrl = async (url: string, alias: string = 'f'): Promise<ShortenedURL> => {
   const formData = new FormData()
   formData.append('alias', alias)
   formData.append('url', url)
   const response = await axios.post(shareUrl, formData)
   return response.data
}
