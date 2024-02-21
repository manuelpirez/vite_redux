import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useTokenLoginMutation } from '@api/endpoints/rawRequestsSlice.js'
import { setDefCredentials } from '@features/auth/authSlice.js'

/**
 * Use URL token to log user in
 * @returns {function(): Promise<unknown>}
 */
const useTokenLogin = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [tokenLogin] = useTokenLoginMutation()

  const otpLogin = async otp => {
    console.log('otpLogin')
    try {
      const response = await tokenLogin(otp).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      console.error(e)
    }
  }
  const dpLogin = async dp => {
    console.log('dpLogin')
    try {
      const response = await tokenLogin(dp).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      console.error(e)
    }
  }
  const limitedLogin = async dspId => {
    console.log('limitedLogin')
    try {
      const response = await tokenLogin(dspId).unwrap()
      dispatch(setDefCredentials({ ...response }))
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
  }
}
export default useTokenLogin
