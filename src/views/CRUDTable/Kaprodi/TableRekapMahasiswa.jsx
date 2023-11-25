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
import { Link, useParams } from 'react-router-dom'

const MahasiswaTable = () => {
  const [usersData, setMahasiswaData] = useState([])
  const currentYear = new Date().getFullYear()
  const { id } = useParams()
  const { angkatan } = useParams()
  const { kelas } = useParams()
  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/kaprodi/rekap/mahasiswa/${angkatan}/${kelas}/${id}`

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
            <CCardHeader>
              Daftar Mahasiswa Kelas {angkatan} - {kelas}
            </CCardHeader>
            <CCardBody>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Mahasiswa</CTableHeaderCell>
                    <CTableHeaderCell>NIM</CTableHeaderCell>

                    <CTableHeaderCell>Kelas</CTableHeaderCell>
                    <CTableHeaderCell>Total Jam Pelajaran Sakit</CTableHeaderCell>
                    <CTableHeaderCell>Total Jam Pelajaran Izin</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersData.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.nama}</CTableDataCell>
                      <CTableDataCell>{user.nim}</CTableDataCell>
                      <CTableDataCell>
                        {currentYear - user.angkatan.tahun_angkatan + 1 + user.kela.nama_kelas}
                      </CTableDataCell>

                      <CTableDataCell>{user.total_sakit_hours}</CTableDataCell>
                      <CTableDataCell>{user.total_izin_hours}</CTableDataCell>
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
