import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilCircle,
  cilClock,
  cilLockLocked,
  cilShortText,
  cilUser,
} from '@coreui/icons'

const FormTambahMhs = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Create data mahasiswa</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nama">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormTextarea
                  placeholder="Nama Lengkap"
                  floatingLabel="Nama Lengkap"
                  aria-describedby="Nama"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="Kelas">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput placeholder="Kelas" floatingLabel="Kelas" aria-describedby="kelas" />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="prodi">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput placeholder="Prodi" floatingLabel="Prodi" aria-describedby="prodi" />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="username-mhs">
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Username"
                  floatingLabel="Username"
                  aria-describedby="username-mhs"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="password-mhs">
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Password"
                  floatingLabel="Password"
                  aria-describedby="password-mhs"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="email-mhs">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Email"
                  floatingLabel="Email"
                  aria-describedby="email-mhs"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="noTelp-mhs">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  placeholder="No Telp"
                  floatingLabel="No Telp"
                  aria-describedby="noTelp-mhs"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="namaOrgTua">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Nama Orang Tua Mahasiswa"
                  floatingLabel="Nama Orang Tua Mahasiswa"
                  aria-describedby="namaOrgTua"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="noTelpOrgTua">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  placeholder="No Telp. Orang Tua"
                  floatingLabel="No Telp. Orang Tua"
                  aria-describedby="noTelpOrangTua"
                />
              </CInputGroup>
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs={11}></CCol>
            <CCol xs={1}>
              {' '}
              <CButton color="primary" variant="outline">
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default FormTambahMhs
