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

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import rekapDashboard from './item/rekapDashboard'

const usersData = [
  { id: 0, nama: 'Adrian', nim: '221511000', sakit: '3', izin: '0' },
  { id: 1, nama: 'Reno', nim: '221511000', sakit: '4', izin: '8' },
  { id: 2, nama: 'Mahesya', nim: '221511000', sakit: '0', izin: '2' },
  { id: 3, nama: 'Taufik', nim: '221511000', sakit: '1', izin: '2' },
  { id: 4, nama: 'Rizki', nim: '221511000', sakit: '2', izin: '1' },
  { id: 5, nama: 'Tendy', nim: '221511000', sakit: '1', izin: '0' },
]

const getTotalSakit = () => {
  const totalSakit = usersData.reduce((acc, user) => acc + parseInt(user.sakit), 0)
  return totalSakit
}

const getTotalIzin = () => {
  const totalIzin = usersData.reduce((acc, user) => acc + parseInt(user.izin), 0)
  return totalIzin
}

const getTotalMahasiswa = () => {
  return usersData.length
}

const getRandomTotalSakitIzin = () => {
  const totalSakit = getTotalSakit()
  const totalIzin = getTotalIzin()
  const totalMahasiswa = getTotalMahasiswa()
  const dataSakitIzin = []

  for (let i = 0; i < 7; i++) {
    // Generate random values for sakit + izin
    const randomValue = Math.floor(Math.random() * ((totalSakit + totalIzin) / 3) * 2) + 1
    dataSakitIzin.push(randomValue)
  }

  return dataSakitIzin
}

const calculatePercentage = (value, total) => {
  return ((value / total) * 100).toFixed(2)
}

const Dashboard = () => {
  useEffect(() => {
    const data = localStorage.getItem('dosenwali')
    if (!data) {
      window.location.href = '/login'
    } else {
      console.log(data)
    }
  })
  const totalSakit = getTotalSakit()
  const totalIzin = getTotalIzin()
  const totalMahasiswa = getTotalMahasiswa()
  const dataSakitIzin = getRandomTotalSakitIzin()
  const totalSakitIzinSum = dataSakitIzin.reduce((acc, value) => acc + value, 0)
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

  const progressExample = [
    {
      title: 'Sakit 6 Bulan Terakhir',
      value: `${totalSakit} Users`,
      percent: calculatePercentage(totalSakit, totalSakit + totalIzin),
      color: 'info',
    },
    {
      title: 'Izin 6 BUlan Terakhir',
      value: `${totalIzin} Users`,
      percent: calculatePercentage(totalIzin, totalSakit + totalIzin),
      color: 'warning',
    },
  ]

  return (
    <>
      <CCard className="mb-4">
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
      </CCard>
      <CCard className="mb-4">
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
      </CCardFooter>
    </>
  )
}

export default Dashboard
