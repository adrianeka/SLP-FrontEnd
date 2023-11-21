import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Swal from 'sweetalert2'
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
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilShortText } from '@coreui/icons'

const FormUpdateSemester = () => {
  const { id } = useParams()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
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
          status_semester: formData.id_semester === '01' ? 'Ganjil' : 'Genap',
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
      // Menampilkan Sweet Alert saat berhasil menambah data
      Swal.fire({
        title: 'Berhasil',
        text: `Data semester berhasil diubah.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mengarahkan user ke kelola akademik semester
          window.location.href = '/kelola/akademik/semester'
          console.log('Semester updated successfully:', response.data)
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
  console.log(formData)
  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Update Semester</CCardHeader>
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
                    value={formData.tahun_ajar}
                    onChange={(e) => setFormData({ ...formData, tahun_ajar: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
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
              <CCol md={6}>
                <CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="status">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        onChange={(selectedOption) => {
                          setFormData({ ...formData, status_semester: selectedOption.value })
                        }}
                        id="status"
                        placeholder="Status"
                        required
                        options={optionsStatus}
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

export default FormUpdateSemester
