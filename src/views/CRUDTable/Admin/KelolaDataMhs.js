import React, { useEffect, useState } from 'react'
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
import {
  cilPen,
  cilSend,
  cilTrash,
  cilSearch,
  cilShortText,
  cilCalendar,
  cilClock,
  cilUserPlus,
} from '@coreui/icons'
import { Link } from 'react-router-dom'

// const usersData = [
//   {
//     id: 0,
//     nama: 'Adrian',
//     Kelas: '2B',
//     nim: '221511000',
//     prodi: 'D3 - Teknik Informatika',
//     username: 'MrDr8',
//     password: 'MrDr8',
//     email: 'adrian',
//     noTelp: '012312',
//     namaOrangTua: 'dsadas',
//     noTelpOrangTua: '321',
//   },
//   {
//     id: 1,
//     nama: 'Reno',
//     Kelas: '2B',
//     nim: '221511000',
//     prodi: 'D3 - Teknik Informatika',
//     username: 'MrDr8',
//     password: 'MrDr8',
//     email: 'adrian',
//     noTelp: '012312',
//     namaOrangTua: 'dsadas',
//     noTelpOrangTua: '321',
//   },
// ]

const KelolaDataMhs = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [mahasiswaData, setMahasiswaData] = useState([])

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/admins/mahasiswa'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setMahasiswaData(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])
  const handleDeleteModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data)
    setModalDelete(true) // Menampilkan modal
  }

  const handleUpdateModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data)
    setModalUpdate(true) // Menampilkan modal
  }

  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }

  const handleDelete = (id) => {
    // URL API untuk menghapus data dosen dengan id tertentu
    const apiUrl = `http://localhost:8080/api/admins/mahasiswa/destroy/${id}`

    // Menggunakan Axios untuk mengirim permintaan DELETE
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle ketika data berhasil dihapus
        console.log('Data berhasil dihapus:', response.data)

        setMahasiswaData((prevData) => prevData.filter((mahasiswa) => mahasiswa.nim !== id))

        // Tutup modal setelah berhasil menghapus
        setModalDelete(false)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat menghapus data
        console.error('Error deleting data:', error)
      })
  }

  const filteredData = mahasiswaData.filter((user) => {
    //Var untuk menampung data baru
    return (
      searchText === '' || // Filter berdasarkan pencarian
      user.nim.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      user.kela.nama_kelas.toLowerCase().includes(searchText.toLowerCase()) ||
      user.prodi.nama_prodi.toLowerCase().includes(searchText.toLowerCase()) ||
      user.angkatan.tahun_angkatan.toLowerCase().includes(searchText.toLowerCase())
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
                  <CCol xs={8}>
                    <Link to="/kelola/mahasiswa/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilUserPlus} className="mx-2" />
                        Create
                      </CButton>
                    </Link>
                  </CCol>
                  <CCol xs={4}>
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
                    <CTableHeaderCell>Nim</CTableHeaderCell>
                    <CTableHeaderCell>Kelas</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Angkatan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((user) => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>{user.nim}</CTableDataCell>
                        <CTableDataCell>{user.nama}</CTableDataCell>
                        <CTableDataCell>{user.kela.nama_kelas}</CTableDataCell>
                        <CTableDataCell>{user.prodi.nama_prodi}</CTableDataCell>
                        <CTableDataCell>{user.angkatan.tahun_angkatan}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <Link to={`/kelola/mahasiswa/update/${user.nim}`}>
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
                    ))
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
            {/* <CCardFooter>Ini Footer</CCardFooter> */}
          </CCard>
        </CCol>
      </CRow>
      {/* Modal Delete */}
      <CModal
        backdrop="static"
        visible={modalDelete}
        onClose={() => setModalDelete(false)}
        aria-labelledby="DeleteModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="DeleteModal">Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(selectedData.nim)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal Update */}
      <CModal
        backdrop="static"
        visible={modalUpdate}
        onClose={() => setModalUpdate(false)}
        aria-labelledby="UpdateModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="UpdateModal">Update</CModalTitle>
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
