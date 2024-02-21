import useAuth from './useAuthContext'

const useLogout = () => {
  const { setAuth } = useAuth()

  return async () => {
    setAuth({})
  }
}

export default useLogout
