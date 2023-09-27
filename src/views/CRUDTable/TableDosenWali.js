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
} from '@coreui/react'

const usersData = [
  { id: 0, nama: 'Adrian', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 1, nama: 'Reno', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 2, nama: 'Mahesya', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 3, nama: 'Taufik', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 4, nama: 'Rizki', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 5, nama: 'Tendy', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
]

const TableDosenWali = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Dosen Wali</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CInputGroup>
                  <CFormInput placeholder="Search" />
                  <CButton color="secondary">Cari</CButton>
                </CInputGroup>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Dosen</CTableHeaderCell>
                    <CTableHeaderCell>Kelas</CTableHeaderCell>
                    <CTableHeaderCell>Nim</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.Kelas}</CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
                      <CTableDataCell>{user.prodi}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" variant="outline" className="ms-2">
                          Update
                        </CButton>
                        <CButton
                          color="danger"
                          variant="outline"
                          className="ms-2"
                          onClick={() => setVisible(!visible)}
                        >
                          Delete
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
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="DeleteModal">Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin delete?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default TableDosenWali
