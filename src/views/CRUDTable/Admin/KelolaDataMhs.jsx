import React, { useState, useEffect } from 'react'
import { read, utils } from 'xlsx'
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
import { cilPen, cilTrash, cilSearch, cilFile, cilUserPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'

const KelolaDataMhs = () => {
  const [importData, setImport] = useState([])
  const [rawData, setRaw] = useState([])
  const [modalImport, setModalImport] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedData, setSelectedData] = useState(null)

  const handleImport = ($event) => {
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
    const importedData = rawData.map((data, index) => ({
      id: index,
      nim: data['Nim'],
      nama: data['Nama Lengkap'],
      kelas: data['Kelas'],
      prodi: data['Prodi'],
    }))
    setImport(importedData)
    setModalImport(false)
  }

  const handleDeleteModal = (data) => {
    setSelectedData(data)
    setModalDelete(true)
  }

  const handleUpdateModal = (data) => {
    setSelectedData(data)
    setModalUpdate(true)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const filteredData = importData.filter((user) => {
    return (
      searchText === '' ||
      user.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      user.kelas.toLowerCase().includes(searchText.toLowerCase()) ||
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
                      <CTableDataCell>{user.kelas}</CTableDataCell>
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
      <CModal backdrop="static" visible={modalImport} onClose={() => setModalImport(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Import From Excel</CModalTitle>
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
      <CModal backdrop="static" visible={modalDelete} onClose={() => setModalDelete(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
        </CModalFooter>
      </CModal>
      <CModal backdrop="static" visible={modalUpdate} onClose={() => setModalUpdate(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Update</CModalTitle>
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
