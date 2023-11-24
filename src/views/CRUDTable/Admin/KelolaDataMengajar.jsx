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

const KelolaDataMengajar = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [mengajarData, setMengajarData] = useState([])

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/admins/mengajar'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setMengajarData(response.data)
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

  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }

  const handleDelete = (id) => {
    // URL API untuk menghapus data dosen dengan id tertentu
    const apiUrl = `http://localhost:8080/api/admins/jadwal/${id}`

    // Menggunakan Axios untuk mengirim permintaan DELETE
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle ketika data berhasil dihapus
        console.log('Data berhasil dihapus:', response.data)

        setMengajarData((prevData) => prevData.filter((mengajar) => mengajar.matakul_id !== id))

        // Tutup modal setelah berhasil menghapus
        setModalDelete(false)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat menghapus data
        console.error('Error deleting data:', error)
      })
  }

  const filteredData = mengajarData.filter((data) => {
    //Search filter data
    return (
      searchText === '' ||
      data.detailMatkul.mataKuliah.nama_matakuliah
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      data.detailMatkul.matkul_id.toLowerCase().includes(searchText.toLowerCase()) ||
      data.semester.nama_semester.toLowerCase().includes(searchText.toLowerCase()) ||
      data.kela.nama_kelas.toLowerCase().includes(searchText.toLowerCase()) ||
      data.prodi.nama_prodi.toLowerCase().includes(searchText.toLowerCase()) ||
      data.angkatan.tahun_angkatan.toLowerCase().includes(searchText.toLowerCase()) ||
      data.dosen.kode_dosen.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  const calculateClass = (tahunAngkatan) => {
    const currentYear = new Date().getFullYear()
    const academicYear = parseInt(tahunAngkatan)

    const yearDifference = currentYear - academicYear

    const classLevel = yearDifference + 1
    return `${classLevel}`
  }

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Data Mengajar</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/akademik/mengajar/tambah">
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
                    <CTableHeaderCell>Kode Mata kuliah</CTableHeaderCell>
                    <CTableHeaderCell>Nama Mata kuliah</CTableHeaderCell>
                    <CTableHeaderCell>semester</CTableHeaderCell>
                    <CTableHeaderCell>prodi</CTableHeaderCell>
                    <CTableHeaderCell>kelas</CTableHeaderCell>
                    <CTableHeaderCell>Angkatan</CTableHeaderCell>
                    <CTableHeaderCell>Dosen Pengampu</CTableHeaderCell>
                    {/* <CTableHeaderCell>Aksi</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((jadwal) => (
                      <CTableRow key={jadwal.id}>
                        <CTableDataCell>
                          {jadwal.angkatan_detail_matkul?.detailMatkul?.matkul_id || '-'}
                        </CTableDataCell>

                        <CTableDataCell>
                          {jadwal.angkatan_detail_matkul?.detailMatkul?.mataKuliah?.nama_matakuliah}
                        </CTableDataCell>
                        <CTableDataCell>
                          {jadwal.angkatan_detail_matkul?.semester?.nama_semester}
                        </CTableDataCell>
                        <CTableDataCell>
                          {jadwal.angkatan_detail_matkul?.prodi?.nama_prodi || '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {calculateClass(
                            jadwal.angkatan_detail_matkul &&
                              jadwal.angkatan_detail_matkul.angkatan?.tahun_angkatan,
                          )}
                          {jadwal.angkatan_detail_matkul?.kela?.nama_kelas || '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {jadwal.angkatan_detail_matkul?.angkatan?.tahun_angkatan || '-'}
                        </CTableDataCell>
                        <CTableDataCell>{jadwal.dosen.nama_dosen}</CTableDataCell>
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
          <CButton color="danger" onClick={() => handleDelete(selectedData.id_jadwal)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataMengajar
