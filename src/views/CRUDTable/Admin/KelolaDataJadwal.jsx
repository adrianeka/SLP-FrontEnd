import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CButton,
  CCard,
  CCardBody,
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
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroupText,
  CFormTextarea,
  CFormSelect,
  CFormLabel,
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
    nama_matkul: 'Basis Data',
    hari: 'Selasa',
    Semester: 'Ganjil 2023/2024',
    Kelas: '2B',
    Prodi: 'D3',
  },
  {
    id: 1,
    nama_matkul: 'Aljabar Linier',
    hari: 'Selasa',
    Semester: 'Ganjil 2023/2024',
    Kelas: '2B',
    Prodi: 'D3',
  },
  {
    id: 2,
    nama_matkul: 'Dasar Dasar Pemrograman',
    hari: 'Rabu',
    Semester: 'Ganjil 2023/2024',
    Kelas: '1B',
    Prodi: 'D3',
  },
  {
    id: 3,
    nama_matkul: 'Pemrograman Beriorientasi Objek',
    hari: 'Kamis',
    Semester: 'Ganjil 2023/2024',
    Kelas: '2B',
    Prodi: 'D3',
  },
  {
    id: 4,
    nama_matkul: 'Pengantar Rekayasa Perangkat Lunak',
    hari: "Jum'at",
    Semester: 'Ganjil 2023/2024',
    Kelas: '2B',
    Prodi: 'D3',
  },
]

const KelolaDataJadwal = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table

  const handleDeleteModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data) //Mengambil data id saat ingin menghapus
    setModalDelete(true) // Menampilkan modal
  }

  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }
  const filteredData = usersData.filter((data) => {
    //Search filter data
    return (
      searchText === '' ||
      data.nama_matkul.toLowerCase().includes(searchText.toLowerCase()) ||
      data.hari.toLowerCase().includes(searchText.toLowerCase()) ||
      data.Semester.toLowerCase().includes(searchText.toLowerCase()) ||
      data.Kelas.toLowerCase().includes(searchText.toLowerCase()) ||
      data.Prodi.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Jadwal Mata kuliah</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/akademik/jadwal/tambah">
                          <CButton variant="outline">
                            <CIcon icon={cilUserPlus} className="mx-2" />
                            Create
                          </CButton>
                        </Link>
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
                      <CInputGroupText id="tanggal-awal">
                        <CIcon icon={cilSearch} />
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Mata Kuliah</CTableHeaderCell>
                    <CTableHeaderCell>Hari</CTableHeaderCell>
                    <CTableHeaderCell>Semester</CTableHeaderCell>
                    <CTableHeaderCell>Kelas</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((jadwal) => (
                      <CTableRow key={jadwal.id}>
                        <CTableDataCell>{jadwal.nama_matkul}</CTableDataCell>
                        <CTableDataCell>{jadwal.hari}</CTableDataCell>
                        <CTableDataCell>{jadwal.Semester}</CTableDataCell>
                        <CTableDataCell>{jadwal.Kelas}</CTableDataCell>
                        <CTableDataCell>{jadwal.Prodi}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <Link to={`/kelola/akademik/jadwal/update/${jadwal.id}`}>
                              <CButton
                                color="primary"
                                variant="outline"
                                className="ms-2"
                                title="Ubah Data Jadwal Mata Kuliah"
                              >
                                <CIcon icon={cilPen} />
                              </CButton>
                            </Link>
                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data Jadwal Mata Kuliah"
                              onClick={() => handleDeleteModal(jadwal)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CCol>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Modal Delete */}
      <CModal
        backdrop="static"
        visible={modalDelete}
        onClose={() => setModalDelete(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="DeleteModal">Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama_matkul : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataJadwal
