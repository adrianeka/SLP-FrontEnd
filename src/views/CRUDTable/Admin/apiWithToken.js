import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('token')
}

const apiWithToken = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
})

export default apiWithToken
