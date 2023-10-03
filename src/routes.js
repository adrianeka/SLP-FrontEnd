import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MahasiswaTable = React.lazy(() => import('./views/CRUDTable/CRUDTable'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const IzinRekapPage = React.lazy(() => import('./views/CRUDTable/IzinRekapPage'))
const SakitRekapPage = React.lazy(() => import('./views/CRUDTable/SakitRekapPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/kelola/mahasiswa', name: 'Tabel Mahasiswa', element: MahasiswaTable },
  { path: '/rekap/izin', name: 'Tabel Izin Mahasiswa', element: IzinRekapPage },
  { path: '/rekap/sakit', name: 'Tabel Sakit Mahasiswa', element: SakitRekapPage },
]

export default routes
