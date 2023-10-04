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

const usersData = [
  { id: 0, nama: 'Adrian', nim: '221511000', sakit: '3', izin: '0' },
  { id: 1, nama: 'Reno', nim: '221511000', sakit: '4', izin: '8' },
  { id: 2, nama: 'Mahesya', nim: '221511000', sakit: '0', izin: '2' },
  { id: 3, nama: 'Taufik', nim: '221511000', sakit: '1', izin: '2' },
  { id: 4, nama: 'Rizki', nim: '221511000', sakit: '2', izin: '1' },
  { id: 5, nama: 'Tendy', nim: '221511000', sakit: '1', izin: '0' },
]

const TableRekapIzin = () => {
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
                    <CTableHeaderCell>Total Izin</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
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

export default TableRekapIzin
