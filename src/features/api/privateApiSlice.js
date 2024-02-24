import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '@features/auth/authSlice'
import { tokenRefresh } from '@static/endpoints'
import { environment } from '@config'

const REDUCER = 'privateApi'

// generic query with barer token
const baseQuery = fetchBaseQuery({
  baseUrl: environment.phnxApi,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  }
})

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
          siteId: environment.phnxSiteId,
          token
        },
        method: 'POST',
        url: tokenRefresh
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

// perform requests with auth token, tries to refresh if failed
const privateApiSlice = createApi({
  reducerPath: REDUCER,
  baseQuery: baseQueryWithReauth,
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
})

export default privateApiSlice
