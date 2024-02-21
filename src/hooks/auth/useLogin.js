import { useDispatch } from 'react-redux'

import { logOut, setDefCredentials } from '@features/auth/authSlice.js'
import { useEmailPassLoginMutation } from '@api/endpoints/publicRequestsSlice.js'

/**
 * Use URL token to log user in
 * @returns {{login: ((function({user: *, pwd: *}): Promise<void>)|*)}}
 */
const useLogin = () => {
  const dispatch = useDispatch()
  const [emailPassLogin] = useEmailPassLoginMutation()

  const login = async ({ user, pwd }) => {
    try {
      const response = await emailPassLogin({ user, pwd }).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      dispatch(logOut())
      throw Error(e.message)
    }
  }

  return { login }
}
export default useLogin
