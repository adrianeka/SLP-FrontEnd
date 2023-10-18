import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilCircle,
  cilClock,
  cilShortText,
  cilUser,
  cilLockLocked,
} from '@coreui/icons'

const FormUpdateDosenWali = () => {
  const { id } = useParams()
  console.log(id)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    dosen_id: '',
    angkatan_id: '',
    kelas_id: '',
    prodi_id: '',
  })
  console.log(formData)

  useEffect(() => {
    // Mengambil data Dosen Wali dari API berdasarkan ID saat komponen dimuat
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/api/admins/dosen_wali/${id}`
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        })
        const DosenWaliData = response.data // Data Dosen yang diambil dari API
        console.log(response.data)
        setFormData({
          username: DosenWaliData.username,
          password: DosenWaliData.password,
          dosen_id: DosenWaliData.dosen_id,
          angkatan_id: DosenWaliData.angkatan_id,
          kelas_id: DosenWaliData.kelas_id,
          prodi_id: DosenWaliData.prodi_id,
        })
      } catch (error) {
        console.error('Error fetching Dosen Wali data:', error)
      }
    }

    fetchData()
  }, [id])

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
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = `http://localhost:8080/api/admins/dosen_wali/${id}`

    // Membuat objek updateDosenWali
    const updateDosenWali = {
      username: formData.username,
      password: formData.password,
      role_id: '3',
      dosen_id: formData.dosen_id,
      angkatan_id: formData.angkatan_id,
      kelas_id: formData.kelas_id,
      prodi_id: formData.prodi_id,
    }
    try {
      const response = await axios.put(apiUrl, updateDosenWali, {
        withCredentials: true,
      })
      window.location.href = '/kelola/dosen/wali'
      console.log('Dosen Wali updated successfully:', response.data)
    } catch (error) {
      console.error('Error updating Dosen Wali:', error)
    }
  }
  return (
    <>
      <CCard>
        <CCardHeader>Form Update Dosen Wali</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={12}>
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
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </CInputGroup>
            </CCol>

            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="Tingkat">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  id="Angkatan"
                  style={{ height: '100%' }}
                  value={formData.angkatan_id} // Add this line
                  onChange={(e) => setFormData({ ...formData, angkatan_id: e.target.value })}
                >
                  <option selected hidden>
                    Angkatan
                  </option>
                  {angkatanData.map((angkatan) => (
                    <option key={angkatan.id_angkatan} value={angkatan.id_angkatan}>
                      {angkatan.tahun_angkatan}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="Prodi">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  id="Prodi"
                  style={{ height: '100%' }}
                  value={formData.prodi_id} // Add this line
                  onChange={(e) => setFormData({ ...formData, prodi_id: e.target.value })}
                >
                  <option selected hidden>
                    Prodi
                  </option>
                  {prodiData.map((prodi) => (
                    <option key={prodi.id_prodi} value={prodi.id_prodi}>
                      {prodi.nama_prodi}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="Kelas">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  id="Kelas"
                  style={{ height: '100%' }}
                  value={formData.kelas_id} // Add this line
                  onChange={(e) => setFormData({ ...formData, kelas_id: e.target.value })}
                >
                  <option selected hidden>
                    Kelas
                  </option>
                  {kelasData.map((kelas) => (
                    <option key={kelas.id_kelas} value={kelas.id_kelas}>
                      {kelas.nama_kelas}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
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
          </CForm>
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
              {' '}
              <CButton color="primary" variant="outline" onClick={handleSubmit}>
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default FormUpdateDosenWali
