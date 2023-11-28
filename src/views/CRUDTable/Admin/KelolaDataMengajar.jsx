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
  CSpinner,
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
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const KelolaDataMengajar = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [mengajarData, setMengajarData] = useState([])
  const [modalImport, setModalImport] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const { id } = useParams()
  const { id_kelas } = useParams()
  const { id_prodi } = useParams()

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = `http://localhost:8080/api/admins/mengajar/${id}/${id_kelas}/${id_prodi}`

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleImportModal = () => {
    setModalImport(true)
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
        'http://localhost:8080/api/admins/create/mengajar/import-excel',
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
        const apiUrl = `http://localhost:8080/api/admins/mengajar/${id}/${id_kelas}/${id_prodi}`
        const updatedDataResponse = await axios.get(apiUrl, {
          withCredentials: true,
        })

        setMengajarData(updatedDataResponse.data)
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
                      <CCol xs={6}>
                        {' '}
                        <CButton
                          variant="outline"
                          color="success"
                          onClick={handleImportModal}
                          className="mx-2"
                        >
                          <CIcon icon={cilFile} className="mx-1 d-none d-md-inline" />
                          Import
                        </CButton>
                      </CCol>
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
            name="excel"
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
      </CModal>
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
