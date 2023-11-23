import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Select from 'react-select'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilShortText, cilUser } from '@coreui/icons'
import { Link, useParams } from 'react-router-dom'

const FormUpdateKaprodi = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  console.log(id) // Mengambil ID dari URL menggunakan useParams
  const [formData, setFormData] = useState({
    dosen_id: '',
    username: '',
    password: '',
    prodi_id: '', // Add this field
  })

  useEffect(() => {
    // Mengambil data Dosen dari API berdasarkan ID saat komponen dimuat
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/api/admins/kaprodi/${id}`
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        })
        const kaprodiData = response.data // Data Dosen yang diambil dari API
        console.log(response.data)
        setFormData({
          dosen_id: kaprodiData.dosen_id,
          username: kaprodiData.username,
          password: kaprodiData.password,
          prodi_id: kaprodiData.prodi_id, // Add this field
        })
      } catch (error) {
        console.error('Error fetching Kaprodi data:', error)
      }
    }

    fetchData()
  }, [id])

  const [prodiData, setProdiData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/prodi' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setProdiData(response.data)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Prodi data:', error)
      })
  }, [])

  const [dosenData, setDosenData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/dosen' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setDosenData(response.data)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Kelas data:', error)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const apiUrl = 'http://localhost:8080/api/admins/create/kaprodi'

    let isFormValid = true // Menyimpan status keseluruhan validasi

    // Validasi setiap field terpisah

    if (!formData.prodi_id) {
      setMessage('Prodi harus dipilih.')
      isFormValid = false
    }
    if (!formData.dosen_id) {
      setMessage('Dosen harus dipilih.')
      isFormValid = false
    }
    if (!formData.username) {
      setMessage('Username harus diisi.')
      isFormValid = false
    }
    if (!formData.password) {
      setMessage('Password harus diisi.')
      isFormValid = false
    }
    if (!isFormValid) {
      setLoading(false)
      return
    }

    const newKaprodi = {
      username: formData.username,
      password: formData.password,
      prodi_id: formData.prodi_id,
      role_id: 4,
      dosen_id: formData.dosen_id,
    }
    try {
      const response = await axios.post(apiUrl, newKaprodi, {
        withCredentials: true,
      })

      Swal.fire({
        title: 'Berhasil',
        text: 'Data Kaprodi berhasil ditambahkan',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kelola/kaprodi'
          console.log('Kaprodi created successfully:', response.data)
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
          <CCardHeader>Form Tambah Kaprodi</CCardHeader>
          <CCardBody>
            <CRow className="g-3 mx-2">
              <CCol md={6}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="username-dsn">
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    name="Username"
                    placeholder="Username"
                    floatingLabel="Username"
                    aria-describedby="username-dsn"
                    value={formData.username}
                    required
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="password-dsn">
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    floatingLabel="Password"
                    aria-describedby="password-dsn"
                    value={formData.password}
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </CInputGroup>
              </CCol>

              <CCol md={6}>
                <CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="Prodi">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, prodi_id: selectedOption.value })
                        }}
                        id="Prodi"
                        placeholder="Prodi"
                        required
                        options={prodiData.map((data) => ({
                          value: data.id_prodi,
                          label: data.nama_prodi,
                        }))}
                      />
                    </CCol>
                  </CInputGroup>
                </CRow>
              </CCol>

              <CCol md={6}>
                <CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="Dosen">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        onChange={(selectedOption) => {
                          // Mengatur nilai 'dosen_id' pada 'formData' dengan nilai yang dipilih
                          setFormData({ ...formData, dosen_id: selectedOption.value })
                        }}
                        id="Dosen "
                        placeholder="Dosen"
                        name="dosen_id"
                        required
                        options={dosenData.map((data) => ({
                          value: data.kode_dosen,
                          label: data.nama_dosen + ' (' + data.kode_dosen + ')',
                        }))}
                        isSearchable
                        isClearable
                      />
                    </CCol>
                  </CInputGroup>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol xs={10}></CCol>
              <CCol md={1}>
                <Link to={`/kelola/kaprodi`}>
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

export default FormUpdateKaprodi
