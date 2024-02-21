import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//import { PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
  isLoading: false,
  incrementedby: 0
}

// when defining a slicer, we automatically get access to a reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // create reducers and actions
  reducers: {
    // state: reducers should always take the state
    // action: optional to attach to a known function
    increment: state => {
      // createSlice is smart to know  we want to update the state
      // and it allow us to do "mutating" code
      // and behind the scenes its just modifying the state copy
      state.value++
    },
    decrement: state => {
      state.value--
    },
    // action: will contain the payload to let the reducer know by how much
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  },
  // for async funcs
  // builder help us add cases to our reducers
  extraReducers: builder => {
    // we get access to fullfilled/pending because it was created with thunk
    builder
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.value += action.payload
        state.incrementedby = action.payload
        state.isLoading = false
      })
      .addCase(incrementAsync.pending, state => {
        state.isLoading = true
      })
      .addCase(incrementAsync.rejected, state => {
        state.isLoading = false
      })
  }
})

// in case of async actions you will always define the action first using thunk
// and then define the reducers
export const incrementAsync = createAsyncThunk(
  // name
  'counter/incrementAsync',
  async (query, { getState }) => {
    // simulate fetch
    console.log({ query })
    console.log(getState())
    await new Promise(resolve => setTimeout(resolve, 1000))
    return Math.floor(Math.random() * 10) + 1
  }
)

// the slice gives us access to the actions and reducers
// create and export the actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
