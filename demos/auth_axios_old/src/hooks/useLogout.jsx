//import axios from "../api/axios";
import useAuth from './useAuth'

const useLogout = () => {
  const { setAuth } = useAuth()

  return async () => {
    setAuth({})
  }
}

export default useLogout
