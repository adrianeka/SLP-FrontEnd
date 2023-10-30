import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
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
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { cilShortText } from '@coreui/icons'

const FormUpdateDosen = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  console.log(id) // Mengambil ID dari URL menggunakan useParams
  const [formData, setFormData] = useState({
    nama_dosen: '',
    kode_dosen: '',
    email: '',
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
      // Menampilkan Sweet Alert saat berhasil menambah data
      Swal.fire({
        title: 'Berhasil',
        text: `Data ${updatedDosen.nama_dosen} berhasil diubah.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mengarahkan user ke kelola dosen pengampu
          window.location.href = '/kelola/dosen/pengampu'
          console.log('Dosen updated successfully:', response.data)
        }
      })
    } catch (error) {
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
          <CCardHeader>Form Update Dosen</CCardHeader>
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
                )}
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

export default FormUpdateDosen
