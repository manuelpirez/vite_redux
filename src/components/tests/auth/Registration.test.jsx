import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import Registration from '@components/Registration'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'

// eslint-disable-next-line react/prop-types
const Component = () => {
  const theme = createTheme({
    palette: {
      label: { labelText: 't' },
      formButton: { fontColor: 'coso' }
    },
    typography: {
      formSubtitle: {
        fontSizeSecondary: '16px'
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Registration />
    </ThemeProvider>
  )
}

const Integration = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Component />} />
    </Routes>
  </BrowserRouter>
)

describe('RegistrationForm test:', () => {
  vi.mock('react-hook-form', async importOriginal => {
    const actual = await importOriginal()
    return {
      ...actual,
      useForm: vi.fn(() => ({
        control: {},
        handleSubmit: vi.fn()
      })),
      Controller: vi.fn()
    }
  })
  vi.mock('react', () => ({
    useState: vi.fn(() => [false, vi.fn()]),
    useMemo: vi.fn(() => [false, vi.fn()])
  }))
  vi.mock('@hooks/useRecaptcha.js', () => ({
    default: vi.fn()
  }))

  afterEach(cleanup)

  it('should render RegistrationForm component', () => {
    const { getByText } = render(<Integration />)
    expect(getByText('registrationHeader')).toBeInTheDocument()
  })
})
