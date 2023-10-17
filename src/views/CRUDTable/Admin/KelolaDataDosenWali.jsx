import React, { useState, useEffect } from 'react'
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
  CFormSelect,
} from '@coreui/react'
import { cilPen, cilTrash, cilUserPlus, cilShortText, cilSearch } from '@coreui/icons'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

const usersData = [
  { id: 0, tingkat: '2023', kelas: 'A', prodi: 'D3', wali: 'Dosen' },
  { id: 1, tingkat: '2023', kelas: 'B', prodi: 'D3', wali: 'Dosen' },
  { id: 2, tingkat: '2023', kelas: 'C', prodi: 'D3', wali: 'Dosen' },
  { id: 3, tingkat: '2023', kelas: 'A', prodi: 'D4', wali: 'Dosen' },
  { id: 4, tingkat: '2023', kelas: 'B', prodi: 'D4', wali: 'Dosen' },
  { id: 5, tingkat: '2022', kelas: 'A', prodi: 'D3', wali: 'Dosen' },
  { id: 6, tingkat: '2022', kelas: 'B', prodi: 'D3', wali: 'Dosen' },
  { id: 7, tingkat: '2022', kelas: 'A', prodi: 'D4', wali: 'Dosen' },
  { id: 8, tingkat: '2022', kelas: 'B', prodi: 'D4', wali: 'Dosen' },
  { id: 9, tingkat: '2021', kelas: 'A', prodi: 'D3', wali: 'Dosen' },
  { id: 10, tingkat: '2021', kelas: 'B', prodi: 'D3', wali: 'Dosen' },
  { id: 11, tingkat: '2021', kelas: 'A', prodi: 'D4', wali: 'Dosen' },
  { id: 12, tingkat: '2021', kelas: 'B', prodi: 'D4', wali: 'Dosen' },
]

const KelolaDataDosenWali = () => {
  const [modalDelete, setModalDelete] = useState(false) //Handle Klik Modal Delete
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [dosenWaliData, setDosenWaliData] = useState([]) //State untuk menampung data dosen
  useEffect(() => {
    // URL API untuk mengambil data dosen
    const apiUrl = 'http://localhost:8080/api/admins/dosen'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        const currentYear = new Date().getFullYear() // Mendapatkan tahun saat ini
        // Mengatur data dosen ke dalam state dosenData
        const dosenWaliData = response.data.map((item) => {
          return {
            id_dosenwali: item.id_dosenwali,
            username: item.username,
            password: item.password,
            dosen_id: item.dosen_id,
            angkatan_id: item.angkatan_id,
            kelas_id: item.kelas_id,
            prodi_id: item.prodi_id,
            prodi: item.prodi ? item.prodi.nama_prodi : '', // Mengambil nama_prodi dari objek prodi jika ada
            angkatan: item.angkatan ? item.angkatan.tahun_angkatan : '', // Mengambil tahun_angkatan dari objek angkatan jika ada
            kelas: item.kela
              ? currentYear - parseInt(item.angkatan.tahun_angkatan) + 1 + item.kela.nama_kelas
              : '', // Mengambil nama_kelas dari objek kela jika ada
            dosen: item.dosen ? item.dosen.nama_dosen : '', // Mengambil nama_dosen dari objek dosen jika ada
          }
        })

        console.log(dosenWaliData)

        // Set state dosenWaliData setelah mendapatkan data yang telah diubah
        setDosenWaliData(dosenWaliData)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleDeleteModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data) //Mengambil data id saat ingin menghapus
    setModalDelete(true) // Menampilkan modal
  }

  const handleDelete = (id) => {
    // URL API untuk menghapus data semester dengan id tertentu
    const apiUrl = `http://localhost:8080/api/admins/dosen_wali/delete/${id}`

    // Menggunakan Axios untuk mengirim permintaan DELETE
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle ketika data berhasil dihapus
        console.log('Data berhasil dihapus:', response.data)

        setDosenWaliData((prevData) =>
          prevData.filter((dosenWali) => dosenWali.id_dosenwali !== id),
        )

        // Tutup modal setelah berhasil menghapus
        setModalDelete(false)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat menghapus data
        console.error('Error deleting data:', error)
      })
  }

  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }
  const filteredData = dosenWaliData.filter((data) => {
    //Search filter data
    return (
      searchText === '' ||
      data.angkatan.toLowerCase().includes(searchText.toLowerCase()) ||
      data.kela.toLowerCase().includes(searchText.toLowerCase()) ||
      data.prodi.toLowerCase().includes(searchText.toLowerCase()) ||
      data.wali.toLowerCase().includes(searchText.toLowerCase())
    )
  })
  // console.log(selectedData)
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Dosen Wali</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to={'/kelola/dosen/wali/tambah'}>
                          <CButton variant="outline">
                            <CIcon icon={cilUserPlus} className="mx-2" />
                            Create
                          </CButton>
                        </Link>
                      </CCol>
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
                    <CTableHeaderCell>Dosen Wali</CTableHeaderCell>
                    <CTableHeaderCell>Kelas</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Angkatan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((data) => (
                    <CTableRow key={data.id}>
                      <CTableDataCell>{data.dosen}</CTableDataCell>
                      <CTableDataCell>{data.kelas}</CTableDataCell>
                      <CTableDataCell>{data.prodi}</CTableDataCell>
                      <CTableDataCell>{data.angkatan}</CTableDataCell>
                      <CTableDataCell>
                        <CCol>
                          <Link to={`/kelola/dosen/wali/update/${data.id_dosenwali}`}>
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title="Ubah Data Dosen"
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                          </Link>
                          <CButton
                            color="danger"
                            variant="outline"
                            className="ms-2"
                            title="Hapus Data Dosen"
                            onClick={() => handleDeleteModal(data)}
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
        <CModalBody>
          Yakin ingin delete{' '}
          {selectedData
            ? selectedData.dosen +
              ' (' +
              selectedData.dosen_id +
              ') ' +
              selectedData.kelas +
              ' ' +
              selectedData.prodi
            : ''}{' '}
          ?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(selectedData.id_dosenwali)}>
            Delete
          </CButton>
          <CButton color="primary">{isCreateMode ? 'Submit' : 'Save'}</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataDosenWali
