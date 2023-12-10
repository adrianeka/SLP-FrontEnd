import React, { useState, useEffect } from 'react'
import {
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronRight } from '@coreui/icons'
import { Link, useParams } from 'react-router-dom'
import '../../../assets/css/style.css'

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
            {/* <CCardHeader>Daftar Semester Kuliah</CCardHeader> */}
            <CCardBody>
              <div className="fw-bold my-3 title-page">Daftar Semester Kuliah</div>
              <CTable bordered responsive className="mt-3">
                <CTableHead>
                  <CTableRow className="px-5">
                    <CTableHeaderCell>Semester</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((semester) => (
                    <CTableRow key={semester.id} className="px-5">
                      <CTableDataCell className="link-card">
                        <Link
                          to={`/kelola/akademik/matkul/${semester.id}/${id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <CRow>
                            <CCol xs={11}>{semester.nama_semester}</CCol>
                            <CCol xs={1}>
                              <CIcon icon={cilChevronRight} size="xl" />
                            </CCol>
                          </CRow>
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
