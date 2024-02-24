import { useDispatch } from 'react-redux'

import { logOut, setDefCredentials } from '@features/auth/authSlice.js'
import {
  useEmailPassLoginMutation,
  useEmailLoginMutation
} from '@api/endpoints/publicRequestsSlice.js'

/**
 * Use URL token to log user in
 * @returns {{login: ((function({user: *, pwd: *}): Promise<void>)|*)}}
 */
const useLogin = () => {
  const dispatch = useDispatch()
  const [emailPassLogin] = useEmailPassLoginMutation()
  const [emailLogin] = useEmailLoginMutation()

  const login = async payload => {
    try {
      const response = await emailPassLogin(payload).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      dispatch(logOut())
      throw Error(e.message)
    }
  }

  const loginWithEmail = async payload => {
    try {
      return await emailLogin(payload).unwrap()
    } catch (e) {
      dispatch(logOut())
      throw Error(e.message)
    }
  }

  return { login, loginWithEmail }
}
export default useLogin
