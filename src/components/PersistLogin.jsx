import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useSaveUrlParams from '@hooks/useSaveUrlParams'
import useTokenVerify from '@hooks/useTokenVerify'
import useTokenLogin from '@hooks/useTokenLogin'
import useTracking from '@hooks/useTracking'

import utilRoleHierarchy from '@utils/utilRoleHierarchy'

import { selectAccessToken, selectRole } from '@features/authSlice'

/**
 * The `PersistLogin` function handles the authentication and authorization logic in a React application.
 * It checks if the user is already authenticated and if not, it attempts to authenticate the user using a token from the URL.
 * It also verifies the token with an API endpoint and logs the user out if the token is invalid.
 * The function returns the `Outlet` component, which renders the appropriate content based on the user's authentication status.
 */
const PersistLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { trackPageView } = useTracking()

  const tokenLogin = useTokenLogin()
  const tokenVerify = useTokenVerify()
  const token = useSelector(selectAccessToken)
  const role = useSelector(selectRole)
  useSaveUrlParams()
  //const track = useTracking()

  const [isLoading, setIsLoading] = useState(true)

  const clearQueryParams = () => {
    // Check if there are search parameters before navigating
    if (location.search) navigate({ search: '' })
  }

  const _evalAuthHierarchy = () => {
    try {
      const roleH = utilRoleHierarchy(role, location)

      console.log(roleH)
      // eval the hierarchy of the search param id against the cache role hierarchy

      // if search param is greater -  do login
      // if token login succed - save to cache and update user
      // if token login fails - proceed with cache verify

      // if search param is not greater
      // do cache verify
      // cache verify fails - do token login
      // if token login fails - logout user
    } catch (error) {
      console.error(error)
    }
  }
  const _tokenVerify = async isMounted => {
    setIsLoading(true)
    try {
      console.log('_tokenVerify')
      await tokenVerify()
    } catch (e) {
      console.error(e)
      _tokenLogOut()
    } finally {
      isMounted && setIsLoading(false)
    }
  }
  const _tokenLogin = async isMounted => {
    setIsLoading(true)
    try {
      console.log('_tokenLogin')
      await tokenLogin()
      // clear
      clearQueryParams()
    } catch (e) {
      console.error(e)
      _tokenLogOut()
    } finally {
      isMounted && setIsLoading(false)
    }
  }
  const _tokenLogOut = () => {
    console.log('_tokenLogOut')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // IF NO CACHE & NO TOKEN - ATTEMPT ANON LOGIN - done by publicApiSlice
  // IF NO TOKEN & CACHE - ATTEMPT CACHE LOGIN - done by tokenVerify
  // IF NO CACHE & TOKEN  - ATTEMPT TOKEN LOGIN - done by tokenLogin
  // IF TOKEN & CACHE - EVAL CACHE TYPE & DO VALID AUTH

  useEffect(() => {
    trackPageView()
    let isMounted = true

    if (location.search && token) {
      _evalAuthHierarchy()
    } else if (location.search) {
      //TODO token hierarchy
      console.log('urltoken available')
      _tokenLogin(isMounted)
    } else if (token) {
      console.log('auth available, and no urltoken')
      _tokenVerify(isMounted)
    } else {
      console.log('free load')
      setIsLoading(false)
    }

    return () => {
      setIsLoading(false)
      isMounted = false
    }
    // eslint-disable-next-line
  }, [location.pathname, location.search])

  if (isLoading) return <p> LOADING... </p>

  return <Outlet />
}

export default PersistLogin
