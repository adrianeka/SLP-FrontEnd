import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import AuthService from 'src/services/authService'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    AuthService.signout()
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        console.error('Logout error:', error)
      })
  }
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem('admin')) ??
      JSON.parse(localStorage.getItem('mahasiswa')) ??
      JSON.parse(localStorage.getItem('dosenwali'))

    if (!user) {
      window.location.href = '/login'
    } else {
      setUsername(user.username)
    }
  }, [])
  const [username, setUsername] = useState('')
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md me-2" /> {username}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Log out</CDropdownHeader>
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
