import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Select from 'react-select'
import { cilCalendar, cilCircle, cilClock, cilShortText } from '@coreui/icons'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const FormSakitMhs = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [userRole, setUserRole] = useState('')
  const [matkulData, setMatkulData] = useState([])
  const myValue = localStorage.getItem('mahasiswa')
  const dosenwaliObject = JSON.parse(myValue)
  const id_mahasiswa = dosenwaliObject.id
  const { id } = useParams()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisibility = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    setIsFormVisible(!isFormVisible)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('mahasiswa'))
    if (!user) {
      window.location.href = '/login'
    } else {
      setUserRole(user.id)
    }
  }, [])

  const [semesterData, setSemesterData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/mahasiswa/semester/active' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setSemesterData(response.data[0])
      })
      .catch((error) => {
        console.error('Error fetching semester data:', error)
      })
  }, [])

  const [mahasiswaData, setMahasiswaData] = useState([])
  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/mahasiswa/${id_mahasiswa}` // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setMahasiswaData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching semester data:', error)
      })
  }, [])

  const [formData, setFormData] = useState({
    keterangan: '',
    tanggal_awal: '',
    tanggal_akhir: '',
    matakuliah: [],
    file: '',
  })

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const apiUrl = 'http://localhost:8080/api/mahasiswa/perizinan'

    const newPerizinan = new FormData()
    newPerizinan.append('file', selectedFile)
    newPerizinan.append('keterangan', formData.keterangan)
    newPerizinan.append('tanggal_awal', formData.tanggal_awal)
    newPerizinan.append('tanggal_akhir', formData.tanggal_akhir)
    newPerizinan.append('jenis', 'Sakit')
    newPerizinan.append('nim', userRole)
    newPerizinan.append('status', 'Menunggu Verifikasi')
    newPerizinan.append(
      'matakuliah',
      formData.matakuliah.map((option) => option.value),
    )
    newPerizinan.append('id_semester', semesterData.id_semester)
    try {
      const response = await axios.post(apiUrl, newPerizinan, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      window.location.href = '/riwayat'
      console.log('Perizinan created successfully:', response.data)
    } catch (error) {
      console.error('Error creating Perizinan:', error)
    }
  }
  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/mahasiswa/list/matkul/mahasiswa/${semesterData.id_semester}/${mahasiswaData.prodi_id}/${mahasiswaData.kelas_id}/${mahasiswaData.angkatan_id}`

    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        const formattedData = response.data.map((matkul) => ({
          value: matkul.detailMatkul.id_detailMatkul,
          label: `${matkul.detailMatkul.mataKuliah.nama_matakuliah} (${matkul.detailMatkul.tipe})`,
        }))
        setMatkulData(formattedData)
      })
      .catch((error) => {
        console.error('Error fetching Matkul data:', error)
      })
  }, [
    semesterData.id_semester,
    mahasiswaData.prodi_id,
    mahasiswaData.kelas_id,
    mahasiswaData.angkatan_id,
  ])

  const handleSubmitDraft = async (e) => {
    e.preventDefault()
    const apiUrl = 'http://localhost:8080/api/mahasiswa/perizinan/draft'

    const newPerizinan = new FormData()
    newPerizinan.append('file', selectedFile)
    newPerizinan.append('keterangan', formData.keterangan)
    newPerizinan.append('tanggal_awal', formData.tanggal_awal)
    newPerizinan.append('tanggal_akhir', formData.tanggal_akhir)
    newPerizinan.append('jenis', 'Sakit')
    newPerizinan.append('nim', userRole)
    newPerizinan.append('status', 'Draft')

    // Check if formData.matakuliah is an array before mapping it
    if (Array.isArray(formData.matakuliah)) {
      newPerizinan.append(
        'matakuliah',
        formData.matakuliah.map((option) => option.value),
      )
    } else {
      newPerizinan.append('matakuliah', [])
    }

    newPerizinan.append('id_semester', semesterData.id_semester)
    try {
      const response = await axios.post(apiUrl, newPerizinan, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      window.location.href = '/drafts'
      console.log('Perizinan created successfully:', response.data)
    } catch (error) {
      console.error('Error creating Perizinan:', error)
    }
  }

  useEffect(() => {
    // Mengambil data Dosen dari API berdasarkan ID saat komponen dimuat
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/api/mahasiswa/perizinan/${id}`
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        })
        const PerizinanData = response.data // Data Dosen yang diambil dari API
        console.log(response.data)
        setFormData({
          keterangan: PerizinanData.keterangan,
          tanggal_awal: PerizinanData.tanggal_awal,
          tanggal_akhir: PerizinanData.tanggal_akhir,
          matakuliah: PerizinanData.detailPerizinans.map((item) => ({
            value: item.detailMatkul.id_detailMatkul,
            label: `${item.detailMatkul.mataKuliah.nama_matakuliah} (${item.detailMatkul.tipe})`,
          })),
          file: 'http://localhost:8080/api/mahasiswa/perizinan/surat/' + PerizinanData.surat,
        })
      } catch (error) {
        console.error('Error fetching Dosen data:', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <>
      <CCard>
        <CCardHeader>Form Update Surat Perizinan Mahasiswa</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="alasan">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormTextarea
                  name="keterangan"
                  placeholder="Keterangan"
                  floatingLabel="Keterangan"
                  aria-describedby="keterangan"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tanggal-awal">
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  name="tanggal_awal"
                  type="date"
                  placeholder="Tanggal Awal"
                  floatingLabel="Tanggal Awal"
                  aria-describedby="tanggal-awal"
                  value={formData.tanggal_awal}
                  onChange={(e) => {
                    setFormData({ ...formData, tanggal_awal: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tanggal-akhir">
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  name="tanggal_akhir"
                  type="date"
                  placeholder="Tanggal Akhir"
                  floatingLabel="Tanggal Akhir"
                  aria-describedby="tanggal-akhir"
                  value={formData.tanggal_akhir}
                  onChange={(e) => setFormData({ ...formData, tanggal_akhir: e.target.value })}
                />
              </CInputGroup>
            </CCol>

            <CCol xs={12}>
              <CRow>
                <CInputGroup>
                  <CInputGroupText id="Dosen Wali">
                    <CIcon icon={cilShortText} />
                  </CInputGroupText>
                  <CCol>
                    <Select
                      isMulti
                      options={matkulData}
                      placeholder="Matakuliah"
                      name="matakuliah"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={formData.matakuliah}
                      onChange={(selectedOptions) =>
                        setFormData({ ...formData, matakuliah: selectedOptions })
                      }
                    />
                  </CCol>
                </CInputGroup>
              </CRow>
            </CCol>
            <CCol xs={12}>
              <div className="file-input-section">
                {isFormVisible ? (
                  <div className="mb-3">
                    <label htmlFor="bukti" className="form-label">
                      Choose a file
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="bukti"
                      name="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </div>
                ) : (
                  <div className="file-download-section">
                    <CCard>
                      <CCardBody>
                        <a
                          href={formData.file}
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Download File
                        </a>
                      </CCardBody>
                    </CCard>
                  </div>
                )}
              </div>
              <button onClick={toggleFormVisibility} className="btn btn-secondary mt-2">
                {isFormVisible ? 'Cancel' : 'Change File'}
              </button>
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={9}></CCol>
            <CCol xs={2}>
              {' '}
              <CButton color="warning" variant="outline" type="submit" onClick={handleSubmitDraft}>
                Save Draft
              </CButton>
            </CCol>
            <CCol xs={1}>
              {' '}
              <CButton color="primary" variant="outline" type="submit" onClick={handleSubmit}>
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default FormSakitMhs
