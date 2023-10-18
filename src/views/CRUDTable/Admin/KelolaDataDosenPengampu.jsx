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

const KelolaDataDosenPengampu = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
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
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat menghapus data
        console.error('Error deleting data:', error)
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

  const [modalExport, setModalExport] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
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
      const response = await axios.post('http://localhost:8080/api/admins/import/dosen', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Handle the response (success or failure)
      console.log(response.data)

      if (response.data.success) {
        // Close the import modal on success
        setModalExport(false)

        // Fetch and update the data in the table
        const apiUrl = 'http://localhost:8080/api/admins/dosen'
        const updatedDataResponse = await axios.get(apiUrl, {
          withCredentials: true,
        })

        // Update the table data
        setDosenData(updatedDataResponse.data)
      }
    } catch (error) {
      // Handle error if the request fails
      console.error('Error uploading Excel file:', error)
    }
  }

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
                          Import Excel
                        </CButton>
                      </CCol>

                      <CModal
                        backdrop="static"
                        visible={modalExport}
                        onClose={() => setModalExport(false)}
                        aria-labelledby="ExportModalLabel"
                      >
                        <CModalHeader>
                          <CModalTitle id="ExportModalLabel">Import to Excel</CModalTitle>
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
                          <CButton color="secondary" onClick={() => setModalExport(false)}>
                            Close
                          </CButton>
                          <CButton color="success" onClick={handleImportExcel}>
                            Import
                          </CButton>
                        </CModalFooter>
                      </CModal>

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
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="DeleteModal">Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.nama_dosen : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(selectedData.kode_dosen)}>
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
          <CButton color="danger">Delete</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataDosenPengampu
