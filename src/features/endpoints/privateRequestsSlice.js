import privateApiSlice from '@api/privateApiSlice'
import { environment } from '@config'
import { tokenVerify, river } from '@static/endpoints'

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
    getFeed: builder.mutation({
      query: query => ({
        url: river,
        method: 'POST',
        body: { ...query }
      })
      //keepUnusedDataFor: 5
    })
  })
})

export const { useTokenVerifyMutation, useGetFeedMutation } =
  privateRequestsSlice
