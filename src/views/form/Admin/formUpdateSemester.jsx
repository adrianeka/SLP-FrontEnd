import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
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

const FormUpdateSemester = () => {
  const { id } = useParams()
  console.log(id) // Mengambil ID dari URL menggunakan useParams
  const [formData, setFormData] = useState({
    id_semester: '',
    status_semester: '',
    tahun_ajar: '',
  })
  useEffect(() => {
    // Mengambil data Semester dari API berdasarkan ID saat komponen dimuat
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/api/admins/semester/${id}`
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        })
        const semesterData = response.data // Data Semester yang diambil dari API
        console.log(response.data)
        // Membagi id_semester menjadi dua bagian
        const idSemesterParts = semesterData.id_semester.split('-')
        const id_semester = idSemesterParts[0]

        // Mengekstrak tahun ajar dari nama_semester
        const tahunAjar = semesterData.nama_semester.split(' ').pop()

        // Mengatur data ke dalam state formData
        setFormData({
          id_semester: id_semester,
          status_semester: semesterData.status_semester,
          tahun_ajar: tahunAjar,
        })
      } catch (error) {
        console.error('Error fetching Semester data:', error)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = `http://localhost:8080/api/admins/semester/update/${id}`

    const tahunAjar = formData.tahun_ajar.split('/')[0]

    // Membuat objek updateSemester
    const updateSemester = {
      id_semester: `${formData.id_semester}-${tahunAjar}`,
      nama_semester: `${formData.id_semester === '01' ? 'Ganjil' : 'Genap'} ${formData.tahun_ajar}`,
      status_semester: formData.status_semester,
    }
    try {
      const response = await axios.put(apiUrl, updateSemester, {
        withCredentials: true,
      })
      window.location.href = '/kelola/akademik/semester'
      console.log('Semester updatedS successfully:', response.data)
    } catch (error) {
      console.error('Error updating Semester:', error)
    }
  }
  console.log(formData)
  return (
    <>
      <CCard>
        <CCardHeader>Form Update Semester</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tahun_ajar">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="tahun_ajar"
                  placeholder="ex : 2023/2024"
                  floatingLabel="Tahun Ajar"
                  aria-describedby="tahun_ajar"
                  value={formData.tahun_ajar}
                  onChange={(e) => setFormData({ ...formData, tahun_ajar: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="semester">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  id="semester"
                  value={formData.id_semester}
                  onChange={(e) => setFormData({ ...formData, id_semester: e.target.value })}
                >
                  <option selected hidden>
                    Semester
                  </option>
                  <option value="01">Ganjil</option>
                  <option value="02">Genap</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="status">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  id="status"
                  value={formData.status_semester}
                  onChange={(e) => setFormData({ ...formData, status_semester: e.target.value })}
                >
                  <option selected hidden>
                    Status
                  </option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={10}></CCol>
            <CCol md={1}>
              <Link to={`/kelola/akademik/semester`}>
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

export default FormUpdateSemester
