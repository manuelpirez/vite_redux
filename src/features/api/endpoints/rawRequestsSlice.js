import apiSlice from '@api/apiSlice.js'

const LOGIN_ENDPOINT = '/token_login'
const SITE_ID = 2

export const publicRequestsSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    tokenLogin: builder.mutation({
      query: token => ({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        body: {
          siteId: SITE_ID,
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
