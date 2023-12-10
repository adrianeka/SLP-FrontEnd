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
import { cilChevronRight, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import '../../../assets/css/style.css'

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
          <CCard className="custom-card">
            <CCardBody>
              <div className="fw-bold my-3 title-page">Daftar Prodi</div>
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
                    <CCol xs={10}>
                      <div className="">Mata Kuliah</div>
                    </CCol>
                  </CRow>
                </CButton>
              </Link>
              <CRow>
                {filteredData.map((prodi) => (
                  <CCol key={prodi.id_prodi} sm={6}>
                    <Link
                      to={`/kelola/matakuliah/list-semester/${prodi.id_prodi}`}
                      className="link-card"
                    >
                      <CCard className="mt-2 link-card">
                        <CCardBody>
                          <CRow>
                            <CCol xs={11}>
                              <CCardTitle>{prodi.nama_prodi}</CCardTitle>
                              <CCardText>Teknik Informatika</CCardText>
                            </CCol>
                            <CCol xs={1} className="d-flex align-items-center">
                              <CIcon icon={cilChevronRight} size="xl" />
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCard>
                    </Link>
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
