import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

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
  CFormSelect,
} from '@coreui/react'
import { cilPen, cilTrash, cilUserPlus, cilShortText, cilSearch } from '@coreui/icons'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

const usersData = [
  { id: 0, tingkat: '2023', kelas: 'A', prodi: 'D3', wali: 'Dosen' },
  { id: 1, tingkat: '2023', kelas: 'B', prodi: 'D3', wali: 'Dosen' },
  { id: 2, tingkat: '2023', kelas: 'C', prodi: 'D3', wali: 'Dosen' },
  { id: 3, tingkat: '2023', kelas: 'A', prodi: 'D4', wali: 'Dosen' },
  { id: 4, tingkat: '2023', kelas: 'B', prodi: 'D4', wali: 'Dosen' },
  { id: 5, tingkat: '2022', kelas: 'A', prodi: 'D3', wali: 'Dosen' },
  { id: 6, tingkat: '2022', kelas: 'B', prodi: 'D3', wali: 'Dosen' },
  { id: 7, tingkat: '2022', kelas: 'A', prodi: 'D4', wali: 'Dosen' },
  { id: 8, tingkat: '2022', kelas: 'B', prodi: 'D4', wali: 'Dosen' },
  { id: 9, tingkat: '2021', kelas: 'A', prodi: 'D3', wali: 'Dosen' },
  { id: 10, tingkat: '2021', kelas: 'B', prodi: 'D3', wali: 'Dosen' },
  { id: 11, tingkat: '2021', kelas: 'A', prodi: 'D4', wali: 'Dosen' },
  { id: 12, tingkat: '2021', kelas: 'B', prodi: 'D4', wali: 'Dosen' },
]

const KelolaDataDosenWali = () => {
  const [modalDelete, setModalDelete] = useState(false) //Handle Klik Modal Delete
  const [modalCreate, setModalCreate] = useState(false) //Handle Klik Modal Create
  const [selectedData, setSelectedData] = useState(null) //State untuk mengambil id dari table
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [dosenData, setDosenData] = useState([]) //State untuk menampung data dosen
  const [isCreateMode, setIsCreateMode] = useState(true) // State untuk set modal jadi update atau create

  useEffect(() => {
    // URL API untuk mengambil data dosen
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
    setSelectedData(data) //Mengambil data id saat ingin menghapus
    setModalDelete(true) // Menampilkan modal
  }
  const handleCreateModal = (e) => {
    //Handle saat tombol create di klik
    setModalCreate(true) //Menampilkan Modal
  }
  const handleUpdateModal = (data) => {
    //Handle Saat tombol update di klik
    setIsCreateMode(false) //setUpdate
    setSelectedData(data) //Mengambil data saat ingin update
    setModalCreate(true) //Menampilkan Modal
  }
  const handleSearchChange = (e) => {
    //Handle search saat di ketik
    setSearchText(e.target.value)
  }
  const filteredData = usersData.filter((data) => {
    //Search filter data
    return (
      searchText === '' ||
      data.tingkat.toLowerCase().includes(searchText.toLowerCase()) ||
      data.prodi.toLowerCase().includes(searchText.toLowerCase()) ||
      data.kelas.toLowerCase().includes(searchText.toLowerCase()) ||
      data.wali.toLowerCase().includes(searchText.toLowerCase())
    )
  })
  console.log(dosenData)
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Dosen Wali</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={8} xs={6}>
                    <CRow>
                      <CCol md={2}>
                        <CButton variant="outline" onClick={handleCreateModal}>
                          <CIcon icon={cilUserPlus} className="mx-2" />
                          Create
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
                    <CTableHeaderCell>Angkatan</CTableHeaderCell>
                    <CTableHeaderCell>Prodi</CTableHeaderCell>
                    <CTableHeaderCell>Kelas</CTableHeaderCell>
                    <CTableHeaderCell>Dosen Wali</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((data) => (
                    <CTableRow key={data.id}>
                      <CTableDataCell>{data.tingkat}</CTableDataCell>
                      <CTableDataCell>{data.prodi}</CTableDataCell>
                      <CTableDataCell>{data.kelas}</CTableDataCell>
                      <CTableDataCell>{data.wali}</CTableDataCell>
                      <CTableDataCell>
                        <CCol>
                          <CButton
                            color="primary"
                            variant="outline"
                            className="ms-2"
                            title="Ubah Data Dosen"
                            onClick={() => handleUpdateModal(data)}
                          >
                            <CIcon icon={cilPen} />
                          </CButton>
                          <CButton
                            color="danger"
                            variant="outline"
                            className="ms-2"
                            title="Hapus Data Dosen"
                            onClick={() => handleDeleteModal(data)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
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
        <CModalBody>Yakin ingin delete?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalDelete(false)}>
            Close
          </CButton>
          <CButton color="danger">Delete</CButton>
        </CModalFooter>
      </CModal>
      {/* Modal create */}
      <CModal
        backdrop="static"
        visible={modalCreate}
        onClose={() => {
          setModalCreate(false)
          setIsCreateMode(true)
        }}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="CreateModall">{isCreateMode ? 'Create' : 'Update'}</CModalTitle>
        </CModalHeader>
        <CForm className="row g-3 mx-2 my-2">
          <CCol xs={12}>
            <CInputGroup>
              <CInputGroupText id="Tingkat">
                <CIcon icon={cilShortText} />
              </CInputGroupText>
              <CFormSelect
                id="Angkatan"
                style={{ height: '100%' }}
                value={isCreateMode ? '' : selectedData ? selectedData.tingkat : ''}
              >
                <option selected hidden>
                  Angkatan
                </option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2023">2022</option>
                <option value="2024">2023</option>
              </CFormSelect>
            </CInputGroup>
          </CCol>
          <CCol xs={12}>
            <CInputGroup>
              <CInputGroupText id="Prodi">
                <CIcon icon={cilShortText} />
              </CInputGroupText>
              <CFormSelect
                id="Prodi"
                style={{ height: '100%' }}
                value={isCreateMode ? '' : selectedData ? selectedData.prodi : ''}
              >
                <option selected hidden>
                  Prodi
                </option>
                <option value="D3">D3</option>
                <option value="D4">D4</option>
              </CFormSelect>
            </CInputGroup>
          </CCol>
          <CCol xs={12}>
            <CInputGroup>
              <CInputGroupText id="Kelas">
                <CIcon icon={cilShortText} />
              </CInputGroupText>
              <CFormSelect
                id="Kelas"
                style={{ height: '100%' }}
                value={isCreateMode ? '' : selectedData ? selectedData.kelas : ''}
              >
                <option selected hidden>
                  Kelas
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </CFormSelect>
            </CInputGroup>
          </CCol>
          <CCol xs={12}>
            <CRow>
              <CInputGroup>
                <CInputGroupText id="Dosen Wali">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CCol>
                  <Select
                    id="Dosen Wali"
                    options={dosenData.map((data) => ({
                      value: data.kode_dosen,
                      label: data.nama_dosen,
                    }))}
                    isSearchable
                    isClearable
                  />
                </CCol>
              </CInputGroup>
            </CRow>
          </CCol>
        </CForm>
        <CModalFooter>
          <CButton
            color="secondary"
            onClose={() => {
              setModalCreate(false)
              setIsCreateMode(true)
            }}
          >
            Close
          </CButton>
          <CButton color="primary">{isCreateMode ? 'Submit' : 'Save'}</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default KelolaDataDosenWali
