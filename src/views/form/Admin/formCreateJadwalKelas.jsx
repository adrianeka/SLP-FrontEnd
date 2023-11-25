import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilCircle, cilClock, cilShortText } from '@coreui/icons'
import { Link } from 'react-router-dom'

const FormCreateJadwalKelas = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    angkatan_id: '',
    kelas_id: '',
    prodi_id: '',
    id_detailMatkul: '',
    id_semester: '',
  })

  const [angkatanData, setAngkatanData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/angkatan' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setAngkatanData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching Angkatan data:', error)
      })
  }, [])

  const [semesterData, setSemesterData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/semester' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setSemesterData(response.data)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Semester data:', error)
      })
  }, [])

  const [detailMatkulData, setDetailMatkulData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/detailMatkul' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setDetailMatkulData(response.data)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Detail Matkul data:', error)
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
    const apiUrl = 'http://localhost:8080/api/admins/create/angkatan/detailmatkul'

    // Create a new Dosen object from the form data
    const newJadwal = {
      angkatan_id: formData.angkatan_id,
      kelas_id: formData.kelas_id,
      prodi_id: formData.prodi_id,
      id_detailMatkul: formData.id_detailMatkul,
      id_semester: formData.id_semester,
    }
    console.log(newJadwal)

    try {
      const response = await axios.post(apiUrl, newJadwal, {
        withCredentials: true,
      })
      Swal.fire({
        title: 'Berhasil',
        text: `Data Jadwal berhasil ditambahkan.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kelola/rombongan-belajar/prodi'
          console.log('Jadwal created successfully:', response.data)
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
          <CCardHeader>Form Tambah Jadwal</CCardHeader>
          <CCardBody>
            <CRow className="g-3">
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
                        required
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
                    required
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
                    required
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
                  <CInputGroupText id="semester">
                    <CIcon icon={cilShortText} />
                  </CInputGroupText>
                  <CFormSelect
                    name="id_semester"
                    id="Semester"
                    style={{ height: '100%' }}
                    value={formData.id_semester} // Add this line
                    required
                    onChange={(e) => setFormData({ ...formData, id_semester: e.target.value })}
                  >
                    <option selected hidden>
                      Semester
                    </option>
                    {semesterData.map((semester) => (
                      <option key={semester.id_semester} value={semester.id_semester}>
                        {semester.nama_semester}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="detailMatkul">
                    <CIcon icon={cilShortText} />
                  </CInputGroupText>
                  <CFormSelect
                    name="id_detailMatkul"
                    id="DetailMatkul"
                    style={{ height: '100%' }}
                    value={formData.id_detailMatkul} // Add this line
                    required
                    onChange={(e) => setFormData({ ...formData, id_detailMatkul: e.target.value })}
                  >
                    <option selected hidden>
                      MataKuliah
                    </option>
                    {detailMatkulData.map((detailMatkul) => (
                      <option
                        key={detailMatkul.id_detailMatkul}
                        value={detailMatkul.id_detailMatkul}
                      >
                        {`${detailMatkul.mataKuliah.nama_matakuliah} (${detailMatkul.tipe})`}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol xs={10}></CCol>
              <CCol xs={1}>
                {' '}
                <Link to={'/kelola/akademik/jadwalKelas'}>
                  <CButton color="secondary" variant="outline">
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
          </CCardFooter>
        </CForm>
      </CCard>
    </>
  )
}

export default FormCreateJadwalKelas
