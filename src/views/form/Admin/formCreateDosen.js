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

const FormTambahDosen = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Form Tambah Dosen</CCardHeader>
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
                <CInputGroupText id="kode">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Kode Dosen"
                  floatingLabel="Kode Dosen"
                  aria-describedby="kode"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="email-dsn">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput placeholder="Email" floatingLabel="Email" aria-describedby="email" />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="username-dsn">
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Username"
                  floatingLabel="Username"
                  aria-describedby="username-dsn"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="password-dsn">
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormTextarea
                  placeholder="Password"
                  floatingLabel="Password"
                  aria-describedby="password-dsn"
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

export default FormTambahDosen
