import React, { useState, useEffect } from 'react'
import { read, utils, writeFile } from 'xlsx'
import axios from 'axios'
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
  cilFile,
  cilUserPlus,
} from '@coreui/icons'
import { Link } from 'react-router-dom'

const usersData = [
  {
    id: 0,
    nama: 'Adrian',
    kelas: '2B',
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
    kelas: '2B',
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
  const [importData, setImport] = useState([]) // State untuk menampung hasil import
  const [rawData, setRaw] = useState([]) // State untuk menampung data dari excel sebelum import
  const [modalImport, setModalImport] = useState(false) //State untuk modal import
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [mahasiswaData, setMahasiswaData] = useState([])

  const handleImport = ($event) => {
    //Handle Import
    const files = $event.target.files
    if (files) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const wb = read(event.target.result)
        const sheets = wb.SheetNames

        if (sheets) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
          setRaw(rows)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleImportModal = async (e) => {
    e.preventDefault()
    //Handle saat button import di klik
    // setImport(rawData) // Menampung hasil import
    const importedData = rawData.map((data) => ({
      nim: data['Nim'],
      nama: data['Nama Lengkap'],
      username: data['Username'],
      password: data['Password'],
      no_telp: data['No Telepon'],
      no_telp_orang_tua: data['No Telepon Orang Tua'],
      prodiId: data['Prodi'],
      kelasId: data['Kelas'],
      angkatanId: data['Angkatan'],
    }))
    setImport(importedData)
    setModalImport(false) //Menutup modal
  }

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

  const filteredData = importData.filter((user) => {
    //Var untuk menampung data baru
    return (
      searchText === '' || // Filter berdasarkan pencarian
      user.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      user.kelas.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nim.toLowerCase().includes(searchText.toLowerCase()) ||
      user.prodiId.toLowerCase().includes(searchText.toLowerCase())
    )
  })
  console.log(importData)
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Mahasiswa</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/mahasiswa/tambah">
                          <CButton variant="outline">
                            <CIcon icon={cilUserPlus} className="mx-2" />
                            Create
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol md={3}>
                        <CButton
                          variant="outline"
                          color="success"
                          onClick={() => setModalImport(true)}
                        >
                          <CIcon icon={cilFile} className="mx-2" />
                          Import
                        </CButton>
                      </CCol>
                      <CCol xs={6}></CCol>
                    </CRow>
                  </CCol>
                  <CCol md={4} xs={6}>
                    <CInputGroup className="search-input">
                      <CFormInput
                        placeholder="Search"
                        value={searchText} // Mengikat nilai pencarian ke state searchText
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
                    <CTableHeaderCell>kelas</CTableHeaderCell>
                    <CTableHeaderCell>Nim</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>
                        {user.kelas === 1
                          ? 'A'
                          : user.kelas === 2
                          ? 'B'
                          : user.kelas === 3
                          ? 'C'
                          : ''}
                      </CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
                      <CTableDataCell>
                        {user.prodi === 1 ? 'D3' : user.prodi === 2 ? 'D4' : ''}
                      </CTableDataCell>

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
      {/* Modal Import */}
      <CModal
        backdrop="static"
        visible={modalImport}
        onClose={() => setModalImport(false)}
        aria-labelledby="ImportModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="ImportModal">Import From Excel</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput type="file" accept=".xlsx" onChange={handleImport} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalImport(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleImportModal}>
            Import
          </CButton>
        </CModalFooter>
      </CModal>
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
