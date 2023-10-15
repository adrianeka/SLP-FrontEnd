import React, { useState } from 'react'
import * as XLSX from 'xlsx'
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
  const [modalImport, setModalImport] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk pencarian
  const [selectedData, setSelectedData] = useState(null) //State untuk id dari tabel
  const [data, setData] = useState([])
  const [importMessage, setImportMessage] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  const handleDeleteModal = (data) => {
    // Menampilkan modal saat tombol hapus diklik
    setSelectedData(data)
    setModalDelete(true)
  }

  const handleUpdateModal = (data) => {
    // Menampilkan modal saat tombol ubah diklik
    setSelectedData(data)
    setModalUpdate(true)
  }

  const handleImportModal = () => {
    // Menampilkan modal impor
    setModalImport(true)
  }

  const handleSearchChange = (e) => {
    // Menangani perubahan pencarian saat diketik
    setSearchText(e.target.value)
  }

  const handleFileUpload = (e) => {
    if (e.target.files.length === 0) {
      // Tidak ada file yang dipilih, keluar dari fungsi
      return
    }

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadstart = () => {
      // Proses impor dimulai
      setIsImporting(true)
    }

    reader.onload = (event) => {
      const binaryData = event.target.result
      try {
        const workbook = XLSX.read(binaryData, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        if (sheetName) {
          const sheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
          setData(jsonData)

          // Set pesan import berhasil
          setImportMessage('Import berhasil!')
          console.log(jsonData)
        } else {
          // Tidak ada sheet yang valid dalam file
          setImportMessage('File Excel tidak valid.')
        }
      } catch (error) {
        // Terjadi kesalahan saat membaca file Excel
        setImportMessage('Terjadi kesalahan saat membaca file Excel.')
      } finally {
        // Proses impor selesai
        setIsImporting(false)
      }
    }

    reader.readAsBinaryString(file)
  }
  const filteredData = data
  // const filteredData = usersData.filter((user) => {
  //   // Variabel untuk menampung data yang difilter
  //   return (
  //     searchText === '' || // Filter berdasarkan pencarian
  //     user.nama.toLowerCase().includes(searchText.toLowerCase()) ||
  //     user.Kelas.toLowerCase().includes(searchText.toLowerCase()) ||
  //     user.nim.toLowerCase().includes(searchText.toLowerCase()) ||
  //     user.prodi.toLowerCase().includes(searchText.toLowerCase())
  //   )
  // })
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
                    <CRow>
                      <CCol xs={2}>
                        <Link to="/kelola/mahasiswa/tambah">
                          <CButton variant="outline">
                            <CIcon icon={cilUserPlus} className="mx-2" />
                            Create
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={3}>
                        {/* <CButton variant="outline" color="success" onClick={handleImportModal}> */}
                        <CForm>
                        <CButton variant="outline" color="success">
                          <CIcon icon={cilFile} className="mx-2" />
                          <CFormInput
                            type="file"
                            accept=".xlsx, .xls" onChange={handleFileUpload}
                           />
                        </CButton>
                        </CForm>
                      </CCol>
                    </CRow>
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
      {/* Modal Import */}
      <CModal
        backdrop="static"
        visible={modalImport}
        onClose={() => setModalImport(false)}
        aria-labelledby="ImportModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="ImportModal">Import Excel</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Pilih file Excel untuk diimpor:</p>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          {!isImporting && importMessage && (
            <div className="text-success mt-2">{importMessage}</div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalImport(false)}>
            Tutup
          </CButton>
          <CButton color="success" onClick={(e) => handleFileUpload(e)}>
            Import
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataMhs
