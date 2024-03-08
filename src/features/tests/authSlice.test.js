import { test, expect, describe } from 'vitest'
import reducer, {
  setCredentials,
  setDefCredentials,
  logOut
} from '@features/authSlice'

const initialState = {
  user: undefined,
  access: undefined,
  refresh: undefined,
  role: undefined
}

describe('authSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState)
  })

  test('should handle data being added with setCredentials', () => {
    const dataToAdd = {
      user: 1,
      access: 2
    }
    const addedData = {
      user: 1,
      access: 2
    }

    expect(reducer(initialState, setCredentials(dataToAdd))).toEqual(addedData)
  })

  test('should handle data being added with setDefCredentials', () => {
    const dataToAdd = {
      tokens: {
        access: 'access',
        refresh: 'refresh'
      },
      info: {
        role: {
          name: 'role'
        }
      }
    }
    const addedData = {
      access: 'access',
      refresh: 'refresh',
      role: 'role',
      user: {
        role: {
          name: 'role'
        }
      }
    }
    expect(reducer(initialState, setDefCredentials(dataToAdd))).toEqual(
      addedData
    )
  })

  test('should remove with logOut', () => {
    expect(reducer(initialState, logOut())).toEqual(initialState)
  })
})
