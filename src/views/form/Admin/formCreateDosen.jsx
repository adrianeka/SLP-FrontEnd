import React, { useState } from 'react'
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
import {
  cilCalendar,
  cilCircle,
  cilClock,
  cilLockLocked,
  cilShortText,
  cilUser,
} from '@coreui/icons'
import { Link } from 'react-router-dom'

import axios from 'axios'
const FormTambahDosen = () => {
  const [formData, setFormData] = useState({
    nama_dosen: '',
    kode_dosen: '',
    email: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = 'http://localhost:8080/api/admins/dosen/create'

    // Create a new Dosen object from the form data
    const newDosen = {
      kode_dosen: formData.kode_dosen,
      nama_dosen: formData.nama_dosen,
      email: formData.email,
      username: 'a', //Biar ga error aja
      password: 'a', //Biar ga error aja
    }

    try {
      const response = await axios.post(apiUrl, newDosen, {
        withCredentials: true,
      })
      window.location.href = '/kelola/dosen/pengampu'
      console.log('Dosen created successfully:', response.data)
    } catch (error) {
      console.error('Error creating Dosen:', error)
    }
  }
  return (
    <>
      <CCard>
        <CCardHeader>Form Tambah Dosen</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nama">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormTextarea
                  name="nama_dosen"
                  placeholder="Nama Lengkap"
                  floatingLabel="Nama Lengkap"
                  aria-describedby="Nama"
                  value={formData.nama_dosen}
                  onChange={(e) => setFormData({ ...formData, nama_dosen: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
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
            <CCol xs={12}>
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
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={10}></CCol>
            <CCol md={1}>
              <Link to={`/kelola/dosen/pengampu`}>
                <CButton color="secondary" variant="outline" className="ms-2" title="Back">
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

export default FormTambahDosen
