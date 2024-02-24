import apiSlice from '@api/apiSlice.js'
import { environment } from '@config'
import { tokenLogin } from '@static/endpoints'

export const publicRequestsSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    tokenLogin: builder.mutation({
      query: token => ({
        url: tokenLogin,
        method: 'POST',
        body: {
          siteId: environment.phnxSiteId,
          token
        },
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
  })
})

export const { useTokenLoginMutation } = publicRequestsSlice
