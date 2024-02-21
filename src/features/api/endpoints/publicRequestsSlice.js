import publicApiSlice from '@api/publicApiSlice'

const LOGIN_ENDPOINT = '/login'
const FEEDBACK_ENDPOINT = '/user_feedback'

export const publicRequestsSlice = publicApiSlice.injectEndpoints({
  endpoints: builder => ({
    emailPassLogin: builder.mutation({
      query: credentials => ({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendFeedback: builder.mutation({
      query: payload => ({
        url: FEEDBACK_ENDPOINT,
        method: 'POST',
        body: { ...payload }
      })
    })
  })
})

export const { useEmailPassLoginMutation, useSendFeedbackMutation } =
  publicRequestsSlice
