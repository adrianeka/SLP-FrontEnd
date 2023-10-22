import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  CSpinner,
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
import { useParams } from 'react-router-dom'

const FormUpdateMhs = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  console.log(id)
  const [formData, setFormData] = useState({
    nama_dosen: '',
    kode_dosen: '',
    email: '',
    username: '',
    password: '',
    nim: '', // Add this field
    no_telp: '', // Add this field
    no_telp_orang_tua: '', // Add this field
    prodi_id: '', // Add this field
    kelas_id: '', // Add this field
    angkatan_id: '', // Add this field
  })

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
  useEffect(() => {
    // Mengambil data Dosen dari API berdasarkan ID saat komponen dimuat
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/api/admins/mahasiswa/${id}`
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        })
        const MahasiswaData = response.data // Data Dosen yang diambil dari API
        console.log(response.data)
        setFormData({
          nama: MahasiswaData.nama,
          nim: MahasiswaData.nim,
          email: MahasiswaData.username,
          no_telp_orang_tua: MahasiswaData.no_telp_orang_tua,
          no_telp: MahasiswaData.no_telp,
          prodi_id: MahasiswaData.prodi_id,
          kelas_id: MahasiswaData.kelas_id,
          angkatan_id: MahasiswaData.angkatan_id,
        })
      } catch (error) {
        console.error('Error fetching Dosen data:', error)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = `http://localhost:8080/api/admins/mahasiswa/update/${id}`

    // Update Dosen object from the form data
    const updateMahasiswa = {
      nim: formData.nim,
      nama: formData.nama,
      username: formData.email,
      no_telp: formData.no_telp,
      no_telp_orang_tua: formData.no_telp_orang_tua,
      prodi_id: formData.prodi_id,
      kelas_id: formData.kelas_id,
      role_id: 2,
      angkatan_id: formData.angkatan_id,
    }

    try {
      const response = await axios.put(apiUrl, updateMahasiswa, {
        withCredentials: true,
      })
      console.log('Dosen updated successfully:', response.data)
      // Redirect to the appropriate page after successful update
      window.location.href = '/kelola/mahasiswa'
    } catch (error) {
      console.error('Error updating Dosen:', error)
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      setLoading(false)
      setMessage(resMessage)
    }
  }
  return (
    <>
      <CCard>
        <CCardHeader>Create data mahasiswa</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nama">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="nama"
                  placeholder="Nama Lengkap"
                  floatingLabel="Nama Lengkap"
                  aria-describedby="Nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="email-mhs">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="email"
                  placeholder="Email"
                  floatingLabel="Email"
                  aria-describedby="email-mhs"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nim-mhs">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="nim"
                  placeholder="nim"
                  floatingLabel="nim"
                  aria-describedby="nim-mhs"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="noTelpOrgTua">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="no_telp_orang_tua"
                  placeholder="No Telp. Orang Tua"
                  floatingLabel="No Telp. Orang Tua"
                  aria-describedby="noTelpOrangTua"
                  value={formData.no_telp_orang_tua}
                  onChange={(e) => setFormData({ ...formData, no_telp_orang_tua: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="noTelp-mhs">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="no_telp"
                  placeholder="No Telp"
                  floatingLabel="No Telp"
                  aria-describedby="noTelp-mhs"
                  value={formData.no_telp}
                  onChange={(e) => setFormData({ ...formData, no_telp: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CCol mx={12}>
                  <CInputGroup>
                    <CInputGroupText id="Mahasiswa Angkatan">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CFormSelect
                      name="angkatan_id"
                      id="Mahasiswa Angkatan"
                      style={{ height: '100%' }}
                      value={formData.angkatan_id} // Add this line
                      onChange={(e) => setFormData({ ...formData, angkatan_id: e.target.value })}
                    >
                      <option selected hidden>
                        Angkatan Mahasiswa
                      </option>
                      {angkatanData.map((angkatan) => (
                        <option key={angkatan.id_angkatan} value={angkatan.id_angkatan}>
                          {angkatan.tahun_angkatan}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="Kelas">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  name="kelas_id"
                  id="Mahasiswa Kelas"
                  style={{ height: '100%' }}
                  value={formData.kelas_id} // Add this line
                  onChange={(e) => setFormData({ ...formData, kelas_id: e.target.value })}
                >
                  <option selected hidden>
                    Kelas Mahasiswa
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
              <CInputGroup className="mb-3">
                <CInputGroupText id="prodi">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  name="prodi_id"
                  id="Mahasiswa Prodi"
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
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={11}></CCol>
            <CCol xs={1}>
              {loading ? (
                <CButton color="primary" variant="outline" type="submit" disabled>
                  <CSpinner color="info" size="sm" />
                </CButton>
              ) : (
                <CButton color="primary" variant="outline" type="submit" onClick={handleSubmit}>
                  Save
                </CButton>
              )}
            </CCol>
          </CRow>
          <CRow>{message && <p className="error-message alert alert-danger">{message}</p>}</CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default FormUpdateMhs
