import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilShortText } from '@coreui/icons'
import { Link } from 'react-router-dom'

import axios from 'axios'
const FormTambahDosen = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama_dosen: '',
    kode_dosen: '',
    email: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = 'http://localhost:8080/api/admins/dosen/create'

    // Create a new Dosen object from the form data
    const newDosen = {
      kode_dosen: formData.kode_dosen,
      nama_dosen: formData.nama_dosen,
      email: formData.email,
    }

    try {
      const response = await axios.post(apiUrl, newDosen, {
        withCredentials: true,
      })
      // Menampilkan Sweet Alert saat berhasil menambah data
      Swal.fire({
        title: 'Berhasil',
        text: `Data dosen berhasil ditambahkan.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mengarahkan user ke kelola dosen pengampu
          window.location.href = '/kelola/dosen/pengampu'
          console.log('Dosen created successfully:', response.data)
        }
      })
    } catch (error) {
      // console.error('Error creating Dosen:', error)
      if (error.response && error.response.data && error.response.data.message) {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        setMessage(resMessage)
      }
      setLoading(false)
    }
  }
  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Tambah Dosen</CCardHeader>
          <CCardBody>
            <CRow>
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
                    required
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
                    required
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
                    type="email"
                    placeholder="Email"
                    floatingLabel="Email"
                    aria-describedby="email"
                    value={formData.email}
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
            </CRow>
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
                {loading ? (
                  <CButton color="primary" variant="outline" type="submit" disabled>
                    <CSpinner color="info" size="sm" />
                  </CButton>
                ) : (
                  <CButton color="primary" variant="outline" type="submit">
                    Submit
                  </CButton>
                )}{' '}
              </CCol>
            </CRow>
            <CRow className="mt-2">
              {message && <p className="error-message alert alert-danger">{message}</p>}
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
    </>
  )
}

export default FormTambahDosen
