import { waitFor } from '@testing-library/react'
import {
  test,
  afterEach,
  describe,
  beforeEach,
  expect,
  vi,
  beforeAll,
  afterAll
} from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { renderWithProviders } from '@test/store-provider'

import urlPersistParamsReducer from '@features/urlPersistParamsSlice'
import privateApiSlice from '@features/api/privateApiSlice'
import publicApiSlice from '@features/api/publicApiSlice'
import urlParamsReducer from '@features/urlParamsSlice'
import apiSlice from '@features/api/apiSlice'
import authReducer from '@features/authSlice'

import PersistLogin from '@components/PersistLogin'

// components
const FakeHome = () => <p>FakeHome</p>
const FakeLogin = () => <p>FakeLogin</p>
const NotFound = () => <p>Not Found</p>
const Integration = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<FakeHome />} />
        <Route path="/login" element={<FakeLogin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

// expected
const Hometxt = 'FakeHome'
const reducers = {
  auth: authReducer,
  urlParams: urlParamsReducer,
  urlPersistParams: urlPersistParamsReducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [privateApiSlice.reducerPath]: privateApiSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
}
const preloadedAuthtoken = {
  auth: {
    role: 'auth',
    access: 'preloaded_token'
  }
}

// local mocks
vi.mock('react-router-dom', async importOriginal => {
  const actual = await importOriginal()
  return {
    ...actual,
    useLocation: mocks.searchMock
  }
})

// local mocks
const mocks = vi.hoisted(() => {
  return {
    searchMock: vi.fn()
  }
})
vi.mock('react-router-dom', async importOriginal => {
  const actual = await importOriginal()
  return {
    ...actual,
    useLocation: mocks.searchMock
  }
})
const restoreMocks = () => {
  mocks.searchMock.mockRestore()
}

// Integration testing
const server = setupServer()
describe('integration', () => {
  const verifyResponse = {
    tokens: {
      access: 'AUTH_TOKEN_MSW',
      refresh: 'AUTH_REFRESH_TOKEN_MSW'
    },
    info: {
      role: {
        name: 'auth'
      }
    }
  }
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    restoreMocks()
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })
  beforeEach(() => {
    // mocks.utilGetRoleHierarchyMock.mockReturnValue(false)
    mocks.searchMock.mockReturnValue({
      pathname: '/',
      search: '?otp=value1'
    })
    server.use(
      ...[
        http.post('/v2/auth/token/verify', () => {
          return HttpResponse.json(verifyResponse)
        })
      ]
    )
  })
  test('unit test setDefaultTokenCredentials', async () => {
    // const useTokenVerify = await import('@hooks/useTokenVerify')
    // useTokenVerify.default = (
    //   await vi.importActual('@hooks/useTokenVerify')
    // ).default
    // RENDER
    const { getByText } = renderWithProviders(<Integration />, {
      reducers,
      preloadedState: preloadedAuthtoken
    })
    // test proper redirection
    await waitFor(async () => {
      expect(getByText(Hometxt)).toBeInTheDocument()
    })
  })
})
