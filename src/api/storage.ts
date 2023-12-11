import axios from 'axios'

const baseUrl = 'https://testing.tinyfilesharing.com'

const fetchWithToken = async (url: string, token: string) => {
	return await axios.get(baseUrl + url, {
		headers: { Authorization: `Bearer ${token}` },
	})
}

export const fetchRecords = async (token: string) => {
	try {
		const res = await fetchWithToken('/api/storage/files/list?offset=0&count=100', token)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const fetchDetails = async (token: string) => {
	try {
		const res = await fetchWithToken('/api/storage/details', token)
		return res.data
	} catch (e) {
		console.log(e)
	}
}
