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
  cilEnvelopeClosed,
  cilInfo,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilShortText,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navMhs = [
  {
    component: CNavItem,
    name: 'Dashboard Mahasiswa',
    to: '/dashboardMhs',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Pengajuan Surat Izin/Sakit',
  },
  //   {
  //     component: CNavGroup,
  //     name: 'Pengajuan',
  //     icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
  //     items: [
  //       {
  //         component: CNavItem,
  //         name: 'Pengajuan Surat',
  //         to: '/pengajuan/form',
  //       },
  //       {
  //         component: CNavItem,
  //         name: 'Draft Surat',
  //         to: '/pengajuan/drafts',
  //       },
  //       {
  //         component: CNavItem,
  //         name: 'Riwayat Surat',
  //         to: '/kelola/dosen/pengampu',
  //       },
  //     ],
  //   },
  {
    component: CNavGroup,
    name: 'Form Pengajuan',
    items: [
      {
        component: CNavItem,
        name: 'Sakit',
        to: '/pengajuan/form/sakit',
      },
      {
        component: CNavItem,
        name: 'Izin',
        to: '/pengajuan/form/izin',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Draft Surat',
    to: '/drafts',
  },
  {
    component: CNavItem,
    name: 'Riwayat Surat',
    to: '/riwayat',
  },
  {
    component: CNavTitle,
    name: 'App',
  },
  {
    component: CNavItem,
    name: 'Setting',
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
    to: '/#',
  },
  {
    component: CNavItem,
    name: 'About',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
    to: '/#',
  },
]

export default navMhs
