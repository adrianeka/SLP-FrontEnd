import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TableDosenWali = React.lazy(() => import('./views/CRUDTable/TableDosenWali'))
const TableKaprodi = React.lazy(() => import('./views/CRUDTable/TableKaprodi'))
const KelolaDataMhs = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataMhs'))
const FormTambahMhs = React.lazy(() => import('./views/form/Admin/formCreateMhs'))
const FormUpdateMhs = React.lazy(() => import('./views/form/Admin/formUpdateMhs'))
const KelolaDataDosenPengampu = React.lazy(() =>
  import('./views/CRUDTable/Admin/KelolaDataDosenPengampu'),
)
const FormTambahDosen = React.lazy(() => import('./views/form/Admin/formCreateDosen'))
// Mahasiswa
const DashboardMahasiswa = React.lazy(() => import('./views/dashboard/DashboardMahasiswa'))
const TableSuratMahasiswa = React.lazy(() => import('./views/CRUDTable/Mahasiswa/TableSurat'))
const FormSakitMhs = React.lazy(() => import('./views/form/Mahasiswa/FormSakitMhs'))
const FormIzinMhs = React.lazy(() => import('./views/form/Mahasiswa/FormIzinMhs'))
const RiwayatSurat = React.lazy(() => import('./views/CRUDTable/Mahasiswa/RiwayatSurat'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/kelola/mahasiswa', name: 'Tabel Mahasiswa', element: KelolaDataMhs },
  { path: '/kelola/mahasiswa/tambah', name: 'Form Create Mahasiswa', element: FormTambahMhs },
  { path: '/kelola/mahasiswa/update', name: ' Form Update Mahasiswa', element: FormUpdateMhs },
  // {
  //   path: '/kelola/mahasiswa/orangtua',
  //   name: 'Table Orang Tua/Wali Mahasiswa',
  //   element: MahasiswaTable,
  // },
  {
    path: '/kelola/dosen/pengampu',
    name: 'Tabel Dosen Pengampu',
    element: KelolaDataDosenPengampu,
  },
  {
    path: '/kelola/dosen/pengampu/tambah',
    name: 'Tabel Dosen Pengampu',
    element: FormTambahDosen,
  },
  { path: '/kelola/dosen/wali', name: 'Tabel Dosen Wali', element: TableDosenWali },
  { path: '/kelola/kaprodi', name: 'Tabel Kaprodi', element: TableKaprodi },
  // Dashboar Mahasiswa
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
