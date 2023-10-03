import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MahasiswaTable = React.lazy(() => import('./views/CRUDTable/CRUDTable'))
const DosenTablePengampu = React.lazy(() => import('./views/CRUDTable/TableDosenPengampu'))
const TableDosenWali = React.lazy(() => import('./views/CRUDTable/TableDosenWali'))
const TableKaprodi = React.lazy(() => import('./views/CRUDTable/TableKaprodi'))
const DashboardMahasiswa = React.lazy(() => import('./views/dashboard/DashboardMahasiswa'))
const TableSuratMahasiswa = React.lazy(() => import('./views/CRUDTable/Mahasiswa/TableSurat'))
const FormSakitMhs = React.lazy(() => import('./views/form/Mahasiswa/FormSakitMhs'))
const FormIzinMhs = React.lazy(() => import('./views/form/Mahasiswa/FormIzinMhs'))
const RiwayatSurat = React.lazy(() => import('./views/CRUDTable/Mahasiswa/RiwayatSurat'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/kelola/mahasiswa', name: 'Tabel Mahasiswa', element: MahasiswaTable },
  {
    path: '/kelola/mahasiswa/orangtua',
    name: 'Table Orang Tua/Wali Mahasiswa',
    element: MahasiswaTable,
  },
  { path: '/kelola/dosen/pengampu', name: 'Tabel Dosen Pengampu', element: DosenTablePengampu },
  { path: '/kelola/dosen/wali', name: 'Tabel Dosen Wali', element: TableDosenWali },
  { path: '/kelola/kaprodi', name: 'Tabel Kaprodi', element: TableKaprodi },
  { path: '/dashboardMhs', name: 'Dashboard Mahasiswa', element: DashboardMahasiswa },
  { path: '/drafts', name: 'Draft Surat Perizinan', element: TableSuratMahasiswa },
  {
    path: '/pengajuan/form/sakit',
    name: 'Formulir Pengajuan Surat Perizinan Sakit',
    element: FormSakitMhs,
  },
  {
    path: '/pengajuan/form/izin',
    name: 'Formulir Pengajuan Surat Perizinan Izin',
    element: FormIzinMhs,
  },
  {
    path: '/riwayat',
    name: 'Riwayat Surat Perizinan Mahasiswa',
    element: RiwayatSurat,
  },
]

export default routes
