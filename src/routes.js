import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MahasiswaTable = React.lazy(() => import('./views/CRUDTable/CRUDTable'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const DosenTablePengampu = React.lazy(() => import('./views/CRUDTable/TableDosenPengampu'))
const TableDosenWali = React.lazy(() => import('./views/CRUDTable/TableDosenWali'))
const TableKaprodi = React.lazy(() => import('./views/CRUDTable/TableKaprodi'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/kelola/mahasiswa', name: 'Tabel Mahasiswa', element: MahasiswaTable },
  { path: '/kelola/mahasiswa/orangtua', name: 'Table Orang Tua/Wali Mahasiswa', element: Tables },
  { path: '/kelola/dosen/pengampu', name: 'Tabel Dosen Pengampu', element: DosenTablePengampu },
  { path: '/kelola/dosen/wali', name: 'Tabel Dosen Wali', element: TableDosenWali },
  { path: '/kelola/kaprodi', name: 'Tabel Kaprodi', element: TableKaprodi },
]

export default routes
