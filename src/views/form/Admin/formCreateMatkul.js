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
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
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

const FormCreateMatkul = () => {
  const [formData, setFormData] = useState({
    id_mataKuliah: '',
    nama_mataKuliah: '',
    sks: '',
    tipe: '',
    id_prodi: '',
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const apiUrl_detailMatkul = 'http://localhost:8080/api/admins/detailMatkul/create'
    const apiUrl_Matkul = 'http://localhost:8080/api/admins/matkul/create'

    try {
      const newDetailMatkul = {
        matkul_id: formData.id_mataKuliah,
        sks: formData.sks,
        tipe: `${formData.tipe === '01' ? 'Teori' : 'Praktek'}`,
        prodi_id: formData.id_prodi,
      }

      const newMatkul = {
        id_matakuliah: formData.id_mataKuliah,
        nama_matakuliah: formData.nama_mataKuliah,
      }

      console.log(newMatkul)
      console.log(newDetailMatkul)

      // Lakukan permintaan kedua
      const responseMatkul = await axios.post(apiUrl_Matkul, newMatkul, {
        withCredentials: true,
      })
      console.log('Mata Kuliah created successfully:', responseMatkul.data)

      // Lakukan permintaan pertama
      const responseDetailMatkul = await axios.post(apiUrl_detailMatkul, newDetailMatkul, {
        withCredentials: true,
      })
      console.log('Detail Mata Kuliah created successfully:', responseDetailMatkul.data)

      window.location.href = '/kelola/akademik/matkul'
    } catch (error) {
      console.error('Error creating Mata kuliah:', error)
    }
  }

  return (
    <>
      <CCard>
        <CCardHeader>Form Tambah Mata Kuliah</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="kode_matkul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="kode_matkul"
                  placeholder="Kode Matkul"
                  floatingLabel="Kode Matkul"
                  aria-describedby="kode_matkul"
                  value={formData.id_mataKuliah}
                  onChange={(e) => setFormData({ ...formData, id_mataKuliah: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nama_matkul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="nama_matkul"
                  placeholder="Nama Matkul"
                  floatingLabel="Nama Matkul"
                  aria-describedby="nama_matkul"
                  value={formData.nama_mataKuliah}
                  onChange={(e) => setFormData({ ...formData, nama_mataKuliah: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="sks_matkul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="sks"
                  placeholder="SKS"
                  floatingLabel="SKS"
                  aria-describedby="sks_matkul"
                  value={formData.sks}
                  onChange={(e) => setFormData({ ...formData, sks: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}></CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tipe">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  id="tipe"
                  placeholder="Tipe Mata Kuliah"
                  onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                >
                  <option hidden>Tipe MataKuliah</option>
                  <option value="01">Teori</option>
                  <option value="02">Praktek</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>

            <CCol md={6}>
              <CInputGroup>
                <CInputGroupText id="Prodi MataKuliah">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect
                  name="prodi_id"
                  id="Prodi MataKuliah"
                  style={{ height: '100%' }}
                  value={formData.id_prodi} // Add this line
                  onChange={(e) => setFormData({ ...formData, id_prodi: e.target.value })}
                >
                  <option hidden>Prodi</option>
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
            <CCol xs={10}></CCol>
            <CCol xs={1}>
              <Link to={`/kelola/akademik/matkul`}>
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

export default FormCreateMatkul
