import { tokenLogin } from '../../api/axios.jsx'
import useAuth from '../useAuth.jsx'

const useVerifyToken = () => {
  const { setAuth, auth } = useAuth()

  return async () => {
    const response = await tokenLogin({ access: auth?.access })
    console.log('VERIFY AUTH - TOKEN LOGIN')
    console.log(response?.data)
    console.log('VERIFY AUTH - TOKEN LOGIN')

    const access = response?.data?.tokens?.access
    const refresh = response?.data?.tokens?.refresh
    const roles = response?.data?.info?.role?.name
    localStorage.setItem('token', JSON.stringify(response.data))
    setAuth({ access, roles, refresh })
    return response?.data?.tokens.access
  }
}

export default useVerifyToken
