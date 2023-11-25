import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilSearch, cilUserPlus } from '@coreui/icons'
import { Link, useParams } from 'react-router-dom'

const ListSemester = () => {
  const { id } = useParams()
  const [dataSemester, setDataSemester] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const generateSemesterData = () => {
    let startSemester = 1
    let endSemester = id === '1' ? 6 : id === '2' ? 8 : 0

    if (endSemester !== 0) {
      const generatedData = []

      for (let i = startSemester; i <= endSemester; i++) {
        const semesterData = {
          id: i, // You may need to adjust the way you generate the ID.
          nama_semester: `Semester ${i}`, // Adjust the naming convention as needed.
          status_semester: 1, // Set the default status as needed.
          // Add other properties as needed.
        }

        generatedData.push(semesterData)
      }

      setDataSemester(generatedData)
      setFilteredData(generatedData) // Set filteredData initially to all data.
    }
  }
  useEffect(() => {
    // Fetch data or perform any other necessary actions.
    generateSemesterData()
  }, [id])

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Daftar Semester Kuliah</CCardHeader>
            <CCardBody>
              <CForm className="mb-3"></CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow className="text-center">
                    <CTableHeaderCell>Semester</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((semester) => (
                    <CTableRow key={semester.id} className="text-center">
                      <CTableDataCell>{semester.nama_semester}</CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/kelola/akademik/matkul/${semester.id}/${id}`}>
                          <CButton className="btn btn-info text-white">Select</CButton>
                        </Link>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ListSemester
