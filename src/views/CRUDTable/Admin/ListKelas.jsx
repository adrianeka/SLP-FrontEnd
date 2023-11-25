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
import { Link, useParams } from 'react-router-dom'
import '../../../assets/css/style.css'
import CIcon from '@coreui/icons-react'
import { cilChevronRight } from '@coreui/icons'

const ListKelas = () => {
  const [searchText, setSearchText] = useState('')
  const [jadwalData, setJadwalData] = useState([])

  const { id } = useParams()

  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/admins/jadwal/kelas/${id}`

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

  const filteredData = jadwalData.filter(
    (data) =>
      data.nama_kelas.toLowerCase().includes(searchText.toLowerCase()) ||
      data.tahun_angkatan.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div>
      <CRow>
        <CCol>
          <CCard className="custom-card">
            <CCardBody>
              <div className="fw-bold my-3 title-page">Daftar Kelas</div>
              <CRow>
                {filteredData.map((prodi) => (
                  <CCol key={prodi.nama_kelas} sm={6}>
                    <Link
                      to={`/kelola/akademik/mengajar/${prodi.tahun_angkatan}/${prodi.nama_kelas}/${id}`}
                      className="link-card"
                    >
                      <CCard className="mt-2 link-card">
                        <CCardBody>
                          <CRow>
                            <CCol xs={11}>
                              <CCardTitle>
                                {prodi.tahun_angkatan} - {prodi.nama_kelas}
                              </CCardTitle>
                              <CCardTitle></CCardTitle>
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

export default ListKelas
