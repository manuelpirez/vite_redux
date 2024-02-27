import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  data: {}
}

// generates a dynamic and generic key/value object and CRUD in Redux state
const dataSlice = createSlice({
  name: 'generic',
  initialState,
  reducers: {
    // add unique id
    addData: (state, action) => {
      const { id, value } = action.payload
      state.data = {
        ...state.data,
        [id]: value
      }
    },
    // delete state parameter by id
    deleteDataById: (state, action) => {
      delete state.data[action.payload]
    },
    deleteData: state => {
      state.data = {}
    }
  }
})

// Actions
export const { addData, deleteDataById, deleteData } = dataSlice.actions

// Reducer
export default dataSlice.reducer

// Selectors
export const selectData = state => state.data

const selectDataId = (state, id) => id

export const selectDataById = createSelector(
  [selectData, selectDataId],
  (data, id) => ({ [id]: data[id] })
)

export const selectDataByKey = createSelector(
  [selectData, selectDataId],
  (params, id) => {
    const mergedObject = Object.assign(
      {},
      ...id.map(id => (id in params ? { [id]: params[id] } : null))
    )
    return mergedObject
  }
)
