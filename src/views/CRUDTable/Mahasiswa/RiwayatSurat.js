import React, { useState } from 'react'
import {
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButtonGroup,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilSearch, cilSend, cilTrash } from '@coreui/icons'

const usersData = [
  {
    id: 0,
    judulSurat: 'Judul',
    tanggal: '12 September 2022',
    jenis: 'Sakit',
    alasan: '221511000',
    surat: 'dadasd.jpg',
    status: 'On Going',
  },
  {
    id: 1,
    judulSurat: 'Judul',
    tanggal: '13 September 2022',
    jenis: 'Izin',
    alasan: '221511001',
    surat: 'dadasd.jpg',
    status: 'Rejected',
  },
  {
    id: 2,
    judulSurat: 'Judul',
    tanggal: '14 September 2022',
    jenis: 'Sakit',
    alasan: '221511002',
    surat: 'dadasd.jpg',
    status: 'Accepted',
  },
]

const RiwayatSurat = () => {
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchText, setSearchText] = useState('') // State untuk nilai pencarian

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const filteredData = usersData.filter((user) => {
    return (
      (selectedStatus === 'All' || user.status === selectedStatus) && // Filter berdasarkan status
      (searchText === '' || // Filter berdasarkan pencarian
        user.judulSurat.toLowerCase().includes(searchText.toLowerCase()) ||
        user.tanggal.toLowerCase().includes(searchText.toLowerCase()) ||
        user.jenis.toLowerCase().includes(searchText.toLowerCase()) ||
        user.alasan.toLowerCase().includes(searchText.toLowerCase()) ||
        user.surat.toLowerCase().includes(searchText.toLowerCase()) ||
        user.status.toLowerCase().includes(searchText.toLowerCase()))
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Riwayat Surat Perizinan Mahasiswa</CCardHeader>
            <CCardBody>
              <CNav variant="tabs" className="my-3">
                <CNavItem>
                  <CButton
                    variant="outline"
                    color="primary"
                    onClick={() => {
                      handleStatusChange('All')
                    }}
                  >
                    All
                  </CButton>
                </CNavItem>
                <CNavItem>
                  <CButton
                    variant="outline"
                    color="primary"
                    onClick={() => {
                      handleStatusChange('On Going')
                    }}
                  >
                    On Going
                  </CButton>
                </CNavItem>
                <CNavItem>
                  <CButton
                    variant="outline"
                    color="primary"
                    onClick={() => {
                      handleStatusChange('Accepted')
                    }}
                  >
                    Accepted
                  </CButton>
                </CNavItem>
                <CNavItem>
                  <CButton
                    variant="outline"
                    color="primary"
                    onClick={() => {
                      handleStatusChange('Rejected')
                    }}
                  >
                    Rejected
                  </CButton>
                </CNavItem>
              </CNav>
              <CForm className="mb-3">
                <CRow>
                  <CCol xs={8}></CCol>
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
                  <CTableRow className="text-center">
                    <CTableHeaderCell>Nama Surat</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Surat</CTableHeaderCell>
                    <CTableHeaderCell>Alasan</CTableHeaderCell>
                    <CTableHeaderCell>Bukti Surat</CTableHeaderCell>
                    <CTableHeaderCell>status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((user) => (
                    <CTableRow key={user.id} className="text-center">
                      <CTableDataCell>Judul Surat</CTableDataCell>
                      <CTableDataCell>{user.tanggal}</CTableDataCell>
                      <CTableDataCell>{user.jenis}</CTableDataCell>
                      <CTableDataCell>{user.alasan}</CTableDataCell>
                      <CTableDataCell>{user.surat}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge
                          color={
                            user.status === 'On Going'
                              ? 'warning'
                              : user.status === 'Accepted'
                              ? 'success'
                              : 'danger'
                          }
                        >
                          {user.status}
                        </CBadge>
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
    </div>
  )
}

export default RiwayatSurat
