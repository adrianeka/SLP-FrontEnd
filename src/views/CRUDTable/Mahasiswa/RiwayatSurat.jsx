import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

const RiwayatSurat = () => {
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchText, setSearchText] = useState('') // State untuk nilai pencarian
  const [perizinanData, setPerizinanData] = useState([])

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/mahasiswa/perizinan'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setPerizinanData(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }
  const [modalExport, setModalExport] = useState(false)
  const handleExportModal = () => {
    setModalExport(true)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const filteredData = perizinanData.filter((user) => {
    return (
      (selectedStatus === 'All' || user.status === selectedStatus) && // Filter berdasarkan status
      (searchText === '' || // Filter berdasarkan pencarian
        user.id_perizinan.toLowerCase().includes(searchText.toLowerCase()) ||
        user.tanggal_awal.toLowerCase().includes(searchText.toLowerCase()) ||
        user.tanggal_akhir.toLowerCase().includes(searchText.toLowerCase()) ||
        user.jenis.toLowerCase().includes(searchText.toLowerCase()) ||
        user.keterangan.toLowerCase().includes(searchText.toLowerCase()) ||
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
              <CNav variant="tabs" className="my-3 mx-3">
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
                      handleStatusChange('Menunggu Verifikasi')
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
                      handleStatusChange('Diverifikasi')
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
                      handleStatusChange('Ditolak')
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
                    <CTableHeaderCell>Jenis Surat</CTableHeaderCell>
                    <CTableHeaderCell>Alasan</CTableHeaderCell>
                    <CTableHeaderCell>Bukti Surat</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Awal</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Akhir</CTableHeaderCell>
                    <CTableHeaderCell>status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((user) => (
                    <CTableRow key={user.id} className="text-center">
                      <CTableDataCell>{user.jenis}</CTableDataCell>
                      <CTableDataCell>{user.keterangan}</CTableDataCell>
                      <CTableDataCell>
                        <CCol xs={3}>
                          <CButton variant="outline" color="success" onClick={handleExportModal}>
                            Lihat
                          </CButton>
                        </CCol>

                        <CModal
                          size="xl"
                          backdrop="static"
                          visible={modalExport}
                          onClose={() => setModalExport(false)}
                          aria-labelledby="ExportModalLabel"
                        >
                          <CModalHeader>
                            <CModalTitle id="ExportModalLabel">Bukti Surat</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <iframe
                              src={`http://localhost:8080/api/mahasiswa/perizinan/surat/${user.surat}`}
                              width="100%"
                              height="600px"
                            ></iframe>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setModalExport(false)}>
                              Close
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CTableDataCell>
                      <CTableDataCell>{user.tanggal_awal}</CTableDataCell>
                      <CTableDataCell>{user.tanggal_akhir}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge
                          color={
                            user.status === 'Menunggu Verifikasi'
                              ? 'warning'
                              : user.status === 'Diverifikasi'
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
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default RiwayatSurat
