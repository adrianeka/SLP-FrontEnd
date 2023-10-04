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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'

const usersData = [
  { id: 0, nama: 'Adrian', nim: '221511000', sakit: '3', izin: '0' },
  { id: 1, nama: 'Reno', nim: '221511000', sakit: '4', izin: '8' },
  { id: 2, nama: 'Mahesya', nim: '221511000', sakit: '0', izin: '2' },
  { id: 3, nama: 'Taufik', nim: '221511000', sakit: '1', izin: '2' },
  { id: 4, nama: 'Rizki', nim: '221511000', sakit: '2', izin: '1' },
  { id: 5, nama: 'Tendy', nim: '221511000', sakit: '1', izin: '0' },
]

const MahasiswaTable = () => {
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Mahasiswa</CCardHeader>
            <CCardBody>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Mahasiswa</CTableHeaderCell>
                    <CTableHeaderCell>NIM</CTableHeaderCell>
                    <CTableHeaderCell>Total Sakit</CTableHeaderCell>
                    <CTableHeaderCell>Total Izin</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
                      <CTableDataCell>{user.sakit}</CTableDataCell>
                      <CTableDataCell>{user.izin}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default MahasiswaTable
