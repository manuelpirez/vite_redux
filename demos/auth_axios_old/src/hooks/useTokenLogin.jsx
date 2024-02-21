import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { tokenLogin } from '../api/axios.jsx'
import useAuth from './useAuth.jsx'

/**
 * Use URL
 * @returns {function(): Promise<unknown>}
 */
const useTokenLogin = () => {
  const location = useLocation()
  const { setAuth } = useAuth()
  const [token, setToken] = useState(null)

  const otpLogin = async otp => {
    console.log('OTP LOGIN')
    try {
      const response = await tokenLogin({ access: otp })
      console.log('OTP LOGIN - RESPONSE')
      console.log(response?.data)
      console.log('OTP LOGIN - RESPONSE')

      const access = response?.data?.tokens?.access
      const refresh = response?.data?.tokens?.refresh
      const roles = response?.data?.info?.role?.name
      //localStorage.setItem('token', JSON.stringify(response.data));
      setAuth({ access, roles, refresh })
      setToken({ access, roles, refresh })
    } catch (e) {
      console.error(e)
    }
  }
  const dpLogin = async dp => {
    console.log('DP LOGIN')
    try {
      const response = await tokenLogin({ access: dp })
      console.log('DP LOGIN - RESPONSE')
      console.log(response?.data)
      console.log('DP LOGIN - RESPONSE')

      const access = response?.data?.tokens?.access
      const refresh = response?.data?.tokens?.refresh
      const roles = response?.data?.info?.role?.name
      //localStorage.setItem('token', JSON.stringify(response.data));
      setAuth({ access, roles, refresh })
      setToken({ access, roles, refresh })
    } catch (e) {
      console.error(e)
    }
  }
  const limitedLogin = async dspId => {
    console.log('limited LOGIN')
    try {
      const response = await tokenLogin({ access: dspId })
      console.log('limited LOGIN - RESPONSE')
      console.log(response?.data)
      console.log('limited LOGIN - RESPONSE')

      const access = response?.data?.tokens?.access
      const refresh = response?.data?.tokens?.refresh
      const roles = response?.data?.info?.role?.name
      //localStorage.setItem('token', JSON.stringify(response.data));
      setAuth({ access, roles, refresh })
      setToken({ access, roles, refresh })
    } catch (e) {
      console.error(e)
    }
  }

  return async () => {
    if (location.search) {
      const urlParams = new URLSearchParams(location.search)
      urlParams.has('otp') && (await otpLogin(urlParams.get('otp')))
      urlParams.has('dp') && (await dpLogin(urlParams.get('dp')))
      urlParams.has('dspId') && (await limitedLogin(urlParams.get('dspId')))
    }
    return token
  }
}
export default useTokenLogin
