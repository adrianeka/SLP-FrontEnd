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
import { cilShortText, cilUser, cilLockLocked } from '@coreui/icons'

const FormCreateMatkul = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [matkulData, setMatkulData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/detailMatkul'
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        const formattedData = response.data.map((matkul) => ({
          value: matkul.id_detailMatkul,
          label: `${matkul.mataKuliah.nama_matakuliah} (${matkul.tipe})`,
        }))
        setMatkulData(formattedData)
      })
      .catch((error) => {
        console.error('Error fetching Matkul data:', error)
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

  const [dosenData, setDosenData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/dosen' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        const formattedData = response.data.map((data_dosen) => ({
          value: data_dosen.kode_dosen,
          label: `${data_dosen.nama_dosen}`,
        }))
        setDosenData(formattedData)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Kelas data:', error)
      })
  }, [])

  const [formData, setFormData] = useState({
    hari: '',
    id_semester: '',
    matakuliah: [], // Inisialisasikan sebagai array kosong
    kelas_id: '',
    dosen: [],
  })

  const [dataHari, setDataHari] = useState([])

  const Hari = [
    {
      id_hari: 'senin',
      nama_hari: 'Senin',
    },
    {
      id_hari: 'selasa',
      nama_hari: 'Selasa',
    },
    {
      id_hari: 'rabu',
      nama_hari: 'Rabu',
    },
    {
      id_hari: 'kamis',
      nama_hari: 'Kamis',
    },
    {
      id_hari: 'jumat',
      nama_hari: `Jum'at`,
    },
  ]

  useEffect(() => {
    setDataHari(Hari)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const apiUrl = 'http://localhost:8080/api/admins/jadwal/create'

    const newJadwalMataKuliah = {
      hari: formData.hari,
      kelas_id: formData.kelas_id,
      matakuliah: formData.matakuliah.map((option) => option.value), // Mengambil value dari pilihan matakuliah
      dosen: formData.dosen.map((option) => option.value), // Mengambil value dari pilihan dosen
      id_semester: formData.id_semester,
    }

    try {
      const response = await axios.post(apiUrl, newJadwalMataKuliah, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Ganti menjadi 'application/json'
        },
      })
      console.log('Jadwal Mata Kuliah created successfully:', response.data)
    } catch (error) {
      console.error('Error creating Jadwal Mata Kuliah:', error)
    }
  }

  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Tambah Mata Kuliah</CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CRow>
                  <CInputGroup>
                    <CInputGroupText id="Dosen Wali">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        options={matkulData}
                        placeholder="Matakuliah"
                        name="matakuliah"
                        required
                        value={formData.matakuliah}
                        onChange={(selectedOptions) =>
                          setFormData({ ...formData, matakuliah: selectedOptions })
                        }
                      />
                    </CCol>
                  </CInputGroup>
                </CRow>
              </CCol>
              <CCol md={6}>
                <CRow>
                  <CInputGroup>
                    <CInputGroupText id="Dosen Wali">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CCol>
                      <Select
                        isMulti
                        required
                        options={dosenData}
                        placeholder="Dosen Pengampu"
                        name="dosenpengampu"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={formData.dosen}
                        onChange={(selectedOptions) =>
                          setFormData({ ...formData, dosen: selectedOptions })
                        }
                      />
                    </CCol>
                  </CInputGroup>
                </CRow>
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="kelas">
                    <CIcon icon={cilShortText} />
                  </CInputGroupText>
                  <CCol>
                    <Select
                      onChange={(selectedOption) => {
                        setFormData({ ...formData, kelas_id: selectedOption.value })
                      }}
                      id="Kelas"
                      placeholder="Kelas"
                      required
                      options={kelasData.map((data) => ({
                        value: data.id_kelas,
                        label: data.nama_kelas,
                      }))}
                    />
                  </CCol>
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
                        setFormData({ ...formData, id_semester: selectedOption.value })
                      }}
                      id="semester"
                      placeholder="Semester"
                      required
                      options={semesterData.map((data) => ({
                        value: data.id_semester,
                        label: data.nama_semester,
                      }))}
                    />
                  </CCol>
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="hari">
                    <CIcon icon={cilShortText} />
                  </CInputGroupText>
                  <CCol>
                    <Select
                      onChange={(selectedOption) => {
                        setFormData({ ...formData, hari: selectedOption.value })
                      }}
                      id="hari"
                      placeholder="Hari"
                      required
                      options={dataHari.map((data) => ({
                        value: data.id_hari,
                        label: data.nama_hari,
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
              <CCol md={1}>
                <Link to={`/kelola/akademik/jadwal`}>
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
                )}
              </CCol>
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
    </>
  )
}

export default FormCreateMatkul
