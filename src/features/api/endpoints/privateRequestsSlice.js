import privateApiSlice from '@api/privateApiSlice.js'

const VERIFY_ENDPOINT = '/token_verify_auth'
const REFRESH_ENDPOINT = '/refresh'
const SITE_ID = 1234

export const privateRequestsSlice = privateApiSlice.injectEndpoints({
  endpoints: builder => ({
    tokenVerify: builder.mutation({
      query: token => ({
        url: VERIFY_ENDPOINT,
        method: 'POST',
        body: {
          siteId: SITE_ID,
          token
        }
      })
    }),
    tokenRefresh: builder.mutation({
      query: token => ({
        url: REFRESH_ENDPOINT,
        method: 'POST',
        body: {
          siteId: SITE_ID,
          token
        }
      })
    })
  })
})

export const { useTokenVerifyMutation, useTokenRefreshMutation } =
  privateRequestsSlice
