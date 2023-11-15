import React, { useState, useEffect } from 'react'
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
  CHeader,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
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

const usersData = [
  {
    nama: 'Adrian',
    izin: 'True',
  },
  {
    nama: 'Reno',
    sakit: 'True',
  },
  {
    nama: 'Tendy',
    izin: 'True',
  },
  {
    nama: 'Taufik',
    sakit: 'True',
  },
  {
    nama: 'Mahesya',
    izin: 'True',
  },
  {
    nama: 'Rizki',
    sakit: 'True',
  },
]

const progressGroupExample1 = [
  { title: 'Matematika Diskrit', value1: 3, value2: 78 },
  { title: 'Pemrograman Berbasis Objek', value1: 56, value2: 94 },
  { title: 'Basis Data', value1: 12, value2: 67 },
  { title: 'Pengenalan Rekayasa Perangkat Lunak', value1: 43, value2: 91 },
  { title: 'Proyek 3', value1: 22, value2: 73 },
  { title: 'Komputasi Kognitif', value1: 53, value2: 82 },
]

const Dashboard = () => {
  useEffect(() => {
    const data = localStorage.getItem('dosenwali')
    if (!data) {
      window.location.href = '/login'
    } else {
      console.log(data)
    }
  })
  const [userRole, setUserRole] = useState('')
  const [dataDashboard, setDataDashboard] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('dosenwali'))
    if (!user) {
      window.location.href = '/login'
    } else {
      setUserRole(user.id)
    }
  }, [])

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = `http://localhost:8080/api/test/dosenWaliDashboard/count/${userRole}`

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        setDataDashboard(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [userRole])

  return (
    <>
      <CRow>
        <CCol xs="4">
          <CCard
            style={{
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              height: '100%',
            }}
          >
            <CCardHeader>Permohonan</CCardHeader>
            <CCardBody>{dataDashboard.totalPermohonan} </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={4}>
          <CCard>
            <CCardHeader>Sakit</CCardHeader>
            <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
              {usersData
                .filter((user) => user.sakit)
                .map((user, index) => (
                  <div key={index} className="mb-2">
                    {user.nama}
                  </div>
                ))}
              {!usersData.some((user) => user.sakit) && (
                <div className="text-center">Tidak ada data</div>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={4}>
          <CCard>
            <CCardHeader>Izin</CCardHeader>
            <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
              {usersData
                .filter((user) => user.izin)
                .map((user, index) => (
                  <div key={index} className="mb-2">
                    {user.nama}
                  </div>
                ))}
              {!usersData.some((user) => user.izin) && (
                <div className="text-center">Tidak ada data</div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <div className="mb-2" />
      <CCard>
        <CCardHeader>Mata Kuliah</CCardHeader>
        <CCardBody>
          {progressGroupExample1.map((item, index) => (
            <div className="progress-group mb-4" key={index}>
              <div className="progress-group-header d-flex flex-column">
                <span className="ms-auto fw-semibold">{item.value1}</span>
                <span className="ms-auto fw-semibold">{item.value2}</span>
              </div>
              <div className="progress-group-prepend">
                <span className="text-medium-emphasis small">{item.title}</span>
              </div>
              <div className="progress-group-bars">
                <CProgress thin color="info" value={item.value1} />
                <CProgress thin color="danger" value={item.value2} />
              </div>
            </div>
          ))}
        </CCardBody>
      </CCard>
      {/* <CCard className="mb-4">
        <CCardHeader>Total Permohonan</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="4">
              <CCard
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                }}
              >
                <CCardBody>Total Permohonan: {dataDashboard.totalPermohonan} </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                }}
              >
                <CCardBody>Sakit: {dataDashboard.jumlahSakit}</CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                }}
              >
                <CCardBody>Izin: {dataDashboard.jumlahIzin}</CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard> */}
      {/* <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - Desember 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
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
                'Desember',
              ],
              datasets: [
                {
                  label: 'Total Sakit',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: dataDashboard.jumlah_sakit_perbulan,
                  fill: true,
                },
                {
                  label: 'Total Izin',
                  backgroundColor: hexToRgba(getStyle('--cui-warning'), 10),
                  borderColor: getStyle('--cui-warning'),
                  pointHoverBackgroundColor: getStyle('--cui-warning'),
                  borderWidth: 2,
                  data: dataDashboard.jumlah_izin_perbulan,
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
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
                    stepSize: Math.ceil(totalSakitIzinSum / 5),
                    max: totalSakitIzinSum,
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
      <CCardFooter>
        <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
          {progressExample.map((item, index) => (
            <CCol className="mb-sm-2 mb-0" key={index}>
              <div className="text-medium-emphasis">{item.title}</div>
              <strong>
                {item.value} ({item.percent}%)
              </strong>
              <CProgress thin className="mt-2" color={item.color} value={item.percent} />
            </CCol>
          ))}
        </CRow>
      </CCardFooter> */}
    </>
  )
}

export default Dashboard
