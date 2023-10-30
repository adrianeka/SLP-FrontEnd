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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import axios from 'axios'

const MahasiswaTable = () => {
  const [usersData, setMahasiswaData] = useState([])
  const myValue = localStorage.getItem('dosenwali')
  const dosenwaliObject = JSON.parse(myValue)
  const id_dosen = dosenwaliObject.id

  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/dosenWali/mahasiswa/${id_dosen}`

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
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Mahasiswa</CCardHeader>
            <CCardBody>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Mahasiswa</CTableHeaderCell>
                    <CTableHeaderCell>NIM</CTableHeaderCell>
                    <CTableHeaderCell>Total Sakit</CTableHeaderCell>
                    <CTableHeaderCell>Total Izin</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
                      <CTableDataCell>{user.sakit}</CTableDataCell>
                      <CTableDataCell>{user.izin}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default MahasiswaTable
