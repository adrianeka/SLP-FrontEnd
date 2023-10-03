import React, { useState } from 'react'
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
import {
  cilPen,
  cilSend,
  cilTrash,
  cilSearch,
  cilShortText,
  cilCalendar,
  cilClock,
} from '@coreui/icons'

const usersData = [
  {
    id: 0,
    judulSurat: 'Judul',
    tanggal: '12 September 2022',
    jenis: 'Sakit',
    alasan: '221511000',
    surat: 'dadasd.jpg',
    status: 'On Going',
  },
  {
    id: 1,
    judulSurat: 'Judul',
    tanggal: '13 September 2022',
    jenis: 'Izin',
    alasan: '221511001',
    surat: 'dadasd.jpg',
    status: 'Rejected',
  },
  {
    id: 2,
    judulSurat: 'Judul',
    tanggal: '14 September 2022',
    jenis: 'Sakit',
    alasan: '221511002',
    surat: 'dadasd.jpg',
    status: 'Accepted',
  },
]

const TableSuratMahasiswa = () => {
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table

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

  const filteredData = usersData.filter((user) => {
    //Var untuk menampung data baru
    return (
      searchText === '' || // Filter berdasarkan pencarian
      user.judulSurat.toLowerCase().includes(searchText.toLowerCase()) ||
      user.tanggal.toLowerCase().includes(searchText.toLowerCase()) ||
      user.jenis.toLowerCase().includes(searchText.toLowerCase()) ||
      user.alasan.toLowerCase().includes(searchText.toLowerCase()) ||
      user.surat.toLowerCase().includes(searchText.toLowerCase()) ||
      user.status.toLowerCase().includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Draft Surat Perizinan Mahasiswa</CCardHeader>
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
                    <CTableHeaderCell>Nama Surat</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal</CTableHeaderCell>
                    <CTableHeaderCell>Jenis Surat</CTableHeaderCell>
                    <CTableHeaderCell>Alasan</CTableHeaderCell>
                    <CTableHeaderCell>Bukti Surat</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((user) => (
                    <CTableRow key={user.id} className="text-center">
                      <CTableDataCell>{user.judulSurat}</CTableDataCell>
                      <CTableDataCell>{user.tanggal}</CTableDataCell>
                      <CTableDataCell>{user.jenis}</CTableDataCell>
                      <CTableDataCell>{user.alasan}</CTableDataCell>
                      <CTableDataCell>{user.surat}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Ubah Surat Perizinan"
                          onClick={() => handleUpdateModal(user)}
                        >
                          <CIcon icon={cilPen} />
                        </CButton>
                        <CButton
                          color="danger"
                          variant="outline"
                          className="ms-2"
                          title="Hapus Surat Perizinan"
                          onClick={() => handleDeleteModal(user)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Kirim Surat Perizinan"
                        >
                          <CIcon icon={cilSend} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>Ini Footer</CCardFooter>
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
        <CModalBody>Yakin ingin hapus {selectedData ? selectedData.id : ''} ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
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

export default TableSuratMahasiswa
