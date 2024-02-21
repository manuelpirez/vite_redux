import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuthContext'

/**
 * Check allowed role agains token and grants/deny access
 * @param allowedRoles
 * @returns {JSX.Element}
 * @constructor
 */
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  if (allowedRoles?.includes(auth.roles)) {
    return <Outlet />
  }
  if (auth?.user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />
  }
  return <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth
