import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { logOut, setCredentials } from '@features/authSlice'

import { tokenGet } from '@static/endpoints'
import { environment } from '@config'

const REDUCER = 'publicApi'

// override fetchBaseQuery to include bearer token
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
const baseQueryWithAnon = async (args, api, extraOptions) => {
  const token = api.getState().auth?.access

  if (token) {
    return await baseQuery(args, api, extraOptions)
  } else {
    const anon = await baseQuery(
      {
        url: tokenGet,
        method: 'POST',
        body: { siteId: environment.phnxSiteId }
      },
      api,
      extraOptions
    )

    if (anon?.data) {
      const user = api.getState().auth?.user
      const access = anon.data.access
      const refresh = anon.data.refresh
      const role = anon.data.roleId

      api.dispatch(setCredentials({ user, access, refresh, role }))

      // retry original query with new access token
      return await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
}

// check if there's anon token request one if necessary
const publicApiSlice = createApi({
  reducerPath: REDUCER,
  baseQuery: baseQueryWithAnon,
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
})

export default publicApiSlice
