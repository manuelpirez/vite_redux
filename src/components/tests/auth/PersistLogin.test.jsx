import { waitFor } from '@testing-library/react'
import { test, afterEach, describe, beforeEach, expect, vi } from 'vitest'

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
const mocks = vi.hoisted(() => {
  return {
    setDefaultTokenCredentialsMock: vi.fn(),
    utilGetRoleHierarchyMock: vi.fn(),
    useTokenVerifyMock: vi.fn(),
    useTokenLoginMock: vi.fn(),
    searchMock: vi.fn(),
    logout: vi.fn()
  }
})
vi.mock('@hooks/useAuth', async importOriginal => {
  const actual = await importOriginal()
  return {
    default: vi.fn(() => ({
      ...actual,
      token: 'preloaded token',
      role: 'auth',
      setDefaultTokenCredentials: mocks.setDefaultTokenCredentialsMock,
      logout: mocks.logout
    }))
  }
})
vi.mock('@hooks/useTokenVerify', () => {
  return {
    default: () => mocks.useTokenVerifyMock
  }
})
vi.mock('@hooks/useTokenLogin', () => {
  return {
    default: () => mocks.useTokenLoginMock
  }
})
vi.mock('@utils/utilGetRoleHierarchy', () => {
  return {
    default: mocks.utilGetRoleHierarchyMock
  }
})
vi.mock('react-router-dom', async importOriginal => {
  const actual = await importOriginal()
  return {
    ...actual,
    useLocation: mocks.searchMock
  }
})

// helpers
const restoreMocks = () => {
  mocks.setDefaultTokenCredentialsMock.mockRestore()
  mocks.utilGetRoleHierarchyMock.mockRestore()
  mocks.useTokenVerifyMock.mockRestore()
  mocks.useTokenLoginMock.mockRestore()
  mocks.searchMock.mockRestore()
}

