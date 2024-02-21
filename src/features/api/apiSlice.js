import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:3000'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
})

export default apiSlice
