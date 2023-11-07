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
const FormUpdateMatkul = React.lazy(() => import('./views/form/Admin/formUpdateMatkul'))
const FormUpdateDosen = React.lazy(() => import('./views/form/Admin/formUpdateDosen'))
const FormTambahDosen = React.lazy(() => import('./views/form/Admin/formCreateDosen'))
const FormTambahJadwal = React.lazy(() => import('./views/form/Admin/formCreateJadwal'))
const FormTambahMatkul = React.lazy(() => import('./views/form/Admin/formCreateMatkul'))
const KelolaDataDosenWali = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataDosenWali'))
const FormTambahSemester = React.lazy(() => import('./views/form/Admin/formCreateSemester'))
const FormUpdateSemester = React.lazy(() => import('./views/form/Admin/formUpdateSemester'))
const FormTambahDosenWali = React.lazy(() => import('./views/form/Admin/formCreateDosenWali'))
const FormUpdateDosenWali = React.lazy(() => import('./views/form/Admin/formUpdateDosenWali'))
const KelolaDataJadwalKelas = React.lazy(() =>
  import('./views/CRUDTable/Admin/KelolaDataJadwalKelas'),
)
const FormCreateJadwalKelas = React.lazy(() => import('./views/form/Admin/formCreateJadwalKelas'))
const FormUpdateJadwalKelas = React.lazy(() => import('./views/form/Admin/formUpdateJadwalKelas'))
const KelolaDataMengajar = React.lazy(() => import('./views/CRUDTable/Admin/KelolaDataMengajar'))
const FormCrateDataMengajar = React.lazy(() => import('./views/form/Admin/formCreateDataMengajar'))
const FormUpdateDataMengajar = React.lazy(() => import('./views/form/Admin/formUpdateDataMengajar'))
// Mahasiswa
const DashboardMahasiswa = React.lazy(() => import('./views/dashboard/DashboardMahasiswa'))
const TableSuratMahasiswa = React.lazy(() => import('./views/CRUDTable/Mahasiswa/TableSurat'))
const FormSakitMhs = React.lazy(() => import('./views/form/Mahasiswa/FormSakitMhs'))
const FormIzinMhs = React.lazy(() => import('./views/form/Mahasiswa/FormIzinMhs'))
const RiwayatSurat = React.lazy(() => import('./views/CRUDTable/Mahasiswa/RiwayatSurat'))
const FormUpdateDrafts = React.lazy(() => import('./views/form/Mahasiswa/FormUpdateDrafts'))

// Dosen Wali
const DashboardDosenWali = React.lazy(() => import('./views/dashboard/DashboardDosenWali'))
const TableMahasiswa = React.lazy(() => import('./views/CRUDTable/DosenWali/TableMahasiswa'))
const TableRekapIzin = React.lazy(() => import('./views/CRUDTable/DosenWali/TableRekapIzin'))
const TableRekapSakit = React.lazy(() => import('./views/CRUDTable/DosenWali/TableRekapSakit'))
const RiwayatSuratPermohonan = React.lazy(() =>
  import('./views/CRUDTable/DosenWali/RiwayatSuratPermohonan'),
)

//kaprodi
const DashboardKaprodi = React.lazy(() => import('./views/dashboard/DashboardKaprodi'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const FormTambahKaprodi = React.lazy(() => import('./views/form/Admin/formCreateKaprodi'))
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
  {
    path: '/kelola/dosen/wali/tambah',
    name: 'Form Create Dosen Wali',
    element: FormTambahDosenWali,
  },
  {
    path: '/kelola/dosen/wali/update/:id',
    name: 'Form Update Dosen Wali',
    element: FormUpdateDosenWali,
  },
  { path: '/kelola/kaprodi', name: 'Tabel Kaprodi', element: TableKaprodi },
  { path: '/kelola/kaprodi/tambah', name: 'Form Create Kaprodi', element: FormTambahKaprodi },
  // Kelola akademik
  { path: '/kelola/akademik/jadwal', name: 'Tabel Jadwal Mata Kuliah', element: KelolaDataJadwal },
  { path: '/kelola/akademik/semester', name: 'Tabel Semester', element: KelolaDataSemester },
  { path: '/kelola/akademik/matkul', name: 'Tabel Mata Kuliah', element: KelolaDataMatkul },
  {
    path: '/kelola/akademik/jadwal/tambah',
    name: 'From Create Jadwal Mata Kuliah',
    element: FormTambahJadwal,
  },
  {
    path: '/kelola/akademik/matkul/tambah',
    name: 'From Create Mata Kuliah',
    element: FormTambahMatkul,
  },
  {
    path: '/kelola/akademik/matkul/update/:id',
    name: 'Form Update Matkul',
    element: FormUpdateMatkul,
  },
  {
    path: '/kelola/akademik/semester/tambah',
    name: 'Form Create Semester',
    element: FormTambahSemester,
  },
  {
    path: '/kelola/akademik/semester/update/:id',
    name: 'Form Update Semester',
    element: FormUpdateSemester,
  },
  {
    path: '/kelola/akademik/jadwalkelas',
    name: 'Kelola Data Jadwal Kelas',
    element: KelolaDataJadwalKelas,
  },
  {
    path: '/kelola/akademik/jadwalkelas/tambah',
    name: 'Form Create Jadwal Kelas',
    element: FormCreateJadwalKelas,
  },
  {
    path: '/kelola/akademik/jadwalkelas/update/:id',
    name: 'Form Update Jadwal Kelas',
    element: FormUpdateJadwalKelas,
  },
  {
    path: '/kelola/akademik/mengajar',
    name: 'Kelola Data Mengajar',
    element: KelolaDataMengajar,
  },
  {
    path: '/kelola/akademik/mengajar/tambah',
    name: 'Form Create Data Mengajar',
    element: FormCrateDataMengajar,
  },
  {
    path: '/kelola/akademik/mengajar/update/:id',
    name: 'Form Update Data Mengajar',
    element: FormUpdateDataMengajar,
  },

  { path: '/dashboard/kaprodi', name: 'Dashboard Kaprodi', element: DashboardKaprodi },

  // Dashboard Mahasiswa
  { path: '/dashboardMhs', name: 'Dashboard Mahasiswa', element: DashboardMahasiswa },
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
  { path: '/drafts', name: 'Draft Surat Perizinan', element: TableSuratMahasiswa },
  { path: '/drafts/update/:id', name: 'Update Surat Perizinan', element: FormUpdateDrafts },
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
    path: '/riwayat/surat-permohonan',
    name: 'Riwayat Surat Permohonan',
    element: RiwayatSuratPermohonan,
  },
  {
    path: '/kelola/mahasiswa/update/:id',
    name: 'Form Update Mahasiswa',
    element: FormUpdateMhs,
  },
]

export default routes
