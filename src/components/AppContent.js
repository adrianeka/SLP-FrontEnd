import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem('admin')) ??
      JSON.parse(localStorage.getItem('mahasiswa')) ??
      JSON.parse(localStorage.getItem('dosenwali'))

    if (!user) {
      window.location.href = '/login'
    } else {
      setUserRole(user.roles)
    }
  }, [])

  const [userRole, setUserRole] = useState('')
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          {userRole === 'admin' ? (
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          ) : null}
          {userRole === 'mahasiswa' ? (
            <Route path="/" element={<Navigate to="/dashboardMhs" replace />} />
          ) : null}
          {userRole === 'dosen_wali' ? (
            <Route path="/" element={<Navigate to="/dashboardDosenWali" replace />} />
          ) : null}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
