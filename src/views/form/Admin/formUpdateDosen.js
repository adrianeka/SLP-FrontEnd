import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { cilPen, cilLockLocked, cilShortText, cilUser } from '@coreui/icons'

const FormUpdateDosen = () => {
  const { id } = useParams()
  console.log(id) // Mengambil ID dari URL menggunakan useParams
  const [formData, setFormData] = useState({
    nama_dosen: '',
    kode_dosen: '',
    email: '',
    username: '',
    password: '',
  })

  useEffect(() => {
    // Mengambil data Dosen dari API berdasarkan ID saat komponen dimuat
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/api/admins/dosen/${id}`
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        })
        const dosenData = response.data // Data Dosen yang diambil dari API
        console.log(response.data)
        setFormData({
          nama_dosen: dosenData.nama_dosen,
          kode_dosen: dosenData.kode_dosen,
          email: dosenData.email,
          username: dosenData.username,
        })
      } catch (error) {
        console.error('Error fetching Dosen data:', error)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = `http://localhost:8080/api/admins/dosen/update/${id}`

    // Update Dosen object from the form data
    const updatedDosen = {
      kode_dosen: formData.kode_dosen,
      nama_dosen: formData.nama_dosen,
      email: formData.email,
      username: formData.username,
    }

    try {
      const response = await axios.put(apiUrl, updatedDosen, {
        withCredentials: true,
      })
      console.log('Dosen updated successfully:', response.data)
      // Redirect to the appropriate page after successful update
      window.location.href = '/kelola/dosen/pengampu'
    } catch (error) {
      console.error('Error updating Dosen:', error)
    }
  }
  return (
    <>
      <CCard>
        <CCardHeader>Form Update Dosen</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nama">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="nama_dosen"
                  placeholder="Nama Lengkap"
                  floatingLabel="Nama Lengkap"
                  aria-describedby="Nama"
                  value={formData.nama_dosen}
                  onChange={(e) => setFormData({ ...formData, nama_dosen: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="kode">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="kode_dosen"
                  placeholder="Kode Dosen"
                  floatingLabel="Kode Dosen"
                  aria-describedby="kode"
                  value={formData.kode_dosen}
                  onChange={(e) => setFormData({ ...formData, kode_dosen: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="email-dsn">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="email"
                  placeholder="Email"
                  floatingLabel="Email"
                  aria-describedby="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="username-dsn">
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  name="username"
                  placeholder="Username"
                  floatingLabel="Username"
                  aria-describedby="username-dsn"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </CInputGroup>
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={10}></CCol>
            <CCol xs={1}>
              <Link to={`/kelola/dosen/pengampu`}>
                <CButton color="warning" variant="outline" className="ms-2" title="Back">
                  Back
                </CButton>
              </Link>
            </CCol>
            <CCol xs={1}>
              {' '}
              <CButton color="primary" variant="outline" type="submit" onClick={handleSubmit}>
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default FormUpdateDosen
