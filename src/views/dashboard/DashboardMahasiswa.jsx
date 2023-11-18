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
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CBadge,
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

  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchText, setSearchText] = useState('') // State untuk nilai pencarian
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

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }
  const [modalExport, setModalExport] = useState(false)
  const handleExportModal = () => {
    setModalExport(true)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  const [modalAlasan, setModalAlasan] = useState(Array(perizinanData.length).fill(false))

  // Function to handle opening a specific modal
  const handleAlasanModal = (index) => {
    // Create a copy of the modal states array
    const newModalAlasan = [...modalAlasan]
    // Set the specified modal's state to true
    newModalAlasan[index] = true
    // Update the state
    setModalAlasan(newModalAlasan)
  }

  const filteredData = perizinanData.filter((user) => {
    return (
      (selectedStatus === 'All' || user.status === selectedStatus) && // Filter berdasarkan status
      (searchText === '' || // Filter berdasarkan pencarian
        user.id_perizinan.toLowerCase().includes(searchText.toLowerCase()) ||
        user.tanggal_awal.toLowerCase().includes(searchText.toLowerCase()) ||
        user.tanggal_akhir.toLowerCase().includes(searchText.toLowerCase()) ||
        user.jenis.toLowerCase().includes(searchText.toLowerCase()) ||
        user.keterangan.toLowerCase().includes(searchText.toLowerCase()) ||
        user.keterangan_dosen.toLowerCase().includes(searchText.toLowerCase()) ||
        user.surat.toLowerCase().includes(searchText.toLowerCase()) ||
        user.status.toLowerCase().includes(searchText.toLowerCase()))
    )
  })

  const totalPerizinan = dataDashboard.jumlahIzin + dataDashboard.jumlahSakit
  const tahunAkademik = dataDashboard.tahun_akademik

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
            <CTable striped bordered responsive>
              <CTableHead>
                <CTableRow className="text-center">
                  <CTableHeaderCell>Jenis Surat</CTableHeaderCell>
                  <CTableHeaderCell>Alasan</CTableHeaderCell>
                  <CTableHeaderCell>Bukti Surat</CTableHeaderCell>
                  <CTableHeaderCell>Tanggal Awal</CTableHeaderCell>
                  <CTableHeaderCell>Tanggal Akhir</CTableHeaderCell>
                  <CTableHeaderCell>Keterangan Dosen</CTableHeaderCell>
                  <CTableHeaderCell>status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredData.length === 0 ? (
                  <tr key="no-data">
                    <td colSpan="6" className="text-center">
                      No Data
                    </td>
                  </tr>
                ) : (
                  filteredData.map((user, index) => (
                    <CTableRow key={user.id} className="text-center">
                      <CTableDataCell>{user.jenis}</CTableDataCell>
                      <CTableDataCell>{user.keterangan}</CTableDataCell>
                      <CTableDataCell>
                        <CCol xs={3}>
                          <CButton variant="outline" color="success" onClick={handleExportModal}>
                            Lihat
                          </CButton>
                        </CCol>

                        <CModal
                          size="xl"
                          backdrop="static"
                          visible={modalExport}
                          onClose={() => setModalExport(false)}
                          aria-labelledby="ExportModalLabel"
                        >
                          <CModalHeader>
                            <CModalTitle id="ExportModalLabel">Bukti Surat</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <iframe
                              src={`http://localhost:8080/api/mahasiswa/perizinan/surat/${user.surat}`}
                              width="100%"
                              height="600px"
                            ></iframe>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setModalExport(false)}>
                              Close
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CTableDataCell>
                      <CTableDataCell>{user.tanggal_awal}</CTableDataCell>
                      <CTableDataCell>{user.tanggal_akhir}</CTableDataCell>
                      <CTableDataCell key={index}>
                        <CCol xs={3}>
                          <CButton
                            variant="outline"
                            color="warning"
                            onClick={() => handleAlasanModal(index)}
                            className="text-center"
                          >
                            Lihat
                          </CButton>
                        </CCol>

                        <CModal
                          size="xl"
                          backdrop="static"
                          visible={modalAlasan[index]}
                          onClose={() => {
                            // Create a copy of the modal states array
                            const newModalAlasan = Array.isArray(modalAlasan)
                              ? [...modalAlasan]
                              : []
                            // Set the specified modal's state to false
                            newModalAlasan[index] = false
                            // Update the state
                            setModalAlasan(newModalAlasan)
                          }}
                          aria-labelledby="AlasanModalLabel"
                        >
                          <CModalHeader>
                            <CModalTitle id="AlasanModalLabel">Keterangan Dosen</CModalTitle>
                          </CModalHeader>
                          <CModalBody>{user.keterangan_dosen}</CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setModalAlasan(false)}>
                              Close
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CTableDataCell>
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
