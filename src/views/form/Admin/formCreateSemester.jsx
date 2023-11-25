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
import { cilShortText } from '@coreui/icons'

const FormCreateSemester = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id_semester: '',
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
    }
    try {
      const response = await axios.post(apiUrl, newSemester, {
        withCredentials: true,
      })
      // Menampilkan Sweet Alert saat berhasil menambah data
      Swal.fire({
        title: 'Berhasil',
        text: `Data semester berhasil ditambahkan.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mengarahkan user ke kelola akademik semester
          window.location.href = '/kelola/akademik/semester'
          console.log('Semester created successfully:', response.data)
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
  const optionsSemester = [
    { value: '01', label: 'Ganjil' },
    { value: '02', label: 'Genap' },
  ]
  const optionsStatus = [
    { value: '1', label: 'Aktif' },
    { value: '0', label: 'Tidak Aktif' },
  ]
  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Tambah Semester</CCardHeader>
          <CCardBody>
            <CRow className="g-3">
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
                    required
                    pattern="\d{4}\/\d{4}"
                    title="Gunakan format yang sesuai, contoh: 2023/2024"
                    onChange={(e) => setFormData({ ...formData, tahun_ajar: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={12}>
                <CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="semester">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, id_semester: selectedOption.value })
                        }}
                        id="semester"
                        placeholder="Semester"
                        required
                        options={optionsSemester}
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
                <Link to={`/kelola/akademik/semester`}>
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

export default FormCreateSemester
