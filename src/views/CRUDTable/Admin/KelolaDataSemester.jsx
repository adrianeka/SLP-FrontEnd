import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilSearch, cilPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'
import '../../../assets/css/style.css'

const KelolaDataSemester = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [semesterData, setSemesterData] = useState([])
  const [statusChanged, setStatusChanged] = useState(false)
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/admins/semester'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setSemesterData(response.data)
        setStatusChanged(false)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [statusChanged])

  useEffect(() => {
    if (semesterData.length > 0) {
      const firstSemester = semesterData[0]
      const [semesterName, tahunAjar] = firstSemester.nama_semester.split(' ')
      setTableData({
        id_semester: firstSemester.id_semester,
        tahun_ajar: tahunAjar,
        nama_semester: semesterName,
        status_semester: firstSemester.status_semester === '1' ? 'Ganjil' : 'Genap',
      })
    }
  }, [semesterData])

  const handleDeleteModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data) //Mengambil data id saat ingin menghapus
    setModalDelete(true) // Menampilkan modal
  }

  const handleDelete = (id) => {
    // URL API untuk menghapus data semester dengan id tertentu
    const apiUrl = `http://localhost:8080/api/admins/semester/${id}`

    // Menggunakan Axios untuk mengirim permintaan DELETE
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle ketika data berhasil dihapus
        console.log('Data berhasil dihapus:', response.data)

        setSemesterData((prevData) => prevData.filter((semester) => semester.id_semester !== id))

        // Tutup modal setelah berhasil menghapus
        setModalDelete(false)
        // Menampilkan Sweet Alert saat berhasil menghapus data
        Swal.fire({
          title: 'Berhasil',
          text: `Data ${selectedData ? selectedData.id_semester : ''} berhasil dihapus`,
          icon: 'success',
          confirmButtonText: 'OK',
        })
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

  const filteredData = semesterData.filter((data) => {
    const namaSemester = (data.nama_semester || '').toString().toLowerCase()
    const idSemester = (data.id_semester || '').toString().toLowerCase()
    const statusSemester = (data.status_semester || '').toString().toLowerCase()

    return (
      searchText === '' ||
      namaSemester.includes(searchText.toLowerCase()) ||
      idSemester.includes(searchText.toLowerCase()) ||
      statusSemester.includes(searchText.toLowerCase())
    )
  })

  const handleToggleStatus = (semester) => {
    const newStatus = semester.status_semester === 1 ? 0 : 1

    // URL API untuk mengubah status semester
    const apiUrl = `http://localhost:8080/api/admins/semester/update/${semester.id_semester}`

    // Menggunakan Axios untuk mengirim permintaan PUT
    axios
      .put(
        apiUrl,
        { status_semester: newStatus },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        // Handle ketika status berhasil diubah
        console.log('Status semester berhasil diubah:', response.data)

        // Update status semester pada data yang ditampilkan
        setSemesterData((prevData) =>
          prevData.map((item) =>
            item.id_semester === semester.id_semester
              ? { ...item, status_semester: newStatus }
              : item,
          ),
        )

        // Menampilkan Sweet Alert saat berhasil mengubah status semester
        Swal.fire({
          title: 'Berhasil',
          text: `Status Semester ${semester.nama_semester} berhasil diubah`,
          icon: 'success',
          confirmButtonText: 'OK',
        })
        setStatusChanged(true)
      })

      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengubah status semester
        console.error('Error updating status:', error)
      })
  }
  return (
    <div>
      <CRow>
        <CCol>
          <CCard className="custom-card">
            <CCardBody>
              <div className="fw-bold my-3 title-page">Daftar Semester Kuliah</div>
              <CForm>
                <CRow>
                  <CCol md={8} xs={6} className="my-3">
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/akademik/semester/tambah" className="link-card">
                          <CButton
                            variant="outline"
                            color="dark"
                            className="d-flex align-items-center justify-content-center my-3"
                          >
                            <CRow>
                              <CCol xs={1}>
                                <CIcon icon={cilPlus} />
                              </CCol>
                              <CCol xs={9}>Create</CCol>
                            </CRow>
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
                  <CTableRow className="text-center">
                    <CTableHeaderCell>Semester</CTableHeaderCell>
                    <CTableHeaderCell>Tahun Ajar</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
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
                    filteredData.map((semester) => {
                      const [semesterName, tahunAjar] = semester.nama_semester.split(' ')
                      return (
                        <CTableRow key={semester.id} className="text-center">
                          <CTableDataCell>{semesterName}</CTableDataCell>
                          <CTableDataCell>{tahunAjar}</CTableDataCell>
                          <CTableDataCell>
                            {semester.status_semester == 1 ? 'Aktif' : 'Tidak Aktif'}
                          </CTableDataCell>
                          <CTableDataCell style={{ display: 'flex', alignItems: 'center' }}>
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title={semester.status_semester === 1 ? 'Non-Aktifkan' : 'Aktifkan'}
                              onClick={() => handleToggleStatus(semester)}
                              style={{
                                display: semester.status_semester === 1 ? 'none' : 'block',
                              }}
                            >
                              {semester.status_semester === 1 ? 'Non-Active' : 'Active'}
                            </CButton>

                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data Semester"
                              onClick={() => handleDeleteModal(semester)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })
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
        <CModalBody>
          Yakin ingin hapus Semester {selectedData ? selectedData.id_semester : ''} ?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(selectedData.id_semester)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataSemester
