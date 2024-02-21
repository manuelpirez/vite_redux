import PropTypes from 'prop-types'

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectRole } from '@features/auth/authSlice.js'

/**
 * Check allowed role agains token and grants/deny access
 * @param allowedRoles
 * @returns {JSX.Element}
 * @constructor
 */
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const role = useSelector(selectRole)

  if (allowedRoles?.includes(role)) {
    return <Outlet />
  }
  return <Navigate to="/login" state={{ from: location }} replace />
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default RequireAuth
