import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBoxBody,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const DashboardMahasiswa = () => {
  useEffect(() => {
    const data = localStorage.getItem('mahasiswa')
    if (!data) {
      window.location.href = '/login'
    } else {
      console.log(data)
    }
  })
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const [dataDashboard, setDataDashboard] = useState([])
  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/test/mahasiswaDashboard'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('data ', response.data)
        setDataDashboard(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  const [dataGraph, setDataGraph] = useState([])
  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/test/adminDashboard/graph'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log('ini tuh apa', response.data)
        setDataGraph(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  const totalPerizinan = dataDashboard.jumlahIzin + dataDashboard.jumlahSakit
  const tahunAkademik = dataDashboard.tahun_akademik

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm="4">
              <CCard>
                <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
                  <div className="text-dark">Izin</div>
                  <div className="text-dark">{dataDashboard.jumlahIzin}</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard>
                <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
                  <div className="text-dark">Sakit</div>
                  <div className="text-dark">{dataDashboard.jumlahSakit}</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard>
                <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
                  <div className="text-dark">Jumlah Perizinan</div>
                  <div className="text-dark">{totalPerizinan}</div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="my-4">
        <CCardBody className="mt-4">
          <CRow>
            <CCol sm={5}>
              <h4 id="tahunAkademik" className="card-title mb-0">
                Jumlah Perizinan
              </h4>
              <div className="small text-medium-emphasis">{tahunAkademik}</div>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  label: 'Sakit',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: dataGraph.jumlah_izin_perbulan,
                  fill: true,
                  barPercentage: 0.1, // Menyesuaikan lebar bar untuk label "Sakit"
                },
                {
                  label: 'Izin',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: dataGraph.jumlah_izin_perbulan,
                  barPercentage: 0.4, // Menyesuaikan lebar bar untuk label "Izin"
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(100, 150, 200), // Sesuaikan dengan data Anda
                    max: 200, // Sesuaikan dengan data Anda
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CDropdown className="m-4">
          <CDropdownToggle color="primary">Select Option</CDropdownToggle>
          <CDropdownMenu style={{ width: '100%', maxHeight: '300px', overflowY: 'auto' }}>
            <CTable responsive>
              <CTableHead>
                <CTableRow className="text-center">
                  <CTableHeaderCell>Jenis Surat</CTableHeaderCell>
                  <CTableHeaderCell>Alasan</CTableHeaderCell>
                  <CTableHeaderCell>Bukti Surat</CTableHeaderCell>
                  <CTableHeaderCell>Tanggal Awal</CTableHeaderCell>
                  <CTableHeaderCell>Tanggal Akhir</CTableHeaderCell>
                  <CTableHeaderCell>status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>A</CTableDataCell>
                  <CTableDataCell>A</CTableDataCell>
                  <CTableDataCell>A</CTableDataCell>
                  <CTableDataCell>A</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CDropdownMenu>
        </CDropdown>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
      </CCard>
    </div>
  )
}

export default DashboardMahasiswa
