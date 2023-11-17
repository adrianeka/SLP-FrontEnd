import React, { useEffect, useState } from 'react'
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
} from '@coreui/icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const usersData = []

const TableSuratMahasiswa = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [perizinanData, setPerizinanData] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/mahasiswa/perizinan/list/draft'

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

  const handleDeleteModal = (data) => {
    setSelectedData(data)
    setModalDelete(true)
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

  const handleDelete = (id_perizinan) => {
    const apiUrl = `http://localhost:8080/api/mahasiswa/perizinan/delete/${id_perizinan}`

    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Data berhasil dihapus:', response.data)

        // Update the state to remove the deleted data
        setPerizinanData((prevData) =>
          prevData.filter((mahasiswa) => mahasiswa.id_perizinan !== id_perizinan),
        )
        setModalDelete(false) // Close the delete modal

        // Menampilkan Sweet Alert saat berhasil menghapus data
        Swal.fire({
          title: 'Berhasil',
          text: `Data ${selectedData ? selectedData.keterangan : ''} berhasil dihapus.`,
          icon: 'success',
          confirmButtonText: 'OK',
        })
      })
      .catch((error) => {
        console.error('Error deleting data:', error)
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        setLoading(false)
        setMessage(resMessage)
      })
  }

  const filteredData = perizinanData.filter((user) => {
    //Var untuk menampung data baru
    return (
      searchText === '' || // Filter berdasarkan pencarian
      user.judulSurat.toLowerCase().includes(searchText.toLowerCase()) ||
      user.tanggal.toLowerCase().includes(searchText.toLowerCase()) ||
      user.jenis.toLowerCase().includes(searchText.toLowerCase()) ||
      user.alasan.toLowerCase().includes(searchText.toLowerCase()) ||
      user.surat.toLowerCase().includes(searchText.toLowerCase()) ||
      user.status.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Draft Surat Perizinan Mahasiswa</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol xs={8}></CCol>
                  <CCol xs={4}>
                    <CInputGroup className="search-input">
                      <CFormInput
                        placeholder="Search"
                        value={searchText}
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
                    <CTableHeaderCell>Action</CTableHeaderCell>
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
                      <CTableRow key={user.id} className="text-center">
                        <CTableDataCell>{user.jenis}</CTableDataCell>
                        <CTableDataCell>{user.keterangan}</CTableDataCell>
                        <CTableDataCell>{user.jenis}</CTableDataCell>
                        <CTableDataCell>{user.tanggal_awal}</CTableDataCell>
                        <CTableDataCell>{user.tanggal_akhir}</CTableDataCell>
                        <CTableDataCell>
                          <Link to={`/drafts/update/${user.id_perizinan}`}>
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title="Ubah Data Mahasiswa"
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                          </Link>
                          <CButton
                            color="danger"
                            variant="outline"
                            className="ms-2"
                            title="Hapus Surat Perizinan"
                            onClick={() => handleDeleteModal(user)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
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
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.id_perizinan : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton
            color="danger"
            onClick={() => handleDelete(selectedData ? selectedData.id_perizinan : null)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal Update */}
      <CModal
        backdrop="static"
        visible={modalUpdate}
        onClose={() => setModalUpdate(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="UpdateModal">Update</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="judul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormTextarea
                  aria-describedby="judul"
                  value={selectedData ? selectedData.judulSurat : ''}
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tanggal-awal">
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  type="date"
                  placeholder="Tanggal Awal"
                  floatingLabel="Tanggal Awal"
                  aria-describedby="tanggal-awal"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tanggal-akhir">
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  type="date"
                  placeholder="Tanggal Akhir"
                  floatingLabel="Tanggal Akhir"
                  aria-describedby="tanggal-akhir"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="jam-awal">
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Jam Kuliah Awal"
                  floatingLabel="Jam Kuliah Awal"
                  aria-describedby="jam-awal"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="jam-akhir">
                  <CIcon icon={cilClock} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Jam Kuliah Akhir"
                  floatingLabel="Jam Kuliah Akhir"
                  aria-describedby="jam-akhir"
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="alasan">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormTextarea
                  placeholder="Keterangan"
                  floatingLabel="Keterangan"
                  aria-describedby="keterangan"
                  value={selectedData ? selectedData.alasan : ''}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
              <CFormSelect
                id="jenisKetidakhadiran"
                label="Jenis Ketidakhadiran"
                value={selectedData ? selectedData.jenis : ''}
              >
                <option selected hidden>
                  Pilih..
                </option>
                <option value="Sakit">Sakit</option>
                <option value="Izin">Izin</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="bukti"
                type="file"
                a
                aria-describedby="file"
                label="Upload Bukti Surat Perizinan"
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalUpdate(false)}>
            Close
          </CButton>
          <CButton
            color="danger"
            onClick={() => handleDelete(selectedData ? selectedData.id : null)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default TableSuratMahasiswa
