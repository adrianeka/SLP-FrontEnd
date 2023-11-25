import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
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

const FormUpdateMatkul = () => {
  const { id } = useParams() // Ini hanya akan menghasilkan satu nilai (123-456)

  // Anda perlu memisahkan dua ID dari hasil di atas
  const [id_detMatkul, id_matkul] = id.split('-')

  console.log(id_detMatkul) // Mengambil nilai id_detMatkul dari URL
  console.log(id_matkul)

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

  useEffect(() => {
    // Mengambil data Dosen dari API berdasarkan ID saat komponen dimuat
    const fetchData = async () => {
      try {
        const apiUrldetMatkul = `http://localhost:8080/api/admins/detailMatkul/${id_detMatkul}`
        const apiUrlMatkul = `http://localhost:8080/api/admins/matkul/${id_matkul}`
        const responsedetMatkul = await axios.get(apiUrldetMatkul, {
          withCredentials: true,
        })
        const responsematkul = await axios.get(apiUrlMatkul, {
          withCredentials: true,
        })
        const detMataKuliah = responsedetMatkul.data // Data Dosen yang diambil dari API
        const MataKuliah = responsematkul.data
        setFormData({
          id_mataKuliah: detMataKuliah.matkul_id,
          sks: detMataKuliah.sks,
          tipe: detMataKuliah.tipe,
          prodi_id: detMataKuliah.prodi_id,
          metkul_id: detMataKuliah.matkul_id,
          nama_mataKuliah: MataKuliah.nama_matakuliah,
        })
      } catch (error) {
        console.error('Error fetching Dosen data:', error)
      }
    }

    fetchData()
  }, [id_detMatkul, id_matkul])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const apiUrl_detailMatkul = `http://localhost:8080/api/admins/detailMatkul/update/${id_detMatkul}`
    const apiUrl_Matkul = `http://localhost:8080/api/admins/matkul/update/${id_matkul}`

    const updateDetailMatkul = {
      matkul_id: formData.id_mataKuliah,
      sks: formData.sks,
      tipe: formData.tipe,
      prodi_id: formData.id_prodi,
      id_detailMatkul: id_detMatkul,
    }

    const updateMatkul = {
      id_matakuliah: formData.id_mataKuliah,
      nama_matakuliah: formData.nama_mataKuliah,
    }

    console.log(updateMatkul)
    console.log(updateDetailMatkul)
    try {
      // Lakukan permintaan kedua
      const responseMatkul = await axios.put(apiUrl_Matkul, updateMatkul, {
        withCredentials: true,
      })
      console.log('Mata Kuliah created successfully:', responseMatkul.data)

      // Lakukan permintaan pertama
      const responseDetailMatkul = await axios.put(apiUrl_detailMatkul, updateDetailMatkul, {
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
        <CCardHeader>Form Update Mata Kuliah</CCardHeader>
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
                  value={formData.tipe || ''} // Set the value to an empty string if formData.tipe is null
                  onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                >
                  {formData.tipe ? null : <option hidden>Tipe MataKuliah</option>}
                  <option value="Teori">Teori</option>
                  <option value="Praktek">Praktek</option>
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
                  id="Prodi_matkul"
                  style={{ height: '100%' }}
                  value={formData.prodi_id} // Add this line
                  onChange={(e) => setFormData({ ...formData, prodi_id: e.target.value })}
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

export default FormUpdateMatkul
