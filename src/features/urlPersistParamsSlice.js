import { createSlice, createSelector } from '@reduxjs/toolkit'
import { persist } from '@static/urlParams'

const initialState = {
  params: {}
}

const urlPersistParamsSlice = createSlice({
  name: 'urlPersistParamsSlice',
  initialState,
  reducers: {
    // overwrites entire params object
    setPersistParams: (state, action) => {
      const parsedParams = Object.fromEntries(
        new URLSearchParams(action.payload)
      )

      Object.keys(parsedParams)
        .filter(key => persist.includes(key.toLowerCase()))
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

export const {
  setPersistParams,
  addPersistParam,
  deletePersitParam,
  deletePersistParams
} = urlPersistParamsSlice.actions

export default urlPersistParamsSlice.reducer

export const selectPersistParams = state => state?.urlPersistParams?.params

const selectParamId = (state, paramKeys) => paramKeys
//The performance of the code should be acceptable for most scenarios.
// createSelector from the reselect library is designed to memoize the result,
// which means that if the inputs (in this case, params and key) don't change,
// the selector will return the memoized result without recomputing.
export const selectPersistParamsByKey = createSelector(
  [selectPersistParams, selectParamId],
  (params, paramKeys) => {
    const mergedObject = Object.assign(
      {},
      ...paramKeys.map(key => (key in params ? { [key]: params[key] } : null))
    )
    return mergedObject
  }
)
