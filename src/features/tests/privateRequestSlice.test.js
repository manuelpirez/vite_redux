import {
  test,
  beforeAll,
  afterEach,
  afterAll,
  describe,
  beforeEach,
  expect
} from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { privateRequestsSlice } from '@features/endpoints/privateRequestsSlice.js'
import authSlice from '@features/authSlice'
import { setupApiStore } from '../../../test/test-utils'

let storeRef = setupApiStore(privateRequestsSlice, {
  auth: authSlice
})

const server = setupServer()

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

describe('Happy path', () => {
  const verifyResponse = {
    access: 'ACCESS_TOKEN2',
    refresh: 'ACCESS_REFRESH_TOKEN2'
  }
  const refreshToken = {
    access: 'REFRESH_ACCESS_TOKEN',
    refresh: 'REFRESH_REFRESH_TOKEN'
  }
  beforeEach(() => {
    server.use(
      ...[
        http.post('/v2/auth/token/refresh', () => {
          return HttpResponse.json(refreshToken)
        }),
        http.post('/v2/auth/token/verify', () => {
          return HttpResponse.json(verifyResponse)
        })
      ]
    )
  })

  test('should do token login and return access & refresh tokens', async () => {
    const test = await storeRef.store.dispatch(
      privateRequestsSlice.endpoints.tokenVerify.initiate('token')
    )
    expect(test).toEqual({
      data: verifyResponse
    })
  })
})

describe('Refresh path', () => {
  let count = 0
  const verifyResponse = {
    access: 'ACCESS_TOKEN2',
    refresh: 'ACCESS_REFRESH_TOKEN2'
  }
  const refreshToken = {
    access: 'REFRESH_ACCESS_TOKEN',
    refresh: 'REFRESH_REFRESH_TOKEN'
  }
  beforeEach(() => {
    // block first verify
    server.use(
      ...[
        http.post('/v2/auth/token/verify', () => {
          count++
          if (count % 2 === 0) {
            return HttpResponse.json(verifyResponse)
          } else {
            return new HttpResponse(null, {
              status: 403
            })
          }
        }),
        http.post('/v2/auth/token/refresh', () => {
          return HttpResponse.json(refreshToken)
        })
      ]
    )
  })

  test('should refresh after verify responds 403 and verify again', async () => {
    const test = await storeRef.store.dispatch(
      privateRequestsSlice.endpoints.tokenVerify.initiate('token')
    )
    expect(test).toEqual({
      data: verifyResponse
    })
  })
})

describe('Fail path', () => {
  beforeEach(() => {
    // block first verify
    server.use(
      ...[
        http.post('/v2/auth/token/verify', () => {
          return new HttpResponse(null, {
            status: 403
          })
        }),
        http.post('/v2/auth/token/refresh', () => {
          return new HttpResponse(null, {
            status: 403
          })
        })
      ]
    )
  })

  test('should refresh after verify responds 403 and verify again', async () => {
    const test = storeRef.store.dispatch(
      privateRequestsSlice.endpoints.tokenVerify.initiate('token')
    )

    await expect(() => test.rejects.toThrowError('refresh failed'))
  })
})
