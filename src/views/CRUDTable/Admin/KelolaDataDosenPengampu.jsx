import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilSearch, cilUserPlus, cilFile } from '@coreui/icons'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const KelolaDataDosenPengampu = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [dosenData, setDosenData] = useState([])

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/admins/dosen'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setDosenData(response.data)
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

  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }

  const handleDelete = (id) => {
    // URL API untuk menghapus data dosen dengan id tertentu
    const apiUrl = `http://localhost:8080/api/admins/dosen/${id}`

    // Menggunakan Axios untuk mengirim permintaan DELETE
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle ketika data berhasil dihapus
        console.log('Data berhasil dihapus:', response.data)

        setDosenData((prevData) => prevData.filter((dosen) => dosen.kode_dosen !== id))

        // Tutup modal setelah berhasil menghapus
        setModalDelete(false)
        // Menampilkan Sweet Alert saat berhasil menghapus data
        Swal.fire({
          title: 'Berhasil',
          text: `Data ${selectedData ? selectedData.nama_dosen : ''} berhasil dihapus`,
          icon: 'success',
          confirmButtonText: 'OK',
        })
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat menghapus data
        console.error('Error deleting data:', error)
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        setLoading(false)
        setMessage(resMessage)
      })
  }

  const filteredData = dosenData.filter((user) => {
    return (
      searchText === '' ||
      user.kode_dosen.toLowerCase().includes(searchText.toLowerCase()) ||
      user.nama_dosen.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  const [modalImport, setModalImport] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const handleExportModal = () => {
    setModalImport(true)
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  const handleImportExcel = async () => {
    if (!selectedFile) {
      setMessage('Pilih file Excel terlebih dahulu')
      return
    }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('excel', selectedFile)

      // Make a POST request to your backend API for Excel file upload
      const response = await axios.post('http://localhost:8080/api/admins/import/dosen', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Handle the response (success or failure)
      console.log(response.data)
      if (response.data.success.length == 0) {
        //Jika import gagal
        setMessage('Ada kesalahan pada excel!')
        setLoading(false)
      } else {
        // Close the import modal on success
        setModalImport(false)

        // Fetch and update the data in the table
        const apiUrl = 'http://localhost:8080/api/admins/dosen'
        const updatedDataResponse = await axios.get(apiUrl, {
          withCredentials: true,
        })

        // Update the table data
        setDosenData(updatedDataResponse.data)

        // Menampilkan Sweet Alert saat berhasil import data
        Swal.fire({
          title: 'Berhasil',
          text: 'Import data excel berhasil',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      // Handle error if the request fails
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      setLoading(false)
      setMessage(resMessage)
    }
  }
  // Kolom untuk Data Table
  const columns = [
    {
      name: 'Kode Dosen',
      selector: (row) => row.kode_dosen,
      sortable: true,
    },
    {
      name: 'Nama Dosen',
      selector: (row) => row.nama_dosen,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <CTableDataCell>
          <CCol>
            <Link to={`/kelola/dosen/update/${row.kode_dosen}`}>
              <CButton color="primary" variant="outline" className="ms-2" title="Ubah Data Dosen">
                <CIcon icon={cilPen} />
              </CButton>
            </Link>
            <CButton
              color="danger"
              variant="outline"
              className="ms-2"
              title="Hapus Data Dosen"
              onClick={() => handleDeleteModal(row)}
            >
              <CIcon icon={cilTrash} />
            </CButton>
          </CCol>
        </CTableDataCell>
      ),
    },
  ]
  console.log(filteredData)
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Dosen</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/dosen/pengampu/tambah">
                          <CButton variant="outline">
                            <CIcon icon={cilUserPlus} className="mx-2" />
                            Create
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={3}>
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
              <DataTable
                columns={columns}
                data={filteredData}
                responsive
                noDataComponent={'No Data'}
                pagination
                customStyles={{
                  cells: {
                    style: {
                      justifyContent: 'center',
                    },
                  },
                  headCells: {
                    style: {
                      fontWeight: 'bold',
                      justifyContent: 'center',
                    },
                  },
                }}
              />
              {/* <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Kode Dosen</CTableHeaderCell>
                    <CTableHeaderCell>Nama Dosen</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
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
                    filteredData.map((user) => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>{user.kode_dosen}</CTableDataCell>
                        <CTableDataCell>{user.nama_dosen}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <Link to={`/kelola/dosen/update/${user.kode_dosen}`}>
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
              </CTable> */}
            </CCardBody>
            {/* <CCardFooter>Ini Footer</CCardFooter> */}
          </CCard>
        </CCol>
      </CRow>
      {/* Modal Import */}
      <CModal
        backdrop="static"
        visible={modalImport}
        onClose={() => {
          setModalImport(false)
          setMessage('')
          setLoading(false)
        }}
        aria-labelledby="ExportModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="ExportModalLabel">Import From Excel</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              name="file"
              type="file"
              id="formFile"
              label="File Excel"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </CForm>
          <p className="text-muted">Hanya menerima tipe file .xlsx dan .xls</p>
        </CModalBody>
        <CModalFooter>
          <CRow className="mt-2">
            {message && (
              <p className="alert alert-danger" style={{ padding: '5px' }}>
                {message}
              </p>
            )}
          </CRow>
          <CButton
            color="secondary"
            onClick={() => {
              setModalImport(false)
              setMessage('')
              setLoading(false)
            }}
          >
            Close
          </CButton>
          {loading ? (
            <CButton color="primary" disabled>
              <CSpinner color="info" size="sm" />
            </CButton>
          ) : (
            <CButton color="primary" onClick={handleImportExcel}>
              Import
            </CButton>
          )}
        </CModalFooter>
      </CModal>
      {/* Modal Delete */}
      <CModal
        backdrop="static"
        visible={modalDelete}
        onClose={() => {
          setModalDelete(false)
          setMessage('')
          setLoading(false)
        }}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="DeleteModal">Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama_dosen : ''} ?</CModalBody>
        <CModalFooter>
          <CRow className="mt-2">
            {message && (
              <p className="alert alert-danger" style={{ padding: '5px' }}>
                {message}
              </p>
            )}
          </CRow>
          <CButton
            color="secondary"
            onClick={() => {
              setModalDelete(false)
              setMessage('')
              setLoading(false)
            }}
          >
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(selectedData.kode_dosen)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataDosenPengampu
