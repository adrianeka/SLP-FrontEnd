import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

const login = (username, password) => {
  return axios
    .post(
      API_URL + 'signin',
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    )
    .then((response) => {
      if (response.data.roles === 'admin') {
        localStorage.setItem('admin', JSON.stringify(response.data))
      } else if (response.data.roles === 'mahasiswa') {
        localStorage.setItem('mahasiswa', JSON.stringify(response.data))
      } else if (response.data.roles === 'dosen_wali') {
        localStorage.setItem('dosenwali', JSON.stringify(response.data))
      } else if (response.data.roles === 'kaprodi') {
        localStorage.setItem('kaprodi', JSON.stringify(response.data))
      }

      return response.data
    })
}

const signout = () => {
  localStorage.removeItem('admin') ??
    localStorage.removeItem('mahasiswa') ??
    localStorage.removeItem('dosenwali') ??
    localStorage.removeItem('kaprodi')

  return axios.post(API_URL + 'signout').then((response) => {
    return response.data
  })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
  login,
  signout,
  getCurrentUser,
}

export default AuthService
