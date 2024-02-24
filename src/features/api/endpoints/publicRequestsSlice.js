import publicApiSlice from '@api/publicApiSlice'
import {
  login,
  feedback,
  registration,
  loginWithEmail
} from '@static/endpoints'

export const publicRequestsSlice = publicApiSlice.injectEndpoints({
  endpoints: builder => ({
    emailPassLogin: builder.mutation({
      query: credentials => ({
        url: login,
        method: 'POST',
        body: { ...credentials }
      })
    }),
    emailLogin: builder.mutation({
      query: credentials => ({
        url: loginWithEmail,
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendFeedback: builder.mutation({
      query: payload => ({
        url: feedback,
        method: 'POST',
        body: { ...payload }
      })
    }),
    registration: builder.mutation({
      query: payload => ({
        url: registration,
        method: 'POST',
        body: { ...payload }
      })
    })
  })
})

export const {
  useEmailPassLoginMutation,
  useSendFeedbackMutation,
  useRegistrationMutation,
  useEmailLoginMutation
} = publicRequestsSlice
