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
  CFormSelect,
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
import { CChart } from '@coreui/react-chartjs'
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

const DashboardKaprodi = () => {
  const [tipeProdi] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('kaprodi')
    if (!data) {
      window.location.href = '/login'
    } else {
      const dataLogin = JSON.parse(data)
      const dataId = dataLogin.id
      tipeProdi.prodi = parseInt(dataId[dataId.length - 1])
    }
  })

  const [dataCard, setDataDashboard] = useState([])
  useEffect(() => {
    // URL API yang akan diambil datanya
    const apiUrl = `http://localhost:8080/api/kaprodiDashboard/card/${tipeProdi.prodi}`

    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get(apiUrl, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log('data ', response.data)
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
    const apiUrl = `http://localhost:8080/api/kaprodiDashboard/graph/${tipeProdi.prodi}`

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

  const renderBarChart = (label, data, color) => {
    return {
      label: label,
      backgroundColor: hexToRgba(color, 10),
      borderColor: color,
      pointHoverBackgroundColor: color,
      borderWidth: 2,
      data: data,
      fill: true,
      barPercentage: 0.4, // Menyesuaikan lebar bar
    }
  }

  const generateBarChartData = (tipe) => {
    if (!dataGraph[tipe]) {
      return { labels: [], datasets: [] }
    }

    const labels = Object.keys(dataGraph[tipe])
    const datasets = []

    // Loop melalui setiap kelas
    for (const kelas in dataGraph[tipe][labels[0]]) {
      const data = []

      // Loop melalui setiap angkatan
      for (const angkatan of labels) {
        data.unshift(dataGraph[tipe][angkatan][kelas] || 0)
      }

      // Generate data untuk grafik batang
      datasets.unshift(renderBarChart(kelas, data, getStyle('--cui-info')))
    }

    return { labels, datasets }
  }

  console.log('dataGraph di luar setelah nyeting', dataGraph)

  // console.log(generateBarChartData('sakit').labels)
  // console.log(generateBarChartData('sakit').datasets)
  // console.log(generateBarChartData('izin').labels)
  // console.log(generateBarChartData('izin').datasets)

  return (
    <CRow>
      <CCol sm="12">
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm="4">
                <CCard
                  style={{
                    backgroundColor: 'rgb(220, 220, 220)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    textAlign: 'center',
                  }}
                >
                  <CCardBody
                    style={{
                      paddingTop: '4rem',
                    }}
                  >
                    <div className="text-dark">Sakit</div>
                    <div className="text-dark">{dataCard.jumlahSakit}</div>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm="4">
                <CCard
                  style={{
                    backgroundColor: 'rgb(220, 220, 220)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    textAlign: 'center', // Memposisikan teks ke tengah secara horizontal
                  }}
                >
                  <CCardBody
                    style={{
                      paddingTop: '4rem',
                    }}
                  >
                    <div className="text-dark">Izin</div>
                    <div className="text-dark">{dataCard.jumlahIzin}</div>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm="4">
                <CCard
                  style={{
                    backgroundColor: 'rgb(220, 220, 220)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    textAlign: 'center', // Memposisikan teks ke tengah secara horizontal
                  }}
                >
                  <CCardBody
                    style={{
                      paddingTop: '4rem',
                    }}
                  >
                    <div className="text-dark">Tahun Akademik</div>
                    <div className="text-dark">{dataCard.tahunAkademik}</div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        {['sakit', 'izin'].map((tipe) => (
          <CCard key={tipe} className="mb-4">
            <CCardBody className="mt-4">
              <CRow>
                <CCol sm={5}>
                  <h4 id="tahunAkademik" className="card-title mb-0">
                    {tipe === 'sakit' ? 'Detail Jumlah Sakit' : 'Detail Jumlah Izin'}
                  </h4>
                  <div className="small text-medium-emphasis">{dataGraph.tahunAkademik}</div>
                </CCol>
              </CRow>
              <CChart
                type="bar"
                data={{
                  labels: generateBarChartData(tipe).labels,
                  datasets: generateBarChartData(tipe).datasets,
                }}
                labels="months"
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: getStyle('--cui-body-color'),
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Angkatan',
                        color: getStyle('--cui-body-color'),
                      },
                      grid: {
                        color: getStyle('--cui-border-color-translucent'),
                      },
                      ticks: {
                        color: getStyle('--cui-body-color'),
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Jumlah',
                        color: getStyle('--cui-body-color'),
                      },
                      grid: {
                        color: getStyle('--cui-border-color-translucent'),
                      },
                      ticks: {
                        color: getStyle('--cui-body-color'),
                      },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        ))}
      </CCol>
    </CRow>
  )
}

export default DashboardKaprodi
