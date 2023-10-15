import React, { useEffect, useState } from 'react'
import AppSidebarDosenWali from 'src/components/AppSidebarDosenWali'
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
  AppSidebarMhs,
  AppSidebarAdmin,
} from '../components/index'

const DefaultLayout = () => {
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem('admin')) ?? JSON.parse(localStorage.getItem('mahasiswa'))
    // Assuming 'user.roles' contains the user's role (e.g., 'admin' or 'mahasiswa')

    if (!user) {
      window.location.href = '/login'
    } else {
      setUserRole(user.roles)
    }
  }, [])

  const [userRole, setUserRole] = useState('') // State to store the user's role

  return (
    <div>
      {userRole === 'admin' ? <AppSidebarAdmin /> : null}
      {userRole === 'mahasiswa' ? <AppSidebarMhs /> : null}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
