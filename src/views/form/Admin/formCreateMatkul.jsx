import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Select from 'react-select'
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
    sks: 0,
    tipe: '',
    id_prodi: '',
    semester_matakuliah: '',
  })

  const [DataSemester, setDataSemester] = useState([])
  const Semester = [
    {
      id_semester: 1,
      nama_semester: '1',
    },
    {
      id_semester: 2,
      nama_semester: '2',
    },
    {
      id_semester: 3,
      nama_semester: '3',
    },
    {
      id_semester: 4,
      nama_semester: '4',
    },
    {
      id_semester: 5,
      nama_semester: '5',
    },
    {
      id_semester: 6,
      nama_semester: '6',
    },
    {
      id_semester: 7,
      nama_semester: '7',
    },
    {
      id_semester: 8,
      nama_semester: '8',
    },
  ]

  useEffect(() => {
    setDataSemester(Semester)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const apiUrl_detailMatkul = 'http://localhost:8080/api/admins/detailMatkul/create'
    const apiUrl_Matkul = 'http://localhost:8080/api/admins/matkul/create'

    try {
      const newMatkul = {
        id_matakuliah: formData.id_mataKuliah,
        nama_matakuliah: formData.nama_mataKuliah,
        semester_matakuliah: formData.semester_matakuliah,
      }

      console.log(newMatkul)

      // Lakukan permintaan kedua
      const responseMatkul = await axios.post(apiUrl_Matkul, newMatkul, {
        withCredentials: true,
      })
      console.log('Mata Kuliah created successfully:', responseMatkul.data)

      if (formData.sks_teori) {
        const newDetailMatkulTeori = {
          matkul_id: formData.id_mataKuliah,
          sks: formData.sks_teori,
          tipe: 'Teori',
          prodi_id: formData.id_prodi,
        }

        // Lakukan permintaan POST untuk Teori
        const responseDetailMatkulTeori = await axios.post(
          apiUrl_detailMatkul,
          newDetailMatkulTeori,
          {
            withCredentials: true,
          },
        )
        console.log(
          'Detail Mata Kuliah Teori created successfully:',
          responseDetailMatkulTeori.data,
        )
      }

      if (formData.sks_praktek) {
        const newDetailMatkulPraktek = {
          matkul_id: formData.id_mataKuliah,
          sks: formData.sks_praktek,
          tipe: 'Praktek',
          prodi_id: formData.id_prodi,
        }

        // Lakukan permintaan POST untuk Praktek
        const responseDetailMatkulPraktek = await axios.post(
          apiUrl_detailMatkul,
          newDetailMatkulPraktek,
          {
            withCredentials: true,
          },
        )
        console.log(
          'Detail Mata Kuliah Praktek created successfully:',
          responseDetailMatkulPraktek.data,
        )
      }

      Swal.fire({
        title: 'Berhasil',
        text: `Data Mata kuliah berhasil ditambahkan.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kelola/matakuliah/prodi'
          // console.log('Mata kuliah created successfully:', response.data)
        }
      })
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
                <CInputGroupText id="sks_teori">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="sks_teori"
                  placeholder="SKS Teori"
                  floatingLabel="SKS Teori"
                  aria-describedby="sks_teori"
                  value={formData.sks_teori}
                  onChange={(e) => setFormData({ ...formData, sks_teori: e.target.value })}
                />
              </CInputGroup>
            </CCol>

            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="sks_praktek">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="sks_praktek"
                  placeholder="SKS Praktek"
                  floatingLabel="SKS Praktek"
                  aria-describedby="sks_praktek"
                  value={formData.sks_praktek}
                  onChange={(e) => setFormData({ ...formData, sks_praktek: e.target.value })}
                />
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

            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="semester">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CCol>
                  <Select
                    onChange={(selectedOption) => {
                      setFormData({ ...formData, semester_matakuliah: selectedOption.value })
                    }}
                    id="hari"
                    placeholder="Semester"
                    required
                    options={Semester.map((data) => ({
                      value: data.id_semester,
                      label: data.nama_semester,
                    }))}
                  />
                </CCol>
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
