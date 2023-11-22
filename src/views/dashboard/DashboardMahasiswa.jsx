import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
  CBadge,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const DashboardMahasiswa = () => {
  const [userRole, setUserRole] = useState('')
  const [dataDashboard, setDataDashboard] = useState([])
  useEffect(() => {
    const data = localStorage.getItem('mahasiswa')
    if (!data) {
      window.location.href = '/login'
    } else {
      console.log(data)
    }
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('mahasiswa'))
    if (!user) {
      window.location.href = '/login'
    } else {
      setUserRole(user.id)
    }
  }, [])
  useEffect(() => {
    console.log('data3' + userRole)
    // URL API yang akan diambil datanya
    const apiUrl = `http://localhost:8080/api/test/mahasiswaDashboard`

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
  }, [userRole])

  const [dataGraph, setDataGraph] = useState([])
  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/test/mahasiswaDashboard/graph'

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

  const [perizinanData, setPerizinanData] = useState([])

  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = 'http://localhost:8080/api/mahasiswa/perizinan'

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // Mengatur data dosen ke dalam state dosenData

        console.log(response.data)
        setPerizinanData(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  const totalPerizinan = dataDashboard.jumlahIzin + dataDashboard.jumlahSakit
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol xs={4}>
              <CCard>
                <CCardHeader>Izin</CCardHeader>
                <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
                  <div className="text-dark">{dataDashboard.jumlahIzin}</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={4}>
              <CCard>
                <CCardHeader>Sakit</CCardHeader>
                <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
                  <div className="text-dark">{dataDashboard.jumlahSakit}</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={4}>
              <CCard>
                <CCardHeader>Jumlah Perizinan</CCardHeader>
                <CCardBody className="overflow-auto" style={{ maxHeight: '300px' }}>
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
              {/* <div className="small text-medium-emphasis">{tahunAkademik}</div> */}
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
                  data: dataGraph.jumlah_sakit_perbulan,
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
            <CTable striped bordered responsive>
              <CTableHead>
                <CTableRow className="text-center">
                  <CTableHeaderCell>Jenis Surat</CTableHeaderCell>
                  <CTableHeaderCell>Alasan</CTableHeaderCell>
                  <CTableHeaderCell>Tanggal Awal</CTableHeaderCell>
                  <CTableHeaderCell>Tanggal Akhir</CTableHeaderCell>
                  <CTableHeaderCell>status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {perizinanData.length === 0 ? (
                  <tr key="no-data">
                    <td colSpan="6" className="text-center">
                      No Data
                    </td>
                  </tr>
                ) : (
                  perizinanData.map((user, index) => (
                    <CTableRow key={user.id} className="text-center">
                      <CTableDataCell>{user.jenis}</CTableDataCell>
                      <CTableDataCell>{user.keterangan}</CTableDataCell>
                      <CTableDataCell>{user.tanggal_awal}</CTableDataCell>
                      <CTableDataCell>{user.tanggal_akhir}</CTableDataCell>
                      <CTableDataCell>
                        {user.status !== 'Draft' && (
                          <CBadge
                            color={
                              user.status === 'Menunggu Verifikasi'
                                ? 'warning'
                                : user.status === 'Diverifikasi'
                                ? 'success'
                                : 'danger'
                            }
                          >
                            {user.status}
                          </CBadge>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
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
