import React from 'react'
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
  return (
    <div>
      <AppSidebarMhs />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-gow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
