import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  list: [],
  isLoading: false
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list = [...state.list, action.payload]
    },
    removeTodo: state => {
      state.list = state.list.slice(1)
    },
    removeTodoByID: (state, action) => {
      state.list = state.list.filter(list => list.id != action.payload)
    }
  }
})

export const { addTodo, removeTodo, removeTodoByID } = todoSlice.actions
export default todoSlice.reducer
