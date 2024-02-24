import privateApiSlice from '@api/privateApiSlice.js'
import { environment } from '@config'
import { tokenVerify, tokenRefresh } from '@static/endpoints'

export const privateRequestsSlice = privateApiSlice.injectEndpoints({
  endpoints: builder => ({
    tokenVerify: builder.mutation({
      query: token => ({
        url: tokenVerify,
        method: 'POST',
        body: {
          siteId: environment.phnxSiteId,
          token
        }
      })
    }),
    tokenRefresh: builder.mutation({
      query: token => ({
        url: tokenRefresh,
        method: 'POST',
        body: {
          siteId: environment.phnxSiteId,
          token
        }
      })
    })
  })
})

export const { useTokenVerifyMutation, useTokenRefreshMutation } =
  privateRequestsSlice
