import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: undefined,
  access: undefined,
  refresh: undefined,
  role: undefined
}

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // custom token response to this action
    // usually anon/limited
    setCredentials: (state, action) => {
      const { user, role, access, refresh } = action.payload
      state.access = access
      state.refresh = refresh
      state.user = user
      state.role = role
    },
    // send default token response to this action
    setDefCredentials: (state, action) => {
      const {
        tokens: { access, refresh },
        info: {
          role: { name }
        },
        info
      } = action.payload
      state.access = access
      state.refresh = refresh
      state.user = info
      state.role = name
    },
    logOut: state => {
      state.access = undefined
      state.refresh = undefined
      state.user = undefined
      state.role = undefined
      state.urlToken = undefined
    }
  }
})

// Actions
export const { setCredentials, setDefCredentials, logOut } = authSlice.actions

// Reducer
export default authSlice.reducer

// Selectors
export const selectCurrentUser = state => state.auth.user
export const selectAccessToken = state => state.auth.access
export const selectRefreshToken = state => state.auth.refresh
export const selectRole = state => state.auth.role
