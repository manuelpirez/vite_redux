import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '@features/auth/authSlice'

const BASE_URL = 'http://localhost:3000'
const ANON_ENDPOINT = '/token_get_anon'
const REDUCER = 'publicApi'

// override fetchBaseQuery to always send token when available
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

// wrapper
const baseQueryWithAnon = async (args, api, extraOptions) => {
  const token = api.getState().auth?.access

  if (token) {
    return await baseQuery(args, api, extraOptions)
  } else {
    const anonResult = await baseQuery(ANON_ENDPOINT, api, extraOptions)

    if (anonResult?.data) {
      const user = api.getState().auth?.user
      const access = anonResult.data.access
      const refresh = anonResult.data.refresh
      const role = anonResult.data.roleId

      api.dispatch(setCredentials({ user, access, refresh, role }))
      // retry original query with new access token
      return await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
}

/**
 * check if there's anon token
 * request one if necessary
 */
const publicApiSlice = createApi({
  reducerPath: REDUCER,
  baseQuery: baseQueryWithAnon,
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
})

export default publicApiSlice
