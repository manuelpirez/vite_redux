import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '@features/authSlice'
import { tokenRefresh } from '@static/endpoints'
import { environment } from '@config'

const REDUCER = 'privateApi'

// perform requests with auth token, tries to refresh if failed
const baseQuery = fetchBaseQuery({
  baseUrl: environment.phnxApi,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  }
})

// refresh query if API responds with 403
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result
  try {
    result = await baseQuery(args, api, extraOptions)

    // try refresh
    if (
      result?.error?.originalStatus === 403 ||
      result?.error?.status === 403
    ) {
      const token = api.getState().auth?.access

      // override args for refresh
      try {
        const refreshResult = await baseQuery(
          {
            method: 'POST',
            url: tokenRefresh,
            body: {
              siteId: environment.phnxSiteId,
              token
            }
          },
          api,
          extraOptions
        )

        const user = api.getState().auth?.user
        const role = api.getState().auth?.role
        const access = refreshResult.data.access
        const refresh = refreshResult.data.refresh
        api.dispatch(setCredentials({ access, refresh, user, role }))
        // retry original query with new access token
        result = await baseQuery(args, api, extraOptions)
      } catch (e) {
        console.warn(e)
        api.dispatch(logOut())
        throw new Error('refresh failed')
      }
    }
  } catch (e) {
    throw new Error('auth failed')
  }
  return result
}

const privateApiSlice = createApi({
  reducerPath: REDUCER,
  baseQuery: baseQueryWithReauth,
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
})

export default privateApiSlice
