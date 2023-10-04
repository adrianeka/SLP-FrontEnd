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

const FormUpdateMhs = () => {
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
                <CFormInput
                  placeholder="Nama Lengkap"
                  floatingLabel="Nama Lengkap"
                  aria-describedby="Nama"
                />
              </CInputGroup>
            </CCol>
            <CCol md={12}>
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
            <CCol md={12}>
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
                <CCol mx={12}>
                  <CInputGroup>
                    <CInputGroupText id="Mahasiswa Angkatan">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CFormSelect id="Mahasiswa Angkatan" style={{ height: '100%' }}>
                      <option selected hidden>
                        Angkatan Mahasiswa
                      </option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2023">2022</option>
                      <option value="2024">2023</option>
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="Kelas">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect id="Mahasiswa Kelas" style={{ height: '100%' }}>
                  <option selected hidden>
                    Kelas Mahasiswa
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="prodi">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormSelect id="Mahasiswa Prodi" style={{ height: '100%' }}>
                  <option selected hidden>
                    Prodi
                  </option>
                  <option value="D3">D3</option>
                  <option value="D4">D4</option>
                </CFormSelect>
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
                Save
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default FormUpdateMhs
