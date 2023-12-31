import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTableDataCell,
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
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilSearch, cilFile, cilUserPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import '../../../assets/css/style.css'

const KelolaDataMhs = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedData, setSelectedData] = useState(null)
  const [mahasiswaData, setMahasiswaData] = useState([])
  const [modalImport, setModalImport] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/mahasiswa'

    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        setMahasiswaData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  //Handle import modal
  const handleImportModal = () => {
    setModalImport(true)
  }
  //Handle Perubahan File pada modal import
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  //Handle button import excel
  const handleImportExcel = async () => {
    if (!selectedFile) {
      setMessage('Pilih file Excel terlebih dahulu')
      return
    }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('excel', selectedFile)
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
      if (response.data.success.length == 0) {
        //Jika import gagal
        setMessage('Ada kesalahan pada excel!')
        setLoading(false)
      } else {
        // Menutup modal import
        setModalImport(false)

        // Fetch and update the data in the table
        const apiUrl = 'http://localhost:8080/api/admins/mahasiswa'
        const updatedDataResponse = await axios.get(apiUrl, {
          withCredentials: true,
        })

        setMahasiswaData(updatedDataResponse.data)
        // Menampilkan Sweet Alert saat berhasil menambah data
        Swal.fire({
          title: 'Berhasil',
          text: `Import data excel berhasil`,
          icon: 'success',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      // Handle error if the request fails
      // console.error('Error uploading Excel file:', error)
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      setLoading(false)
      setMessage(resMessage)
    }
  }

  const handleDeleteModal = (data) => {
    setSelectedData(data)
    setModalDelete(true)
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

        // Menampilkan Sweet Alert saat berhasil menghapus data
        Swal.fire({
          title: 'Berhasil',
          text: `Data ${selectedData ? selectedData.nama : ''} berhasil dihapus.`,
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

  // Kolom untuk Data Table
  const columns = [
    {
      name: 'NIM',
      selector: (row) => row.nim,
      sortable: true,
    },
    {
      name: 'Nama Mahasiswa',
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: 'Kelas',
      selector: (row) => currentYear - row.angkatan.tahun_angkatan + 1 + row.kela.nama_kelas,
      sortable: true,
    },
    {
      name: 'Prodi',
      selector: (row) => row.prodi.nama_prodi,
      sortable: true,
    },
    {
      name: 'Angkatan',
      selector: (row) => row.angkatan.tahun_angkatan,
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <CTableDataCell>
          <CCol>
            <Link to={`/kelola/mahasiswa/update/${row.nim}`}>
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
              title="Hapus Data Mahasiswa"
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
  const tahunSaatIni = new Date().getFullYear()

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <div className="fw-bold mt-3 mb-5 title-page">Daftar Mahasiswa</div>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol xs={4}>
                        <CButtonGroup>
                          <Link to={'/kelola/mahasiswa/tambah'}>
                            <CButton variant="outline" color="dark">
                              <CIcon icon={cilUserPlus} className="mx-1 d-none d-md-inline" />
                              Create
                            </CButton>
                          </Link>
                          <CButton
                            variant="outline"
                            color="success"
                            onClick={handleImportModal}
                            className="mx-2"
                          >
                            <CIcon icon={cilFile} className="mx-1 d-none d-md-inline" />
                            Import
                          </CButton>
                        </CButtonGroup>
                      </CCol>
                      <CCol xs={8}></CCol>
                    </CRow>
                  </CCol>
                  <CCol md={4} xs={6}>
                    <CInputGroup className="search-input">
                      <CFormInput
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchChange}
                      />
                      <CInputGroupText id="search-icon" className="d-none d-md-block">
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
            </CCardBody>
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
      >
        <CModalHeader closeButton>
          <CModalTitle>Import From Excel</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            name="file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            label="File Excel"
          />
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
        {/* Modal Delete */}
      </CModal>
      <CModal
        backdrop="static"
        visible={modalDelete}
        onClick={() => {
          setModalDelete(false)
          setMessage('')
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama : ''} ?</CModalBody>
        <CModalFooter>
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
          <CButton
            color="danger"
            onClick={() => handleDelete(selectedData ? selectedData.nim : null)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataMhs
