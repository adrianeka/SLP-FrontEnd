import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import Select from 'react-select'
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
import { cilShortText, cilUser, cilLockLocked } from '@coreui/icons'

const FormCreateDosenWali = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    dosen_id: '',
    angkatan_id: '',
    kelas_id: '',
    prodi_id: '',
  })
  console.log(formData)

  const [angkatanData, setAngkatanData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/angkatan' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setAngkatanData(response.data)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Angkatan data:', error)
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

  const [kelasData, setKelasData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/kelas' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setKelasData(response.data)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Kelas data:', error)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = 'http://localhost:8080/api/admins/dosen_wali/create'

    // Membuat objek newDosenWali
    const newDosenWali = {
      username: formData.username,
      password: formData.password,
      role_id: '3',
      dosen_id: formData.dosen_id,
      angkatan_id: formData.angkatan_id,
      kelas_id: formData.kelas_id,
      prodi_id: formData.prodi_id,
    }
    try {
      const response = await axios.post(apiUrl, newDosenWali, {
        withCredentials: true,
      })
      // Menampilkan Sweet Alert saat berhasil menambah data
      Swal.fire({
        title: 'Berhasil',
        text: `Data dosen wali berhasil ditambahkan.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mengarahkan user ke kelola dosen wali
          window.location.href = '/kelola/dosen/wali'
          console.log('Dosen Wali created successfully:', response.data)
        }
      })
    } catch (error) {
      // console.error('Error creating Dosen Wali:', error)
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
  console.log(formData)
  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Tambah Dosen Wali</CCardHeader>
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
                    <CInputGroupText id="Angkatan">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, angkatan_id: selectedOption.value })
                        }}
                        id="Angkatan"
                        placeholder="Angkatan"
                        required
                        options={angkatanData.map((data) => ({
                          value: data.id_angkatan,
                          label: data.tahun_angkatan,
                        }))}
                      />
                    </CCol>
                  </CInputGroup>
                </CRow>
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
                    <CInputGroupText id="Kelas">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, kelas_id: selectedOption.value })
                        }}
                        id="Kelas"
                        placeholder="Kelas"
                        required
                        options={kelasData.map((data) => ({
                          value: data.id_kelas,
                          label: data.nama_kelas,
                        }))}
                      />
                    </CCol>
                  </CInputGroup>
                </CRow>
              </CCol>
              <CCol md={6}>
                <CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="Dosen Wali">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        onChange={(selectedOption) => {
                          // Mengatur nilai 'dosen_id' pada 'formData' dengan nilai yang dipilih
                          setFormData({ ...formData, dosen_id: selectedOption.value })
                        }}
                        id="Dosen Wali"
                        placeholder="Dosen Wali"
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
                <Link to={`/kelola/dosen/wali`}>
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
export default FormCreateDosenWali
