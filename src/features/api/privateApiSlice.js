// RTK is specifically for React
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../auth/authSlice'

const BASE_URL = 'http://localhost:3000'
const REFRESH_ENDPOINT = '/token_refresh'
const REDUCER = 'privateApi'
const SITE_ID = 1234

// wrapper
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // if verify request is rejected, try refresh
  if (result?.error?.originalStatus === 403) {
    const token = api.getState().auth?.access

    // override args for refresh
    const refreshResult = await baseQuery(
      {
        body: {
          siteId: SITE_ID,
          token
        },
        method: 'POST',
        url: REFRESH_ENDPOINT
      },
      api,
      extraOptions
    )

    if (refreshResult?.data) {
      // we're supposed to have a user already
      const user = api.getState().auth?.user
      const role = api.getState().auth?.role
      const access = refreshResult.data.access
      const refresh = refreshResult.data.refresh
      api.dispatch(setCredentials({ access, refresh, user, role }))
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  }
})

/**
 * perform requests with auth token
 * tries to refresh if failed
 */
const privateApiSlice = createApi({
  reducerPath: REDUCER,
  baseQuery: baseQueryWithReauth,
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
})

export default privateApiSlice
