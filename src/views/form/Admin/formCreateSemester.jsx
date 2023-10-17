import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
  const [formData, setFormData] = useState({
    id_semester: '',
    status_semester: '',
    tahun_ajar: '',
  })
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = 'http://localhost:8080/api/admins/semester/create'

    const tahunAjar = formData.tahun_ajar.split('/')[0]

    // Membuat objek newSemester
    const newSemester = {
      id_semester: `${formData.id_semester}-${tahunAjar}`,
      nama_semester: `${formData.id_semester === '01' ? 'Ganjil' : 'Genap'} ${formData.tahun_ajar}`,
      status_semester: formData.status_semester,
    }
    try {
      const response = await axios.post(apiUrl, newSemester, {
        withCredentials: true,
      })
      window.location.href = '/kelola/akademik/semester'
      console.log('Semester created successfully:', response.data)
    } catch (error) {
      console.error('Error creating Semester:', error)
    }
  }

  return (
    <>
      <CCard>
        <CCardHeader>Form Tambah Semester</CCardHeader>
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
