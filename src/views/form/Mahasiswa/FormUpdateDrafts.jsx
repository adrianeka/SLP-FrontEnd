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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Select from 'react-select'
import { cilCalendar, cilFile, cilShortText } from '@coreui/icons'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const FormUpdateDrafts = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [userRole, setUserRole] = useState('')
  const [matkulData, setMatkulData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = `http://localhost:8080/api/mahasiswa/perizinan/list/draft/${id}`

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        const PerizinanData = response.data
        setSelectedFile(PerizinanData.surat)
        setFormData({
          keterangan: PerizinanData.keterangan,
          tanggal_awal: PerizinanData.tanggal_awal,
          tanggal_akhir: PerizinanData.tanggal_akhir,
          file: PerizinanData.surat,
          jenis: PerizinanData.jenis,
          status: PerizinanData.status,
        })
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem('admin')) ||
      JSON.parse(localStorage.getItem('mahasiswa')) ||
      JSON.parse(localStorage.getItem('dosenwali'))

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
        setSemesterData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching semester data:', error)
      })
  }, [])

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/mahasiswa/detail_matkul'

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

  const [formData, setFormData] = useState({
    keterangan: '',
    tanggal_awal: '',
    tanggal_akhir: '',
    matakuliah: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const apiUrl = `http://localhost:8080/api/mahasiswa/perizinan/update/${id}`

    const newPerizinan = new FormData()
    newPerizinan.append('file', selectedFile.name)
    newPerizinan.append('keterangan', formData.keterangan)
    newPerizinan.append('tanggal_awal', formData.tanggal_awal)
    newPerizinan.append('tanggal_akhir', formData.tanggal_akhir)
    newPerizinan.append('jenis', formData.jenis)
    newPerizinan.append('nim', userRole)
    newPerizinan.append('status', 'Menunggu Verifikasi')
    // Check if formData.matakuliah is an array before mapping it
    if (Array.isArray(formData.matakuliah)) {
      newPerizinan.append(
        'matakuliah',
        formData.matakuliah.map((option) => option.value),
      )
    } else {
      newPerizinan.append('matakuliah', [])
    }

    newPerizinan.append('id_semester', semesterData[0].id_semester)
    try {
      const response = await axios.put(apiUrl, newPerizinan, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // Menampilkan Sweet Alert saat berhasil mengubah data
      Swal.fire({
        title: 'Berhasil',
        text: `Data perizinan berhasil diubah`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // Mengarahkan user ke kelola mahasiswa
          window.location.href = '/drafts'
          console.log('Mahasiswa updated successfully:', response.data)
        }
      })
      console.log('Perizinan updated successfully:', response.data)
    } catch (error) {
      // console.error('Error updating Perizinan:', error)
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      setLoading(false)
      setMessage(resMessage)
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Update Surat Perizinan Sakit Mahasiswa</CCardHeader>
          <CCardBody>
            <CRow className="g-3">
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
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    margin: '0',
                    padding: '0',
                  }}
                >
                  <CRow>
                    <CInputGroup>
                      <CInputGroupText id="iconFile">
                        <CIcon icon={cilFile} />
                      </CInputGroupText>
                      <CCol xs={4} sm={7} md={9} className="ms-2 d-flex align-items-center">
                        {selectedFile
                          ? selectedFile.name
                            ? selectedFile.name
                            : formData.file
                          : 'No file selected'}
                      </CCol>
                      <CCol xs={4} sm={2} md={1} className="ms-auto">
                        <CInputGroupText id="basic-addon2" className="h-100">
                          <CButton
                            color="transparent"
                            onClick={() => document.getElementById('fileInput').click()}
                          >
                            Change
                          </CButton>
                        </CInputGroupText>
                      </CCol>
                    </CInputGroup>
                  </CRow>
                  <input
                    id="fileInput"
                    type="file"
                    name="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol xs={6} sm={8} md={10}></CCol>
              <CCol xs={3} sm={2} md={1}>
                {' '}
                <Link to={'/drafts'}>
                  <CButton color="secondary" variant="outline" type="submit">
                    Back
                  </CButton>
                </Link>
              </CCol>
              <CCol xs={3} sm={2} md={1}>
                {' '}
                {loading ? (
                  <CButton color="primary" variant="outline" type="submit" disabled>
                    <CSpinner color="info" size="sm" />
                  </CButton>
                ) : (
                  <CButton color="primary" variant="outline" type="submit">
                    Save
                  </CButton>
                )}
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

export default FormUpdateDrafts
