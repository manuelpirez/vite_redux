import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import useTokenLogin from '@hooks/useTokenLogin'
import useTokenVerify from '@hooks/useTokenVerify'

import { selectAccessToken } from '@features/authSlice'

import useSaveUrlParams from '@hooks/useSaveUrlParams'
import useTracking from '@hooks/useTracking'

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
  useSaveUrlParams()
  //const track = useTracking()

  const [isLoading, setIsLoading] = useState(true)

  const clearQueryParams = () => {
    // Check if there are search parameters before navigating
    if (location.search) navigate({ search: '' })
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

  useEffect(() => {
    trackPageView()
    let isMounted = true

    if (location.search) {
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
