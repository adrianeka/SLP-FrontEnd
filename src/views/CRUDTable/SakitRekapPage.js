import React from 'react'
import {
  CCard,
  CCardBody,
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
} from '@coreui/react'

import usersData from './../CRUDTable/TabelMahasiswa' // Sesuaikan dengan path yang sesuai

const SakitRekapPage = () => {
  // Pengecekan apakah mahasiswaTable adalah sebuah array
  if (!Array.isArray(usersData)) {
    console.error('mahasiswaTable is not an array')
    return null // Tampilkan pesan kesalahan atau tindakan yang sesuai
  }

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Rekapitulasi Mahasiswa dengan Izin</CCardHeader>
            <CCardBody>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Mahasiswa</CTableHeaderCell>
                    <CTableHeaderCell>NIM</CTableHeaderCell>
                    <CTableHeaderCell>Total Sakit</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
                      <CTableDataCell>{user.sakit}</CTableDataCell>
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

export default SakitRekapPage
