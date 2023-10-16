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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilCircle, cilClock, cilShortText } from '@coreui/icons'

const FormUpdateMatkul = () => {
  return (
    <>
      <CCard>
        <CCardHeader>Form Update Mata Kuliah</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="kode_matkul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="kode_matkul"
                  placeholder="Kode Matkul"
                  floatingLabel="Kode Matkul"
                  aria-describedby="kode_matkul"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="nama_matkul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="nama_matkul"
                  placeholder="Nama Matkul"
                  floatingLabel="Nama Matkul"
                  aria-describedby="nama_matkul"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="tipe_matkul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="tipe"
                  placeholder="Tipe Matkul"
                  floatingLabel="Tipe Matkul"
                  aria-describedby="tipe_matkul"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="sks_matkul">
                  <CIcon icon={cilShortText} />
                </CInputGroupText>
                <CFormInput
                  name="sks"
                  placeholder="SKS"
                  floatingLabel="SKS"
                  aria-describedby="sks_matkul"
                />
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CFormSelect id="Prodi" label="Program Studi">
                <option selected hidden>
                  Pilih..
                </option>
                <option value="D3">D3</option>
                <option value="D4">D4</option>
              </CFormSelect>
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

export default FormUpdateMatkul
