import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import Registration from '@components/Registration'

import { ThemeProvider, createTheme } from '@mui/material/styles'

// eslint-disable-next-line react/prop-types
const MockTheme = ({ children }) => {
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
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
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
  vi.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: str => str,
        i18n: {
          changeLanguage: () => new Promise(() => {})
        }
      }
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {}
    }
  }))
  vi.mock('yup', async importOriginal => {
    const actual = await importOriginal()
    return {
      ...actual,
      object: vi.fn(() => ({
        string: vi.fn(() => ({
          trim: vi.fn(() => ({
            required: vi.fn()
          })),
          email: vi.fn(() => ({
            required: vi.fn()
          }))
        })),
        boolean: vi.fn(() => ({
          equals: vi.fn()
        }))
      }))
    }
  })
  vi.mock('@hookform/resolvers/yup', () => ({
    yupResolver: vi.fn()
  }))
  vi.mock('@hooks/useRecaptcha.js', () => ({
    default: vi.fn()
  }))
  vi.mock('@hooks/useStdEmailRequest.js', () => ({
    default: vi.fn(() => ({
      request: vi.fn()
    }))
  }))
  vi.mock('@hooks/useParseStaticProfileData.js', () => ({
    default: vi.fn(() => ({
      parseProfessions: { key: 'val' },
      parseLimaSpecialties: { key: 'val' },
      parseCountries: { key: 'val' }
    }))
  }))

  afterEach(cleanup)

  it('should render RegistrationForm component', () => {
    // Mock dependencies
    // vi.mock('@ui/FormButton', () => ({ default: vi.fn() }))
    // vi.mock('@ui/FormInput', () => ({ default: vi.fn() }))
    // vi.mock('@ui/FormCheckBox', () => ({ default: vi.fn() }))
    // vi.mock('@ui/FormDropDown', () => ({ default: vi.fn() }))

    // Test the code-under-test
    const { getByText } = render(
      <MockTheme>
        <Registration />
      </MockTheme>
    )
    expect(getByText('registrationHeader')).toBeInTheDocument()
  })
})
