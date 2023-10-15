import React from 'react'
//Admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TableKaprodi = React.lazy(() => import('./views/CRUDTable/TableKaprodi'))
const KelolaDataMhs = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataMhs'))
const KelolaDataJadwal = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataJadwal'))
const KelolaDataSemester = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataSemester'))
const KelolaDataMatkul = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataMatkul'))
const FormTambahMhs = React.lazy(() => import('./views/form/Admin/formCreateMhs'))
const FormUpdateMhs = React.lazy(() => import('./views/form/Admin/formUpdateMhs'))
const KelolaDataDosenPengampu = React.lazy(() =>
  import('./views/CRUDTable/Admin/KelolaDataDosenPengampu'),
)
const FormUpdateDosen = React.lazy(() => import('./views/form/Admin/formUpdateDosen'))
const FormTambahDosen = React.lazy(() => import('./views/form/Admin/formCreateDosen'))
const KelolaDataDosenWali = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataDosenWali'))
// Mahasiswa
const DashboardMahasiswa = React.lazy(() => import('./views/dashboard/DashboardMahasiswa'))
const TableSuratMahasiswa = React.lazy(() => import('./views/CRUDTable/Mahasiswa/TableSurat'))
const FormSakitMhs = React.lazy(() => import('./views/form/Mahasiswa/FormSakitMhs'))
const FormIzinMhs = React.lazy(() => import('./views/form/Mahasiswa/FormIzinMhs'))
const RiwayatSurat = React.lazy(() => import('./views/CRUDTable/Mahasiswa/RiwayatSurat'))

// Dosen Wali
const DashboardDosenWali = React.lazy(() => import('./views/dashboard/DashboardDosenWali'))
const TableMahasiswa = React.lazy(() => import('./views/CRUDTable/DosenWali/TableMahasiswa'))
const TableRekapIzin = React.lazy(() => import('./views/CRUDTable/DosenWali/TableRekapIzin'))
const TableRekapSakit = React.lazy(() => import('./views/CRUDTable/DosenWali/TableRekapSakit'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', element: Login },

  //Admin
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/kelola/mahasiswa', name: 'Tabel Mahasiswa', element: KelolaDataMhs },
  { path: '/kelola/mahasiswa/tambah', name: 'Form Create Mahasiswa', element: FormTambahMhs },
  { path: '/kelola/mahasiswa/update', name: ' Form Update Mahasiswa', element: FormUpdateMhs },
  {
    path: '/kelola/dosen/pengampu',
    name: 'Tabel Dosen Pengampu',
    element: KelolaDataDosenPengampu,
  },
  { path: '/kelola/dosen/update/:id', name: 'Form Update Dosen', element: FormUpdateDosen },
  {
    path: '/kelola/dosen/pengampu/tambah',
    name: 'Tabel Dosen Pengampu',
    element: FormTambahDosen,
  },
  { path: '/kelola/dosen/wali', name: 'Tabel Dosen Wali', element: KelolaDataDosenWali },
  { path: '/kelola/kaprodi', name: 'Tabel Kaprodi', element: TableKaprodi },
  { path: '/kelola/akademik/jadwal', name: 'Tabel Jadwal Mata Kuliah', element: KelolaDataJadwal },
  { path: '/kelola/akademik/semester', name: 'Tabel Semester', element: KelolaDataSemester },
  { path: '/kelola/akademik/matkul', name: 'Tabel Mata Kuliah', element: KelolaDataMatkul },
  // Dashboard Mahasiswa
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
  // Dosen Wali
  { path: '/dashboardDosenWali', name: 'Dashboard', element: DashboardDosenWali },
  { path: '/kelolaWali/mahasiswa', name: 'Tabel Mahasiswa', element: TableMahasiswa },
  { path: 'table/rekap/izin', name: 'Tabel Izin Mahasiswa', element: TableRekapIzin },
  { path: 'table/rekap/sakit', name: 'Tabel Sakit Mahasiswa', element: TableRekapSakit },

  {
    path: '/kelola/mahasiswa/update/:id',
    name: 'Form Update Mahasiswa',
    element: FormUpdateMhs,
  },
]

export default routes
