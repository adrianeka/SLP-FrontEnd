import React, { useState } from 'react'
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
} from '@coreui/icons'
import { Link } from 'react-router-dom'

const usersData = [
  {
    id: 0,
    nama: 'Adrian',
    Kelas: '2B',
    nim: '221511000',
    prodi: 'D3 - Teknik Informatika',
    username: 'MrDr8',
    password: 'MrDr8',
    email: 'adrian',
    noTelp: '012312',
    namaOrangTua: 'dsadas',
    noTelpOrangTua: '321',
  },
  {
    id: 1,
    nama: 'Reno',
    Kelas: '2B',
    nim: '221511000',
    prodi: 'D3 - Teknik Informatika',
    username: 'MrDr8',
    password: 'MrDr8',
    email: 'adrian',
    noTelp: '012312',
    namaOrangTua: 'dsadas',
    noTelpOrangTua: '321',
  },
]

const KelolaDataMhs = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table

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

  const filteredData = usersData.filter((user) => {
    //Var untuk menampung data baru
    return (
      searchText === '' || // Filter berdasarkan pencarian
      user.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      user.Kelas.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nim.toLowerCase().includes(searchText.toLowerCase()) ||
      user.prodi.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Mahasiswa</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol xs={8}>
                    <Link to="/kelola/mahasiswa/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilUserPlus} className="mx-2" />
                        Create
                      </CButton>
                    </Link>
                  </CCol>
                  <CCol xs={4}>
                    <CInputGroup className="search-input">
                      <CFormInput
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                      />
                      <CInputGroupText id="search-icon">
                        <CIcon icon={cilSearch} />
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Mahasiswa</CTableHeaderCell>
                    <CTableHeaderCell>Kelas</CTableHeaderCell>
                    <CTableHeaderCell>Nim</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.Kelas}</CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
                      <CTableDataCell>{user.prodi}</CTableDataCell>
                      <CTableDataCell>
                        <CCol>
                          <Link to="/kelola/mahasiswa/update">
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title="Ubah Data Mahasiswa"
                              onClick={() => handleUpdateModal(user)}
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                          </Link>
                          <CButton
                            color="danger"
                            variant="outline"
                            className="ms-2"
                            title="Hapus Data Mahasiswa"
                            onClick={() => handleDeleteModal(user)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
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
        aria-labelledby="DeleteModal"
      >
        <CModalHeader closeButton>
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
        aria-labelledby="UpdateModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="UpdateModal">Update</CModalTitle>
        </CModalHeader>
        <CModalBody>{/* Isi formulir pembaruan di sini */}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalUpdate(false)}>
            Close
          </CButton>
          <CButton color="primary">Update</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataMhs
