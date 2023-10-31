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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilCircle, cilClock, cilShortText } from '@coreui/icons'
import { Link } from 'react-router-dom'

const FormCreateDataMengajar = () => {
  const [formData, setFormData] = useState({
    id_dosen: '',
    angkatan_id: '',
    kelas_id: '',
    prodi_id: '',
    id_detailMatkul: '',
    id_semester: '',
  })

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
  console.log(formData)
  return (
    <>
      <CCard>
        <CCardHeader>Form Tambah Data Mengajar</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
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
                    Detail Matkul
                  </option>
                  {detailMatkulData.map((detailMatkul) => (
                    <option key={detailMatkul.id_detailMatkul} value={detailMatkul.id_detailMatkul}>
                      {`${detailMatkul.mataKuliah.nama_matakuliah} (${detailMatkul.tipe})`}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="dosen">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  name="id_dosen"
                  id="Dosen"
                  style={{ height: '100%' }}
                  value={formData.id_dosen} // Add this line
                  required
                  onChange={(e) => setFormData({ ...formData, id_dosen: e.target.value })}
                >
                  <option selected hidden>
                    Dosen
                  </option>
                  {dosenData.map((dosen) => (
                    <option key={dosen.kode_dosen} value={dosen.kode_dosen}>
                      {dosen.nama_dosen + ' (' + dosen.kode_dosen + ')'}
                    </option>
                  ))}
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={10}></CCol>
            <CCol xs={1}>
              {' '}
              <Link to={'/kelola/akademik/mengajar'}>
                <CButton color="secondary" variant="outline">
                  Back
                </CButton>
              </Link>
            </CCol>
            <CCol xs={1}>
              {' '}
              <CButton color="primary" variant="outline">
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default FormCreateDataMengajar
