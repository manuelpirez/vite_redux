import { createSlice, createSelector } from '@reduxjs/toolkit'
import { noPersist } from '@static/urlParams'

const initialState = {
  params: {}
}

const urlParamsSlice = createSlice({
  name: 'urlParams',
  initialState,
  reducers: {
    // overwrites entire params object
    setParams: (state, action) => {
      const parsedParams = Object.fromEntries(
        new URLSearchParams(action.payload)
      )

      Object.keys(parsedParams)
        .filter(key => noPersist.includes(key.toLowerCase()))
        .forEach(key => {
          state.params[key.toLowerCase()] = parsedParams[key]
        })
    },
    // add unique param to state
    addParam: (state, action) => {
      state.params = { ...action.payload, ...state.params }
    },
    // delete state parameter by key
    deleteParam: (state, action) => {
      delete state.params[action.payload]
    },
    deleteParams: state => {
      state.params = {}
    }
  }
})

// Actions
export const { setParams, addParam, deleteParam, deleteParams } =
  urlParamsSlice.actions

// Reducer
export default urlParamsSlice.reducer

// Selectors
export const selectParams = state => state.urlParams.params

const selectParamId = (state, key) => key

export const selectParamByKey = createSelector(
  [selectParams, selectParamId],
  (params, key) => ({ [key]: params[key] })
)

export const selectParamsByKey = createSelector(
  [selectParams, selectParamId],
  (params, key) => {
    const mergedObject = Object.assign(
      {},
      ...key.map(key => (key in params ? { [key]: params[key] } : null))
    )
    return mergedObject
  }
)
