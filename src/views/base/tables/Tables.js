import React, { useState } from 'react'
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
  CButton,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const usersData = [
  { id: 0, nama: 'Adrian', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 1, nama: 'Reno', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 2, nama: 'Mahesya', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 3, nama: 'Taufik', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 4, nama: 'Rizki', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
  { id: 5, nama: 'Tendy', Kelas: '2B', nim: '221511000', prodi: 'D3 - Teknik Informatika' },
]

const Tables = () => {
  const [visible, setVisible] = useState(false)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Table Orang Tua / Wali</strong>
          </CCardHeader>
          <CCardBody>
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
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
