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
  CButtonGroup,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilSearch, cilFile, cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../../assets/css/style.css'

const TableKaprodi = () => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [modalDelete, setModalDelete] = useState(false)
  const [kaprodiData, setKaprodiData] = useState([])
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/admins/kaprodi'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData
        const kaprodiData = response.data.map((item) => {
          return {
            id_kaprodi: item.id_kaprodi,
            username: item.username,
            password: item.password,
            dosen_id: item.dosen_id,
            prodi_id: item.prodi_id,
            prodi: item.prodi ? item.prodi.nama_prodi : '', // Mengambil nama_prodi dari objek prodi jika ada
            dosen: item.dosen ? item.dosen.nama_dosen : '', // Mengambil nama_dosen dari objek dosen jika ada
          }
        })

        console.log(kaprodiData)

        setKaprodiData(kaprodiData)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleDelete = (id_kaprodi) => {
    const apiUrl = `http://localhost:8080/api/admins/kaprodi/destroy/${id_kaprodi}`

    // Send a DELETE request to delete the data
    axios
      .delete(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Data berhasil dihapus:', response.data)

        // Update the state to remove the deleted data
        setKaprodiData((prevData) =>
          prevData.filter((kaprodi) => kaprodi.id_kaprodi !== id_kaprodi),
        )
        setModalDelete(false) // Close the delete modal

        // Menampilkan Sweet Alert saat berhasil menghapus data
        Swal.fire({
          title: 'Berhasil',
          text: `Data ${selectedData ? selectedData.dosen : ''} berhasil dihapus.`,
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

  const handleDeleteModal = (data) => {
    setSelectedData(data)
    setModalDelete(true)
  }

  const filteredData = kaprodiData.filter((data) => {
    //Search filter data
    return (
      searchText === '' ||
      data.prodi.toLowerCase().includes(searchText.toLowerCase()) ||
      data.dosen.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <div className="fw-bold mt-3 mb-5 title-page">Daftar Kaprodi</div>
              <CButtonGroup>
                <Link to={'/kelola/kaprodi/tambah'}>
                  <CButton variant="outline" color="dark">
                    <CIcon icon={cilUserPlus} className="mx-1 d-none d-md-inline" />
                    Create
                  </CButton>
                </Link>
              </CButtonGroup>
              <CForm className="mb-3"></CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Kaprodi</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {kaprodiData.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    kaprodiData.map((user) => (
                      <CTableRow key={user.id_kaprodi}>
                        <CTableDataCell>{user.dosen}</CTableDataCell>
                        <CTableDataCell>{user.prodi}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            {/* <Link to={`/kelola/kaprodi/update/${user.id}`}>
                              <CButton
                                color="primary"
                                variant="outline"
                                className="ms-2"
                                title="Ubah Data matkul"
                              >
                                <CIcon icon={cilPen} />
                              </CButton>
                            </Link> */}
                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data matkul"
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
          </CCard>
        </CCol>
      </CRow>
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
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.dosen : ''} ?</CModalBody>
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
            onClick={() => handleDelete(selectedData ? selectedData.id_kaprodi : null)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default TableKaprodi
