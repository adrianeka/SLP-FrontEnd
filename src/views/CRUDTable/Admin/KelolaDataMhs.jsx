import React, { useState, useEffect } from 'react'
import { read, utils } from 'xlsx'
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
import { cilPen, cilTrash, cilSearch, cilFile, cilUserPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'

const KelolaDataMhs = () => {
  const [importData, setImport] = useState([])
  const [rawData, setRaw] = useState([])
  const [modalImport, setModalImport] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedData, setSelectedData] = useState(null)
  const [mahasiswaData, setMahasiswaData] = useState([])
  const [modalExport, setModalExport] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

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

  const handleExportModal = () => {
    setModalExport(true)
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  const handleImportExcel = async () => {
    try {
      const formData = new FormData()
      formData.append('excel', selectedFile)

      // Make a POST request to your backend API for Excel file upload
      const response = await axios.post(
        'http://localhost:8080/api/admins/import/mahasiswa',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      // Handle the response (success or failure)
      console.log(response.data)

      if (response.data.success) {
        // Close the import modal on success
        setModalExport(false)

        // Fetch and update the data in the table
        const apiUrl = 'http://localhost:8080/api/admins/mahasiswa'
        const updatedDataResponse = await axios.get(apiUrl, {
          withCredentials: true,
        })

        // Update the table data
        setMahasiswaData(updatedDataResponse.data)
      }
    } catch (error) {
      // Handle error if the request fails
      console.error('Error uploading Excel file:', error)
    }
  }

  const handleDeleteModal = (data) => {
    setSelectedData(data)
    setModalDelete(true)
  }

  const handleUpdateModal = (data) => {
    setSelectedData(data)
    setModalUpdate(true)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleDelete = (nim) => {
    const apiUrl = `http://localhost:8080/api/admins/mahasiswa/destroy/${nim}`

    // Send a DELETE request to delete the data
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Data berhasil dihapus:', response.data)

        // Update the state to remove the deleted data
        setMahasiswaData((prevData) => prevData.filter((mahasiswa) => mahasiswa.nim !== nim))
        setModalDelete(false) // Close the delete modal
      })
      .catch((error) => {
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

  const currentYear = new Date().getFullYear()
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Mahasiswa</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/mahasiswa/tambah">
                          <CButton variant="outline">
                            <CIcon icon={cilUserPlus} className="mx-2" />
                            Create
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol md={3}>
                        <CButton variant="outline" color="success" onClick={handleExportModal}>
                          <CIcon icon={cilFile} className="mx-2" />
                          Import
                        </CButton>
                      </CCol>
                      <CCol xs={6}></CCol>
                    </CRow>
                  </CCol>
                  <CCol md={4} xs={6}>
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
                    <CTableHeaderCell>kelas</CTableHeaderCell>
                    <CTableHeaderCell>Nim</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Angkatan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.length === 0 ? (
                    <tr key="no-data">
                      <td colSpan="6" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((user) => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>{user.nama}</CTableDataCell>
                        <CTableDataCell>
                          {currentYear - user.angkatan.tahun_angkatan + 1 + user.kela.nama_kelas}
                        </CTableDataCell>
                        <CTableDataCell>{user.nim}</CTableDataCell>
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
                              title={`Hapus Data Mahasiswa ${user.nama}`}
                              onClick={() => {
                                handleDeleteModal(user)
                              }}
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
      <CModal backdrop="static" visible={modalExport} onClose={() => setModalExport(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Import From Excel</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput name="file" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalExport(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleImportExcel}>
            Import
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal backdrop="static" visible={modalDelete} onClose={() => setModalDelete(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton
            color="danger"
            onClick={() => handleDelete(selectedData ? selectedData.nim : null)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal backdrop="static" visible={modalUpdate} onClose={() => setModalUpdate(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Update</CModalTitle>
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
