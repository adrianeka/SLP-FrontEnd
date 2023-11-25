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

const ProdiRombel = () => {
  const [searchText, setSearchText] = useState('')
  const [jadwalData, setJadwalData] = useState([])
  const [tipeProdi] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('kaprodi')
    if (!data) {
      window.location.href = '/login'
    } else {
      const dataLogin = JSON.parse(data)
      const dataId = dataLogin.id
      tipeProdi.prodi = parseInt(dataId[dataId.length - 1])
      console.log(data)
    }
  })
  const id = tipeProdi.prodi
  console.log(tipeProdi.prodi)

  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/kaprodi/jadwal/kelas/${tipeProdi.prodi}`

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
            <CCardHeader>Daftar Kelas</CCardHeader>
            <CCardBody>
              <CRow>
                {filteredData.map((prodi) => (
                  <CCol key={prodi.nama_kelas} sm={6}>
                    <CCard className="m-2">
                      <CCardBody>
                        <CCardTitle>
                          {prodi.tahun_angkatan} - {prodi.nama_kelas}
                        </CCardTitle>
                        <CCardTitle></CCardTitle>
                        <CCardText>Teknik Informatika</CCardText>
                        <Link
                          to={`/kaprodi/rekap/mahasiswa/${prodi.tahun_angkatan}/${prodi.nama_kelas}/${tipeProdi.prodi}`}
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

export default ProdiRombel
