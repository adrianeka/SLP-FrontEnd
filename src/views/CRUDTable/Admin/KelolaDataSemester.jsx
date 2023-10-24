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

const KelolaDataSemester = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [semesterData, setSemesterData] = useState([])
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
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

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
    return (
      searchText === '' ||
      (data.nama_semester && data.nama_semester.toLowerCase().includes(searchText.toLowerCase())) ||
      (data.id_semester && data.id_semester.toLowerCase().includes(searchText.toLowerCase())) ||
      (data.status_semester &&
        data.status_semester.toLowerCase().includes(searchText.toLowerCase()))
    )
  })
  // Data Table Columns
  // const columns = [
  //   {
  //     name: 'Semester',
  //     selector: (row) => row.nama_semester,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Tahun Ajar',
  //     selector: (row) => row.id_semester,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Status',
  //     selector: (row) => row.status_semester,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Actions',
  //     cell: (row) => (
  //       <div>
  //         <Link to={`/kelola/akademik/semester/update/${row.id_semester}`}>
  //           <CButton color="primary" variant="outline" className="ms-2" title="Ubah Data Semester">
  //             <CIcon icon={cilPen} />
  //           </CButton>
  //         </Link>
  //         <CButton
  //           color="danger"
  //           variant="outline"
  //           className="ms-2"
  //           title="Hapus Data Semester"
  //           onClick={() => handleDeleteModal(row)}
  //         >
  //           <CIcon icon={cilTrash} />
  //         </CButton>
  //       </div>
  //     ),
  //   },
  // ]
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Semester Kuliah</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/akademik/semester/tambah">
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
              {/* <DataTable columns={columns} data={filteredData} /> */}
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
                          <CTableDataCell>
                            <CCol>
                              <Link to={`/kelola/akademik/semester/update/${semester.id_semester}`}>
                                <CButton
                                  color="primary"
                                  variant="outline"
                                  className="ms-2"
                                  title="Ubah Data Semester"
                                >
                                  <CIcon icon={cilPen} />
                                </CButton>
                              </Link>
                              <CButton
                                color="danger"
                                variant="outline"
                                className="ms-2"
                                title="Hapus Data Semester"
                                onClick={() => handleDeleteModal(semester)}
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                            </CCol>
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
