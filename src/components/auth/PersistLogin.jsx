import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useSaveUrlParams from '@hooks/useSaveUrlParams'
import useTokenVerify from '@hooks/useTokenVerify'
import useTokenLogin from '@hooks/useTokenLogin'
import useTracking from '@hooks/useTracking'
import useAuth from '@hooks/useAuth'

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

  const { trackPageView } = useTracking()

  // Auth mgmt hooks
  const tokenLogin = useTokenLogin()
  const tokenVerify = useTokenVerify()
  const { token, role, setDefaultTokenCredentials, logout } = useAuth()
  useSaveUrlParams()

  const [isLoading, setIsLoading] = useState(true)

  const _cacheVerificationFlow = async () => {
    // token login
    if (location.search) {
      let roleH = false
      if (role) roleH = utilGetRoleHierarchy(role, location)

      if (roleH || !token) {
        //console.warn('// If URLtoken is greater than cacheToken and no cacheToken do URLtoken login')
        try {
          const parsedURLToken = await tokenLogin()
          setDefaultTokenCredentials(parsedURLToken)
          setIsLoading(false)
          return
        } catch (error) {
          console.warn('_tokenLoginFlow failed')
          console.error(error)
        }
      }
    }

    //console.log('// URLtoken not greater or roleH is falsy, do cacheToken verify')

    if (token) {
      try {
        // console.log('// trying tokenVerify')
        const parsedToken = await tokenVerify()
        setDefaultTokenCredentials(parsedToken)
        return
      } catch (error) {
        //console.warn('// ERROR : _cacheVerificationFlow - tokenVerify')
        console.error(error)
      }
    }

    //console.log('// cacheToken verify fails, do URLtoken login as last resource')
    if (location.search) {
      try {
        const parsedURLToken = await tokenLogin()
        setDefaultTokenCredentials(parsedURLToken)
        return
        // Clear search params after successful token login
        //if (location.search) navigate({ search: '' })
      } catch (error) {
        // Logout and redirect to the login page
        //console.log('// everything failed logout 1')
        console.error(error)
        logout()
        return <Navigate to="/login" state={{ from: location }} replace />
      }
    } else {
      //console.log('// everything failed logout 2')
      logout()
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
    console.log({ location, token })
    if (location.search || token) {
      // console.log('eval')
      _evalAuthHierarchy()
      // console.log('eval done')
    } else {
      // console.log('free load')
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
