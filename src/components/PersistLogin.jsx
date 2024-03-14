import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import useSaveUrlParams from '@hooks/useSaveUrlParams'
import useTokenVerify from '@hooks/useTokenVerify'
import useTokenLogin from '@hooks/useTokenLogin'
import useTracking from '@hooks/useTracking'

import { selectAccessToken, selectRole, logOut } from '@features/authSlice'

import utilGetRoleHierarchy from '@utils/utilGetRoleHierarchy'

/**
 * The `PersistLogin` component handles the authentication and authorization logic in a React application.
 * It checks if the user is already authenticated and, if not, attempts to authenticate the user using a token from the URL.
 * The component also verifies the token with an API endpoint and logs the user out if the token is invalid.
 *
 * @component
 * @example
 * // Usage in a React Router setup:
 * <Routes>
 *   <Route path="/" element={<PersistLogin />} />
 *   {/* Add other routes as needed *\/}
 * </Routes>
 * @returns {JSX.Element} The rendered outlet component Or the Loading component
 */
const PersistLogin = () => {
  const location = useLocation()
  //const navigate = useNavigate()
  const { trackPageView } = useTracking()

  const tokenLogin = useTokenLogin()
  const tokenVerify = useTokenVerify()
  const token = useSelector(selectAccessToken)
  const role = useSelector(selectRole)
  const dispatch = useDispatch()

  useSaveUrlParams()
  //const track = useTracking()

  const [isLoading, setIsLoading] = useState(true)

  const _tokenLoginFlow = async () => {
    if (location.search) {
      const roleH = utilGetRoleHierarchy(role, location)
      if (roleH) {
        console.warn('// If search param is greater, do token login')
        try {
          await tokenLogin()
          setIsLoading(false)
          return
        } catch (error) {
          console.warn('_tokenLoginFlow failed')
          console.error(error)
        }
      }
    }
  }

  const _cacheVerificationFlow = async () => {
    console.log('// search param not greater/roleH is falsy, do cache verify')
    try {
      await tokenVerify()
    } catch (error) {
      console.log(error)
    }

    try {
      console.log('// Cache verify fails, do token login')
      await tokenLogin()
      // Clear search params after successful token login
      //if (location.search) navigate({ search: '' })
    } catch (error) {
      console.log('// everything failed logout')
      console.error(error)
      // Logout and redirect to the login page
      dispatch(logOut())
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  }

  /**
   * Evaluates the authentication hierarchy based on the presence of a search parameter and the role hierarchy.
   * Handles the flow of token login, cache verification, and logout.
   *
   * @async
   * @function _evalAuthHierarchy
   * @throws {Error} Throws an error if any authentication step fails.
   * @returns {void}
   */
  const _evalAuthHierarchy = async () => {
    setIsLoading(true)

    try {
      await _tokenLoginFlow()
      await _cacheVerificationFlow()
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Effect hook that triggers the authentication hierarchy evaluation when the component mounts or the location changes.
   * Handles the loading state and renders the appropriate content based on the authentication status.
   *
   * @effect
   * @function useEffect
   * @returns {void}
   */
  useEffect(() => {
    trackPageView()

    if (location.search || token) {
      _evalAuthHierarchy()
    } else {
      console.log('free load')
      setIsLoading(false)
    }

    return () => {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [location.pathname, location.search])

  if (isLoading) return <p> LOADING... </p>

  return <Outlet />
}

export default PersistLogin
