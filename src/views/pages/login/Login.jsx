import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import polban from './../../../assets/images/polban.png'
import AuthService from 'src/services/authService'

const Login = () => {
  const form = useRef()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    let isFormValid = true // Menyimpan status keseluruhan validasi

    if (!password) {
      setMessage('Password harus diisi.')
      isFormValid = false
    }
    if (!username) {
      setMessage('Username harus diisi.')
      isFormValid = false
    }
    if (!isFormValid) {
      setLoading(false)
      return
    }
    AuthService.login(username, password).then(
      (response) => {
        const userRole = response.roles
        if (userRole === 'admin') {
          navigate('/dashboard')
        } else if (userRole === 'mahasiswa') {
          navigate('/dashboardMhs')
        } else if (userRole === 'dosen_wali') {
          navigate('/dashboardDosenWali')
        }
        window.location.reload()
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
      },
    )
  }
  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin} ref={form}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        placeholder="Username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        placeholder="Password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {loading ? (
                          <CButton
                            color="light"
                            className="px-4 text-center"
                            type="submit"
                            disabled
                          >
                            <CSpinner color="dark" size="sm" />
                          </CButton>
                        ) : (
                          <CButton color="light" className="px-4 text-center" type="submit">
                            Login
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="mt-2">
                      {message && <p className="error-message alert alert-danger">{message}</p>}
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
