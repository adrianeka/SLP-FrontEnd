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

const FormCreateDataMengajar = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id_dosen: '',
    id_detailMatkul: '',
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

  const [detailMatkulData, setDetailMatkulData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/jadwal/matkul' // Replace with your actual API endpoint
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const apiUrl = 'http://localhost:8080/api/admins/create/mengajar'

    let isFormValid = true // Menyimpan status keseluruhan validasi

    // Validasi setiap field terpisah

    if (!formData.id_dosen) {
      setMessage('Dosen harus dipilih.')
      isFormValid = false
    }
    if (!formData.id_detailMatkul) {
      setMessage('Mata Kuliah harus dipilih.')
      isFormValid = false
    }
    if (!isFormValid) {
      setLoading(false)
      return
    }

    const newMengajar = {
      id_detail_matkul: formData.id_detailMatkul,
      id_dosen: formData.id_dosen,
    }
    try {
      const response = await axios.post(apiUrl, newMengajar, {
        withCredentials: true,
      })
      // alert('Data mahasiswa berhasil ditambahkan')
      // Menampilkan Sweet Alert saat berhasil menambah data
      Swal.fire({
        title: 'Berhasil',
        text: 'Data Mengajar berhasil ditambahkan',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mengarahkan user ke kelola mahasiswa
          window.location.href = '/kelola/akademik/mengajar'
          console.log('Mengajar created successfully:', response.data)
        }
      })
    } catch (error) {
      console.error('Error creating Mengajar:', error)
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
        <CForm className="" onSubmit={handleSubmit}>
          <CCardHeader>Form Tambah Data Mengajar</CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
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
                      Mata Kuliah
                    </option>
                    {detailMatkulData.map((detailMatkuls) => (
                      <option
                        key={detailMatkuls.angkatanMatkul_id}
                        value={detailMatkuls.angkatanMatkul_id}
                      >
                        {`${detailMatkuls.detailMatkul.mataKuliah.nama_matakuliah} (${detailMatkuls.detailMatkul.tipe}) (${detailMatkuls.prodi.nama_prodi}-${detailMatkuls.kela.nama_kelas})`}
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
          </CCardFooter>
        </CForm>
      </CCard>
    </>
  )
}

export default FormCreateDataMengajar
