import { test, expect } from 'vitest'
import reducer, {
  addData,
  deleteDataById,
  deleteData
} from '@features/dataSlice.js'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ data: {} })
})

test('should handle data being added to an empty obj', () => {
  const initialState = {
    data: {}
  }
  const dataToAdd = { id: 1, value: 'test' }
  const addedData = { data: { 1: 'test' } }

  expect(reducer(initialState, addData(dataToAdd))).toEqual(addedData)
})

test('should handle an item being added to an existing object', () => {
  const initialState = { data: { 1: 'test' } }
  const dataToAdd = { id: 2, value: 'test' }
  const addedData = { data: { 1: 'test', 2: 'test' } }

  expect(reducer(initialState, addData(dataToAdd))).toEqual(addedData)
})

test('should return the initial state when called with undefined state and undefined action', () => {
  const action = { type: undefined }
  const expectedState = { data: {} }

  expect(reducer(undefined, action)).toEqual(expectedState)
})

test('should remove an item from an existing obj', () => {
  const initialState = { data: { 1: 'test', 2: 'test' } }
  const idToRemove = 2
  const finalData = { data: { 1: 'test' } }

  expect(reducer(initialState, deleteDataById(idToRemove))).toEqual(finalData)
})

test('should remove all data', () => {
  const initialState = { data: { 1: 'test', 2: 'test' } }
  const idToRemove = 2
  const finalData = { data: {} }

  expect(reducer(initialState, deleteData(idToRemove))).toEqual(finalData)
})
