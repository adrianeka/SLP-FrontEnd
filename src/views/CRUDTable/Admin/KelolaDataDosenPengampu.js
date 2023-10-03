import React, { useState, useEffect } from 'react'
import axios from 'axios'
// const token = 'your-authentication-token'
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
import { useLocation } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroupText,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilSend,
  cilTrash,
  cilSearch,
  cilShortText,
  cilCalendar,
  cilClock,
  cilUserPlus,
  cilFile,
} from '@coreui/icons'
import { Link } from 'react-router-dom'

// const usersData = [
//   {
//     id: 0,
//     nama: 'Adrian',
//     kode: '221511000',
//     username: 'MrDr8',
//     password: 'MrDr8',
//     email: 'adrian',
//   },
//   {
//     id: 1,
//     nama: 'Reno',
//     kode: '221511000',
//     username: 'MrDr8',
//     password: 'MrDr8',
//     email: 'adrian',
//   },
// ]

const KelolaDataDosenPengampu = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [dosenData, setDosenData] = useState([])

  const [token, setToken] = useState('')
  const location = useLocation()

  useEffect(() => {
    // Mengambil token dari URL saat komponen dimuat pertama kali
    const searchParams = new URLSearchParams(location.search)
    const tokenFromURL = searchParams.get('token')

    if (tokenFromURL) {
      setToken(tokenFromURL)

      // Hapus token dari URL agar tidak muncul di tampilan
      window.history.replaceState({}, document.title, '/')
    }
  }, [location])

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/dosen'
    // Token authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Menggunakan token yang telah disimpan
      },
    }
    axios
      .get(apiUrl, config)
      .then((response) => {
        setDosenData(response.data) // Menyimpan data dosen ke dalam state
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [token])

  const handleDeleteModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data)
    setModalDelete(true) // Menampilkan modal
  }

  const handleUpdateModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data)
    setModalUpdate(true) // Menampilkan modal
  }

  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }

  const filteredData = dosenData.filter((user) => {
    return (
      searchText === '' ||
      user.kode_dosen.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nama_dosen.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.password.toLowerCase().includes(searchText.toLowerCase())
    )
  })
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Dosen</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol xs={8}>
                    <CRow>
                      <CCol xs={2}>
                        <Link to="/kelola/dosen/pengampu/tambah">
                          <CButton variant="outline">
                            <CIcon icon={cilUserPlus} className="mx-2" />
                            Create
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={3}>
                        <CButton variant="outline" color="success">
                          <CIcon icon={cilFile} className="mx-2" />
                          Import
                        </CButton>
                      </CCol>
                      <CCol xs={6}></CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CInputGroup className="search-input">
                      <CFormInput
                        placeholder="Search"
                        value={searchText} // Mengikat nilai pencarian ke state searchText
                        onChange={handleSearchChange}
                      />
                      <CInputGroupText id="tanggal-awal">
                        <CIcon icon={cilSearch} />
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Kode Dosen</CTableHeaderCell>
                    <CTableHeaderCell>Nama Dosen</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Password</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.kode}</CTableDataCell>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.password}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Ubah Data Mahasiswa"
                          onClick={() => handleUpdateModal(user)}
                        >
                          <CIcon icon={cilPen} />
                        </CButton>
                        <CButton
                          color="danger"
                          variant="outline"
                          className="ms-2"
                          title="Hapus Data Mahasiswa"
                          onClick={() => handleDeleteModal(user)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>Ini Footer</CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {/* Modal Delete */}
      <CModal
        backdrop="static"
        visible={modalDelete}
        onClose={() => setModalDelete(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="DeleteModal">Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
        </CModalFooter>
      </CModal>
      {/* Modal Update */}
      <CModal
        backdrop="static"
        visible={modalUpdate}
        onClose={() => setModalUpdate(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="UpdateModal">Update</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="judul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormTextarea
                  aria-describedby="judul"
                  value={selectedData ? selectedData.judulSurat : ''}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tanggal-awal">
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  type="date"
                  placeholder="Tanggal Awal"
                  floatingLabel="Tanggal Awal"
                  aria-describedby="tanggal-awal"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tanggal-akhir">
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  type="date"
                  placeholder="Tanggal Akhir"
                  floatingLabel="Tanggal Akhir"
                  aria-describedby="tanggal-akhir"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="jam-awal">
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Jam Kuliah Awal"
                  floatingLabel="Jam Kuliah Awal"
                  aria-describedby="jam-awal"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="jam-akhir">
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Jam Kuliah Akhir"
                  floatingLabel="Jam Kuliah Akhir"
                  aria-describedby="jam-akhir"
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="alasan">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormTextarea
                  placeholder="Keterangan"
                  floatingLabel="Keterangan"
                  aria-describedby="keterangan"
                  value={selectedData ? selectedData.alasan : ''}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
              <CFormSelect
                id="jenisKetidakhadiran"
                label="Jenis Ketidakhadiran"
                value={selectedData ? selectedData.jenis : ''}
              >
                <option selected hidden>
                  Pilih..
                </option>
                <option value="Sakit">Sakit</option>
                <option value="Izin">Izin</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="bukti"
                type="file"
                a
                aria-describedby="file"
                label="Upload Bukti Surat Perizinan"
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalUpdate(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataDosenPengampu
