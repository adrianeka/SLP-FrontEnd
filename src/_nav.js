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
    to: '/dashboard',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: ' ',
  },
  {
    component: CNavTitle,
    name: 'Pengelolaan',
    to: '/dashboard',
  },
  {
    component: CNavGroup,
    name: 'Kelola Data',
    items: [
      {
        component: CNavItem,
        name: 'Mahasiswa',
        to: '/kelola/mahasiswa',
      },
      {
        component: CNavItem,
        name: 'Dosen Pengampu',
        to: '/kelola/dosen/pengampu',
      },
      {
        component: CNavItem,
        name: 'Dosen Wali',
        to: '/kelola/dosen/wali',
      },
      {
        component: CNavItem,
        name: 'Kaprodi',
        to: '/kelola/kaprodi',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Rekap Data Mahasiswa',
    to: '/#',
  },
  {
    component: CNavItem,
    name: 'Kelola Akademik',
    to: '#',
  },
  {
    component: CNavTitle,
    name: 'App',
  },
]

export default _nav
