import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Prodi = () => {
  const [searchText, setSearchText] = useState('')
  const [jadwalData, setJadwalData] = useState([])

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/admins/prodi'

    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        setJadwalData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const filteredData = jadwalData.filter((data) =>
    data.nama_prodi.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Prodi</CCardHeader>
            <CCardBody>
              <CCol md={8} xs={6} className="mb-3">
                <CRow>
                  <CCol md={2}>
                    <Link to="/kelola/akademik/matkul/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilUserPlus} className="mx-2" />
                        Create
                      </CButton>
                    </Link>
                  </CCol>
                  <CCol xs={6}></CCol>
                </CRow>
              </CCol>
              <CRow>
                {filteredData.map((prodi) => (
                  <CCol key={prodi.id_prodi} sm={6}>
                    <CCard>
                      <CCardBody>
                        <CCardTitle>{prodi.nama_prodi}</CCardTitle>
                        <CCardText>Teknik Informatika</CCardText>
                        <Link to={`/kelola/matakuliah/list-semester/${prodi.id_prodi}`}>
                          <CButton className="btn btn-info text-white">Select</CButton>
                        </Link>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Prodi
