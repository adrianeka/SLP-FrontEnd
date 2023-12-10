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
import { cilPen, cilSearch, cilPlus, cilFile } from '@coreui/icons'
import { Link, useParams } from 'react-router-dom'
import '../../../assets/css/style.css'
import Swal from 'sweetalert2'

const KelolaDataMatkul = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [matkulData, setMatkulData] = useState([])
  const [modalImport, setModalImport] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const { id } = useParams()
  const { id_semester } = useParams()

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = `http://localhost:8080/api/admins/detailMatkul/${id}/${id_semester}`

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setMatkulData(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleImportModal = () => {
    setModalImport(true)
  }

  const handleDeleteModal = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data) //Mengambil data id saat ingin menghapus
    setModalDelete(true) // Menampilkan modal
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }
  const filteredData = matkulData.filter((data) => {
    const sks = data.sks.toString() // Convert to string if it's not already
    return (
      searchText === '' ||
      data.mataKuliah.id_matakuliah.toLowerCase().includes(searchText.toLowerCase()) ||
      data.mataKuliah.nama_matakuliah.toLowerCase().includes(searchText.toLowerCase()) ||
      data.mataKuliah.semester_matakuliah.toLowerCase().includes(searchText.toLowerCase()) ||
      data.tipe.toLowerCase().includes(searchText.toLowerCase()) ||
      sks.toLowerCase().includes(searchText.toLowerCase()) || // Use sks instead of data.sks
      data.prodi.nama_prodi.toLowerCase().includes(searchText.toLowerCase())
    )
  })

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
        'http://localhost:8080/api/admins/detailMatkul/create/import-excel',
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
        const apiUrl = `http://localhost:8080/api/admins/detailMatkul/${id}/${id_semester}`
        const updatedDataResponse = await axios.get(apiUrl, {
          withCredentials: true,
        })

        setMatkulData(updatedDataResponse.data)
        // Menampilkan Sweet Alert saat berhasil menambah data
        Swal.fire({
          title: 'Berhasil',
          text: `Import data excel berhasil`,
          icon: 'success',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      setLoading(false)
      setMessage(resMessage)
    }
  }

  const handleDelete = (id_matkul, id_detailmatkul) => {
    // URL API untuk menghapus data pada tabel matkul dan detailMatkul
    const apiUrlMatkul = `http://localhost:8080/api/admins/matkul/${id_matkul}`
    const apiUrlDetMatkul = `http://localhost:8080/api/admins/detailMatkul/${id_detailmatkul}`
    console.log(id_matkul)
    console.log(id_detailmatkul)

    // Menggunakan Axios untuk mengirim dua permintaan DELETE secara bersamaan
    axios
      .all([
        axios.delete(apiUrlMatkul, {
          withCredentials: true,
        }),
        axios.delete(apiUrlDetMatkul, {
          withCredentials: true,
        }),
      ])
      .then(
        axios.spread((responseMatkul, responseDetMatkul) => {
          // Handle ketika kedua permintaan DELETE berhasil
          console.log(responseMatkul.data, responseDetMatkul.data)

          // Lakukan pembaruan pada data Anda atau tindakan lain yang sesuai
          setMatkulData((prevData) =>
            prevData.filter((matkul) => matkul.id_detailMatkul !== id_detailmatkul),
          )
          // Tutup modal setelah berhasil menghapus
          setModalDelete(false)
        }),
      )
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat menghapus data
        console.error('Error deleting data:', error)
      })
  }

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <div className="fw-bold my-3 title-page">Daftar Mata Kuliah</div>
              <CForm>
                <CRow className="my-3">
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <Link to="/kelola/akademik/matkul/tambah" className="link-card">
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
                      <CCol xs={6}>
                        <CButton
                          variant="outline"
                          color="success"
                          onClick={handleImportModal}
                          className="mx-2 mt-3"
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
                    <CTableHeaderCell>Kode Mata Kuliah</CTableHeaderCell>
                    <CTableHeaderCell>Nama Mata Kuliah</CTableHeaderCell>
                    <CTableHeaderCell>Tipe</CTableHeaderCell>
                    <CTableHeaderCell>SKS</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Semeseter</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
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
                    filteredData.map((matkul) => (
                      <CTableRow key={matkul.id_detailMatkul}>
                        <CTableDataCell>{matkul.mataKuliah.id_matakuliah}</CTableDataCell>
                        <CTableDataCell>{matkul.mataKuliah.nama_matakuliah}</CTableDataCell>
                        <CTableDataCell>{matkul.tipe}</CTableDataCell>
                        <CTableDataCell>{matkul.sks}</CTableDataCell>
                        <CTableDataCell>{matkul.prodi.nama_prodi}</CTableDataCell>
                        <CTableDataCell>{matkul.mataKuliah.semester_matakuliah}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <Link
                              to={`/kelola/akademik/matkul/update/${matkul.id_detailMatkul}-${matkul.mataKuliah.id_matakuliah}`}
                            >
                              <CButton
                                color="primary"
                                variant="outline"
                                className="ms-2"
                                title="Ubah Data matkul"
                              >
                                <CIcon icon={cilPen} />
                              </CButton>
                            </Link>
                            {/* <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data matkul"
                              onClick={() => handleDeleteModal(matkul)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton> */}
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
        <CModalBody>
          Yakin ingin hapus matkul {selectedData ? selectedData.mataKuliah.id_matakuliah : ''} ?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton
            color="danger"
            onClick={() =>
              handleDelete(selectedData.mataKuliah.id_matakuliah, selectedData.id_detailMatkul)
            }
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataMatkul
