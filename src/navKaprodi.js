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

const navKaprodi = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard/kaprodi',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavItem,
  //   name: 'Rekap Data Mahasiswa',
  //   to: '/#',
  // },
]

export default navKaprodi
