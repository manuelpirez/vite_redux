import publicApiSlice from '@api/publicApiSlice'
import { userLogin, feedback, registration, otp } from '@static/endpoints'

// Adds anon token
// Does not do refresh
export const publicRequestsSlice = publicApiSlice.injectEndpoints({
  endpoints: builder => ({
    emailPassLogin: builder.mutation({
      query: credentials => ({
        url: userLogin,
        method: 'POST',
        body: { ...credentials }
      })
    }),
    emailLogin: builder.mutation({
      query: credentials => ({
        url: otp,
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
