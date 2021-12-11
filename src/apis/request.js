import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3002/',
  timeout: 50000,
})

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  (error) => {
    console.error('axios error :: ', error)
    if (error && error.response) {
      return Promise.reject(error.response.data)
    } else {
      alert('서버와의 통신에 오류가 발생했습니다.')
      return Promise.reject(null)
    }
  },
)

export default request
