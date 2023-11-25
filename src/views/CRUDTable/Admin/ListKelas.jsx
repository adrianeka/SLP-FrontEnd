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
          <CCard>
            <CCardHeader>Daftar Prodi</CCardHeader>
            <CCardBody>
              <CRow>
                {filteredData.map((prodi) => (
                  <CCol key={prodi.nama_kelas} sm={6}>
                    <CCard>
                      <CCardBody>
                        <CCardTitle>
                          {prodi.tahun_angkatan} - {prodi.nama_kelas}
                        </CCardTitle>
                        <CCardTitle></CCardTitle>
                        <CCardText>Teknik Informatika</CCardText>
                        <Link
                          to={`/kelola/akademik/mengajar/${prodi.tahun_angkatan}/${prodi.nama_kelas}/${id}`}
                        >
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

export default ListKelas
