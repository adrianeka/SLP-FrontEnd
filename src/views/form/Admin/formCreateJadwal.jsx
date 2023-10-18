import React from 'react'
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

const FormUpdateJadwal = () => {
  const [formData, setFormData] = useState({
    id_jadwal: '',
    nama_mata_kuliah: '',
    hari: '',
    semester_id: '',
    detailMatkul_id: '',
    kelas_id: '',
    prodi_id: '',
  })
}

const [mataKuliahData, setMataKuliahData] = useState([])
useEffect(() => {
  const apiUrl = 'http://localhost:8080/api/admins/matkul' // Replace with your actual API endpoint
  axios
    .get(apiUrl, { withCredentials: true })
    .then((response) => {
      setMataKuliahData(response.data)
      console.log(response.data) // Assuming your response data is an array of objects with value and label properties
    })
    .catch((error) => {
      console.error('Error fetching Mata Kuliah data:', error)
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

  const apiUrl = 'http://localhost:8080/api/admins/jadwal/create'

  const newJadwalMataKuliah = {
    id_jadwal: formData.id_jadwal,
    nama_mata_kuliah: formData.nama_mata_kuliah,
    hari: formData.hari,
    semester_id: formData.semester_id,
    detailMatkul_id: formData.detailMatkul_id,
    kelas_id: formData.kelas_id,
    prodiData: formData.prodi_id,
  }
  try {
    const response = await axios.post(apiUrl, newJadwalMataKuliah, {
      withCredentials: true,
    })
    window.location.href = '/kelola/akademik/jadwal'
    console.log('Jadwal Mata Kuliah created successfully:', response.data)
  } catch (error) {
    console.error('Error creating Jadwal Mata Kuliah :', error)
  }
}

const FormCreateMatkul = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Form Tambah Mata Kuliah</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nama_mata_kuliah">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="nama_mata_kuliah"
                  placeholder="Nama Mata Kuliah"
                  floatingLabel="Nama Mata Kuliah"
                  aria-describedby="nama_mata_kuliah"
                  value={formData.nama_mata_kuliah}
                  onChange={(e) => setFormData({ ...formData, nama_mata_kuliah: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="hari">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="hari"
                  placeholder="Hari"
                  floatingLabel="Hari"
                  aria-describedby="hari"
                  value={formData.hari}
                  onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="semester">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="semester"
                  placeholder="Semester"
                  floatingLabel="Semester"
                  aria-describedby="semester"
                  value={formData.semester_id}
                  onChange={(e) => setFormData({ ...formData, semester_id: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="kelas">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="kelas"
                  placeholder="kelas"
                  floatingLabel="kelas"
                  aria-describedby="kelas"
                  value={formData.kelas_id}
                  onChange={(e) => setFormData({ ...formData, kelas_id: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CFormSelect id="Prodi" label="Program Studi">
                <option selected hidden>
                  Pilih..
                </option>
                <option value="D3">D3</option>
                <option value="D4">D4</option>
              </CFormSelect>
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={11}></CCol>
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

export default FormCreateMatkul
