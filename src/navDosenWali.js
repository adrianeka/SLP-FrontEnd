import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilApplications,
  cilAppsSettings,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilInfo,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboardDosenWali',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Daftar Mahasiswa',
    to: '/kelolaWali/mahasiswa',
  },
  {
    component: CNavGroup,
    name: 'Permohonan',
    items: [
      {
        component: CNavItem,
        name: 'Izin',
        to: 'table/rekap/izin',
      },
      {
        component: CNavItem,
        name: 'Sakit',
        to: 'table/rekap/sakit',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Riwayat Surat Permohonan',
    to: '/riwayat/surat-permohonan',
  },
]

export default _nav
