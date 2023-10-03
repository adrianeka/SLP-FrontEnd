import React from 'react'
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
      <AppSidebarAdmin />
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
