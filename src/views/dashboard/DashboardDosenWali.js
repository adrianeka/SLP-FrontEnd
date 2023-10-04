import React, { useState, useEffect } from 'react'

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
import usersData from './../CRUDTable/TabelMahasiswa' // Sesuaikan dengan path yang sesuai

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
  const totalSakit = getTotalSakit()
  const totalIzin = getTotalIzin()
  const totalMahasiswa = getTotalMahasiswa()
  const dataSakitIzin = getRandomTotalSakitIzin()
  const totalSakitIzinSum = dataSakitIzin.reduce((acc, value) => acc + value, 0)

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
                <CCardBody>Total Permohonan</CCardBody>
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
                <CCardBody>Sakit: {totalSakit}</CCardBody>
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
                <CCardBody>Izin: {totalIzin}</CCardBody>
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
              <div className="small text-medium-emphasis">January - July 2021</div>
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
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'Total Sakit + Izin',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: dataSakitIzin,
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