// unit tests
describe('no URLtoken & cacheToken >', () => {
  afterEach(() => {
    restoreMocks()
  })
  describe('tokenVerify success > ', () => {
    beforeEach(() => {
      mocks.utilGetRoleHierarchyMock.mockReturnValue(true)
      mocks.searchMock.mockReturnValue({
        pathname: '/',
        search: ''
      })
    })
    test('use tokenVerify & store values correctly', async () => {
      const { getByText } = renderWithProviders(<Integration />, {
        reducers,
        preloadedState: preloadedAuthtoken
      })
      await waitFor(async () => {
        expect(getByText(Hometxt)).toBeInTheDocument()
      })
      await waitFor(async () => {
        expect(mocks.setDefaultTokenCredentialsMock).toHaveBeenCalledOnce()
      })
      await waitFor(async () => {
        expect(mocks.useTokenVerifyMock).toHaveBeenCalledOnce()
      })
    })
  })
  describe('tokenVerify fail > ', () => {
    beforeEach(() => {
      mocks.utilGetRoleHierarchyMock.mockReturnValue(true)
      mocks.searchMock.mockReturnValue({
        pathname: '/',
        search: ''
      })
      mocks.useTokenVerifyMock.mockRejectedValue(
        new Error('Token verify error')
      )
    })
    test('use tokenVerify & not use store & logout', async () => {
      const { getByText } = renderWithProviders(<Integration />, {
        reducers,
        preloadedState: preloadedAuthtoken
      })
      await waitFor(async () => {
        expect(getByText(Hometxt)).toBeInTheDocument()
      })
      await waitFor(async () => {
        expect(mocks.setDefaultTokenCredentialsMock).not.toHaveBeenCalledOnce()
      })
      await waitFor(async () => {
        expect(mocks.useTokenVerifyMock).toHaveBeenCalledOnce()
      })
      await waitFor(async () => {
        expect(mocks.logout).toHaveBeenCalledOnce()
      })
    })
  })
})
describe('URLtoken & cacheToken > ', () => {
  afterEach(() => {
    restoreMocks()
  })
  describe('URLtoken is higher than cacheToken > ', () => {
    describe('tokenLogin succes > ', () => {
      beforeEach(() => {
        mocks.utilGetRoleHierarchyMock.mockReturnValue(true)
        mocks.searchMock.mockReturnValue({
          pathname: '/',
          search: '?otp=value1'
        })
      })
      test('use tokenLogin with valid URL token & store values correctly', async () => {
        const { getByText } = renderWithProviders(<Integration />, {
          reducers,
          preloadedState: {
            auth: {
              role: 'auth',
              access: '123'
            }
          }
        })
        await waitFor(async () => {
          expect(getByText(Hometxt)).toBeInTheDocument()
        })
        await waitFor(async () => {
          expect(mocks.setDefaultTokenCredentialsMock).toHaveBeenCalledOnce()
        })
        await waitFor(async () => {
          expect(mocks.useTokenLoginMock).toHaveBeenCalledOnce()
        })
      })
    })
    describe('tokenLogin fails > ', () => {
      beforeEach(() => {
        mocks.utilGetRoleHierarchyMock.mockReturnValue(true)
        mocks.searchMock.mockReturnValue({
          pathname: '/',
          search: '?otp=value1'
        })
        mocks.useTokenLoginMock.mockRejectedValue(
          new Error('Token Login error')
        )
      })
      test('use tokenVerify with valid cacheToken & store values correctly', async () => {
        const { getByText } = renderWithProviders(<Integration />, {
          reducers,
          preloadedState: {
            auth: {
              role: 'auth',
              access: '123'
            }
          }
        })
        await waitFor(async () => {
          expect(getByText(Hometxt)).toBeInTheDocument()
        })
        await waitFor(async () => {
          expect(mocks.setDefaultTokenCredentialsMock).toHaveBeenCalledOnce()
        })
        await waitFor(async () => {
          expect(mocks.useTokenLoginMock).toHaveBeenCalledOnce()
        })
        await waitFor(async () => {
          expect(mocks.useTokenVerifyMock).toHaveBeenCalledOnce()
        })
      })
    })
    describe('tokenLogin & cacheToken fails > ', () => {
      beforeEach(() => {
        mocks.utilGetRoleHierarchyMock.mockReturnValue(true)
        mocks.searchMock.mockReturnValue({
          pathname: '/',
          search: '?otp=value1'
        })
        mocks.useTokenLoginMock.mockRejectedValue(
          new Error('useTokenLoginMock Login error')
        )
        mocks.useTokenVerifyMock.mockRejectedValue(
          new Error('useTokenVerifyMock Login error')
        )
      })
      test('logout correctly', async () => {
        const { getByText } = renderWithProviders(<Integration />, {
          reducers,
          preloadedState: {
            auth: {
              role: 'auth',
              access: '123'
            }
          }
        })
        await waitFor(async () => {
          expect(getByText(Hometxt)).toBeInTheDocument()
        })
        await waitFor(async () => {
          expect(
            mocks.setDefaultTokenCredentialsMock
          ).not.toHaveBeenCalledOnce()
        })
        // first and second pass
        await waitFor(async () => {
          expect(mocks.useTokenLoginMock).toBeCalledTimes(2)
        })
        await waitFor(async () => {
          expect(mocks.useTokenVerifyMock).toHaveBeenCalledOnce()
        })
        await waitFor(async () => {
          expect(mocks.logout).toHaveBeenCalled()
        })
      })
    })
  })

  describe('URLtoken is lower than cacheToken > ', () => {
    describe('tokenVerify succes > ', () => {
      beforeEach(() => {
        mocks.utilGetRoleHierarchyMock.mockReturnValue(false)
        mocks.searchMock.mockReturnValue({
          pathname: '/',
          search: '?otp=value1'
        })
      })
      test('Use tokenVerify & store values correctly', async () => {
        const { getByText } = renderWithProviders(<Integration />, {
          reducers,
          preloadedState: preloadedAuthtoken
        })
        await waitFor(async () => {
          expect(getByText(Hometxt)).toBeInTheDocument()
        })
        await waitFor(async () => {
          expect(mocks.setDefaultTokenCredentialsMock).toHaveBeenCalledOnce()
        })
        await waitFor(async () => {
          expect(mocks.useTokenLoginMock).not.toHaveBeenCalledOnce()
        })
        await waitFor(async () => {
          expect(mocks.useTokenVerifyMock).toHaveBeenCalledOnce()
        })
      })
    })
    describe('tokenVerify fails > ', () => {
      beforeEach(() => {
        mocks.utilGetRoleHierarchyMock.mockReturnValue(false)
        mocks.searchMock.mockReturnValue({
          pathname: '/',
          search: '?dp=value1'
        })
        mocks.useTokenVerifyMock.mockRejectedValue(
          new Error('Token Login error')
        )
        mocks.useTokenLoginMock.mockReturnValue({
          role: 'auth',
          access: 'preloaded_token'
        })
      })
      test('use 2nd tokenLogin & store values correctly', async () => {
        // RENDER
        const { getByText } = renderWithProviders(<Integration />, {
          reducers,
          preloadedState: preloadedAuthtoken
        })
        // test proper redirection
        await waitFor(async () => {
          expect(getByText(Hometxt)).toBeInTheDocument()
        })
        // test cacheToken verify was triggered once
        await waitFor(async () => {
          expect(mocks.useTokenVerifyMock).toHaveBeenCalledOnce()
        })
        // test tokenVerify was triggered once
        await waitFor(async () => {
          expect(mocks.useTokenLoginMock).toHaveBeenCalledOnce()
        })
        // test state was only updated once
        await waitFor(async () => {
          expect(mocks.setDefaultTokenCredentialsMock).toHaveBeenCalledOnce()
        })
      })
    })
    describe('tokenVerify fails & tokenLogin fails > ', () => {
      beforeEach(() => {
        mocks.utilGetRoleHierarchyMock.mockReturnValue(false)
        mocks.searchMock.mockReturnValue({
          pathname: '/',
          search: '?dp=value1'
        })
        mocks.useTokenVerifyMock.mockRejectedValue(
          new Error('cache token Login error')
        )
        mocks.useTokenLoginMock.mockRejectedValue(
          new Error('url token Login error')
        )
      })
      test('use the 2nd tokenLogin & trigger logout', async () => {
        // RENDER
        const { getByText } = renderWithProviders(<Integration />, {
          reducers,
          preloadedState: preloadedAuthtoken
        })
        // test proper redirection
        await waitFor(async () => {
          expect(getByText(Hometxt)).toBeInTheDocument()
        })
        // test cacheToken verify was triggered once
        await waitFor(async () => {
          expect(mocks.useTokenVerifyMock).toHaveBeenCalledOnce()
        })
        // test tokenVerify was triggered once
        await waitFor(async () => {
          expect(mocks.useTokenLoginMock).toHaveBeenCalledOnce()
        })
        await waitFor(async () => {
          expect(mocks.logout).toHaveBeenCalled()
        })
        // test state was only updated once
        await waitFor(async () => {
          expect(
            mocks.setDefaultTokenCredentialsMock
          ).not.toHaveBeenCalledOnce()
        })
      })
    })
  })
})
describe('no URLtoken & no cacheToken >', () => {
  afterEach(() => {
    restoreMocks()
  })
  beforeEach(() => {
    mocks.utilGetRoleHierarchyMock.mockReturnValue(true)
    mocks.searchMock.mockReturnValue({
      pathname: '/',
      search: undefined
    })
  })
  test('free load screen and render', async () => {
    const useAuth = await import('@hooks/useAuth')
    useAuth.default = (await vi.importActual('@hooks/useAuth')).default
    const { getByText } = renderWithProviders(<Integration />, {
      reducers,
      preloadedState: {}
    })
    await waitFor(async () => {
      expect(getByText(Hometxt)).toBeInTheDocument()
    })
    await waitFor(async () => {
      expect(mocks.setDefaultTokenCredentialsMock).not.toHaveBeenCalledOnce()
    })
    await waitFor(async () => {
      expect(mocks.useTokenLoginMock).not.toHaveBeenCalledOnce()
    })
    await waitFor(async () => {
      expect(mocks.useTokenVerifyMock).not.toHaveBeenCalledOnce()
    })
  })
})

// const useTokenVerify = await import('@hooks/useTokenVerify')
// useTokenVerify.default = (
//   await vi.importActual('@hooks/useTokenVerify')
// ).default
