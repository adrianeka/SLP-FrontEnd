import React, { useEffect, useState } from 'react'
import {
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
  CInputGroupText,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CButtonGroup,
  CBadge,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPen, cilSearch, cilSend, cilTrash, cilShortText } from '@coreui/icons'
import axios from 'axios'

const usersData = [
  {
    id_perizinan: 0,
    tanggal_awal: '2-12-2023',
    tanggal_akhir: '2-12-2023',
    jenis: 'izin',
    keterangan: '-',
    surat: '-',
    status: 'Menunggu Verifikasi',
  },
]

const TableRekapSakit = () => {
  const [modalTolak, setModalTolak] = useState(false)
  const [modalTerima, setModalTerima] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchText, setSearchText] = useState('') // State untuk nilai pencarian
  const [modalExport, setModalExport] = useState(false)
  const [perizinanData, setPerizinanData] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const myValue = localStorage.getItem('dosenwali')
  const dosenwaliObject = JSON.parse(myValue)
  const id_dosen = dosenwaliObject.id
  const [formData, setFormData] = useState({
    keterangan_dosen: '',
  })

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = `http://localhost:8080/api/dosenWali/perizinan/sakit/${id_dosen}`

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setPerizinanData(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])
  // Pengecekan apakah mahasiswaTable adalah sebuah array
  if (!Array.isArray(usersData)) {
    console.error('mahasiswaTable is not an array')
    return null // Tampilkan pesan kesalahan atau tindakan yang sesuai
  }

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }

  const handleExportModal = () => {
    setModalExport(true)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleModalTolak = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data)
    setModalTolak(true) // Menampilkan modal
  }

  const handleModalTerima = (data) => {
    // Handle saat tombol hapus diklik
    setSelectedData(data)
    setModalTerima(true) // Menampilkan modal
  }

  const handleVerif = async (id, keterangan) => {
    // Handle form submission here, e.g., send the formData to an API
    const apiUrl = `http://localhost:8080/api/dosenWali/perizinan/update/${id}`

    // Membuat objek updateDosenWali
    const Approved = {
      status: keterangan,
      keterangan_dosen: formData.keterangan_dosen,
    }
    try {
      const response = await axios.put(apiUrl, Approved, {
        withCredentials: true,
      })
      console.log(response.data)
      setModalTerima(false)
      setPerizinanData((prevData) => prevData.filter((item) => item.id_perizinan !== id))
    } catch (error) {
      console.error('Error updating Dosen Wali:', error)
    }
  }

  const filteredData = perizinanData.filter((user) => {
    return (
      (selectedStatus === 'All' || user.status === selectedStatus) && // Filter berdasarkan status
      (searchText === '' || // Filter berdasarkan pencarian
        user.id_perizinan.toLowerCase().includes(searchText.toLowerCase()) ||
        user.tanggal_awal.toLowerCase().includes(searchText.toLowerCase()) ||
        user.tanggal_akhir.toLowerCase().includes(searchText.toLowerCase()) ||
        user.jenis.toLowerCase().includes(searchText.toLowerCase()) ||
        user.keterangan.toLowerCase().includes(searchText.toLowerCase()) ||
        user.surat.toLowerCase().includes(searchText.toLowerCase()) ||
        user.status.toLowerCase().includes(searchText.toLowerCase()))
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Data Permohonan Sakit Mahasiswa</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol xs={8}></CCol>
                  <CCol xs={4}>
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
                    <CTableHeaderCell>Nama Mahasiswa</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Surat</CTableHeaderCell>
                    <CTableHeaderCell>Alasan</CTableHeaderCell>
                    <CTableHeaderCell>Bukti Surat</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Awal</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal Akhir</CTableHeaderCell>
                    <CTableHeaderCell>status</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((user) => (
                      <CTableRow key={user.id} className="text-center">
                        <CTableDataCell>{user.mahasiswa.nama}</CTableDataCell>
                        <CTableDataCell>{user.jenis}</CTableDataCell>
                        <CTableDataCell>{user.keterangan}</CTableDataCell>
                        <CTableDataCell>
                          <CCol xs={3}>
                            <CButton variant="outline" color="success" onClick={handleExportModal}>
                              Lihat
                            </CButton>
                          </CCol>

                          <CModal
                            size="xl"
                            backdrop="static"
                            visible={modalExport}
                            onClose={() => setModalExport(false)}
                            aria-labelledby="ExportModalLabel"
                          >
                            <CModalHeader>
                              <CModalTitle id="ExportModalLabel">Bukti Surat</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                              <iframe
                                src={`http://localhost:8080/api/mahasiswa/perizinan/surat/${user.surat}`}
                                width="100%"
                                height="600px"
                              ></iframe>
                            </CModalBody>
                            <CModalFooter>
                              <CButton color="secondary" onClick={() => setModalExport(false)}>
                                Close
                              </CButton>
                            </CModalFooter>
                          </CModal>
                        </CTableDataCell>
                        <CTableDataCell>{user.tanggal_awal}</CTableDataCell>
                        <CTableDataCell>{user.tanggal_akhir}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={
                              user.status === 'Menunggu Verifikasi'
                                ? 'warning'
                                : user.status === 'Diverifikasi'
                                ? 'success'
                                : user.status === 'Ditolak'
                                ? 'danger'
                                : 'danger'
                            }
                          >
                            {user.status}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <CButton
                              color="success"
                              variant="outline"
                              className="ms-2"
                              onClick={() => handleModalTerima(user)}
                            >
                              Disetujui
                            </CButton>

                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              onClick={() => handleModalTolak(user)}
                            >
                              Ditolak
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
      {/* Modal Delete */}
      <CModal
        backdrop="static"
        visible={modalTolak}
        onClose={() => setModalTolak(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalTolak">Tolak Permohonan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Keterangan Permohonan Ditolak
          <CCol md={12}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="alasanRefuse">
                <CIcon icon={cilShortText} />
              </CInputGroupText>
              <CFormTextarea
                name="alasan"
                type="text-area"
                placeholder="Masukkan keterangan"
                floatingLabel="Keterangan"
                aria-describedby="keterangan-tolak"
                value={formData.keterangan_dosen}
                required
                onChange={(e) => setFormData({ ...formData, keterangan_dosen: e.target.value })}
              />
            </CInputGroup>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalTolak(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleVerif(selectedData.id_perizinan, 'Ditolak')}>
            Ditolak
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Terima */}
      <CModal
        backdrop="static"
        visible={modalTerima}
        onClose={() => setModalTerima(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalTolak">Terima Permohonan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Keterangan Permohonan Diterima
          <CCol md={12}>
            <CInputGroup className="mb-3">
              <CInputGroupText id="alasanTerima">
                <CIcon icon={cilShortText} />
              </CInputGroupText>
              <CFormTextarea
                name="alasan"
                type="text-area"
                placeholder="Masukkan keterangan"
                floatingLabel="Keterangan"
                aria-describedby="keterangan-terima"
                value={formData.keterangan_dosen}
                required
                onChange={(e) => setFormData({ ...formData, keterangan_dosen: e.target.value })}
              />
            </CInputGroup>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalTerima(false)}>
            Close
          </CButton>
          <CButton
            color="success"
            onClick={() => handleVerif(selectedData.id_perizinan, 'Diverifikasi')}
          >
            Disetujui
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default TableRekapSakit
