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
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

const Dashboard = () => {
  useEffect(() => {
    const data = localStorage.getItem('admin')
    if (data) {
    } else {
      window.location.href = '/login'
    }
  })

  const [semesterData, setSemesterData] = useState([])
  useEffect(() => {
    const apiUrl = 'http://localhost:8080//api/mahasiswa/semester/active' // Replace with your actual API endpoint
    axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        setSemesterData(response.data)
        console.log(response.data) // Assuming your response data is an array of objects with value and label properties
      })
      .catch((error) => {
        console.error('Error fetching Semester data:', error)
      })
  }, [])

  const [dataDashboard, setDataDashboard] = useState([])
  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/test/adminDashboard'

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
  }, [])
  console.log('Semester', semesterData.nama_semester)
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const tahunAkademik = dataDashboard.tahun_akademik
    ? dataDashboard.tahun_akademik.split(' ')[1]
    : ''

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm="4">
              <CCard
                style={{
                  backgroundColor: 'green',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  textAlign: 'center', // Memposisikan teks ke tengah secara horizontal
                }}
              >
                <CCardBody>
                  <div className="text-white">Izin</div>
                  <div className="text-white">{dataDashboard.jumlahIzin}</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard
                style={{
                  backgroundColor: 'yellow',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  textAlign: 'center', // Memposisikan teks ke tengah secara horizontal
                }}
              >
                <CCardBody>
                  <div className="text-dark">Sakit</div>
                  <div>{dataDashboard.jumlahSakit}</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="4">
              <CCard
                style={{
                  backgroundColor: 'blue',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  textAlign: 'center', // Memposisikan teks ke tengah secara horizontal
                }}
              >
                <CCardBody>
                  <div className="text-white">Tahun Akademik</div>
                  <div className="text-white">{dataDashboard.tahun_akademik}</div>
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
                  data: [50, 60, 45, 70, 80, 90, 75, 65, 70, 60, 55, 40], // Isi dengan data jumlah sakit per bulan
                  fill: true,
                  barPercentage: 0.1, // Menyesuaikan lebar bar untuk label "Sakit"
                },
                {
                  label: 'Izin',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [20, 30, 25, 35, 40, 45, 30, 25, 30, 25, 20, 15], // Isi dengan data jumlah izin per bulan
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
    </>
  )
}

export default Dashboard
