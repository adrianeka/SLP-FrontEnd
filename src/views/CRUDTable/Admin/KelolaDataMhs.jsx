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

  const handleImport = ($event) => {
    const files = $event.target.files
    if (files) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const wb = read(event.target.result)
        const sheets = wb.SheetNames
        if (sheets) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
          setRaw(rows)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleImportModal = async (e) => {
    e.preventDefault()
    const importedData = rawData.map((data, index) => ({
      id: index, // Assign a proper id here, for example, data['Nim']
      nim: data['Nim'],
      nama: data['Nama Lengkap'],
      kelas: data['Kelas'],
      prodi: data['Prodi'],
    }))

    setImport(importedData)
    setModalImport(false)
  }

  const handleDeleteModal = (nim) => {
    // Handle saat tombol hapus diklik
    setSelectedData({ nim }) // Set the selected data with the nim
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

  const handleDelete = (nim) => {
    const apiUrl = `http://localhost:8080/api/admins/mahasiswa/destroy/${nim}`;
  
    // Send a DELETE request to delete the data
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Data berhasil dihapus:', response.data);
  
        // Update the state to remove the deleted data
        setMahasiswaData((prevData) => prevData.filter((mahasiswa) => mahasiswa.nim !== nim));
        setModalDelete(false);  // Close the delete modal
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

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
                        <CButton
                          variant="outline"
                          color="success"
                          onClick={() => setModalImport(true)}
                        >
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
                              title={`Hapus Data Mahasiswa ${user.nama}`}
                              onClick={() => {
                                if (user && user.nim) {
                                  console.log('Clicked delete for item with nim:', user.nim)
                                  handleDeleteModal(user.nim) // Pass nim instead of user
                                } else {
                                  console.error('Invalid data for deletion:', user.nim)
                                }
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
            <CCardFooter>Ini Footer</CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CModal backdrop="static" visible={modalImport} onClose={() => setModalImport(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Import From Excel</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput type="file" accept=".xlsx" onChange={handleImport} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalImport(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleImportModal}>
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
