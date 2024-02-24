import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { environment } from '@config'

// generic http request
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: environment.phnxApi
  }),
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
})

export default apiSlice
