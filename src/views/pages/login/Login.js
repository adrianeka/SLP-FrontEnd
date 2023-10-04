import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import polban from './../../../assets/images/polban.png'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', formData, {
        withCredentials: true, // Include cookies with the request
      })

      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Login failed:', error)
      setError('Login gagal. Cek kembali username dan password Anda.')
    }
  }
  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="light" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      {error && <div className="error-message alert alert-danger">{error}</div>}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-dark bg-light py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Student Leaving Permission</h2>
                    <div className="clearfix">
                      <CImage
                        align="center"
                        rounded
                        src={polban}
                        alt="Polban"
                        width={155}
                        height={210}
                      />
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
