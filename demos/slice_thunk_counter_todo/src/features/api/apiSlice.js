/* eslint-disable no-unused-vars */
// RTK is specifically for React
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  // default reducer path  - when it is just called api it is optional
  reducerPath: 'api',
  // same as axios baseurl
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  // results get cached, we need to invalidate the previous cache
  // this is to show the new data
  // we need to add a tag to the cache, so we now which cache is being modified
  tagTypes: ['Todos', 'Posts'],
  // endpoints for the API to interact
  // we need to declare empty endpoints if we use extended slicers
  endpoints: builder => ({})
})
