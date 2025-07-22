import axios from 'axios'

const axiosInstance = axios.create({
  // You can set your baseURL or other global config here
  baseURL: 'http://localhost:3000',
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config)
    // You can modify config here (e.g., add auth headers)
    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response)
    return response
  },
  (error) => {
    // Handle response error
    return Promise.reject(error)
  },
)

export default axiosInstance
