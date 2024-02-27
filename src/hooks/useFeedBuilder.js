import { useGetFeedMutation } from '@features/endpoints/privateRequestsSlice.js'

// MW to get feed API - Extra
const useFeedBuilder = () => {
  const [getFeed] = useGetFeedMutation()

  const getFeedData = async query => await getFeed(query)

  return { getFeedData }
}

export default useFeedBuilder
