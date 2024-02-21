import privateApiSlice from '@api/privateApiSlice.js'

// NOSONAR
//const initialState = {
//  page: 0,
//  totalPages: 5,
//  adIndex: 2,
//  feed: {
//    feed1: [],
//    feed2: [],
//    feed3: []
//  }
//}
const FEED_URL = '/list'

export const feedSlice = privateApiSlice.injectEndpoints({
  endpoints: builder => ({
    getFeed: builder.mutation({
      query: query => ({
        url: FEED_URL,
        method: 'POST',
        body: { ...query }
      })
      //keepUnusedDataFor: 5
    })
  })
})

export const { useGetFeedMutation } = feedSlice
