import '@testing-library/jest-dom'
import axios from 'axios'
import { fireEvent, waitFor, within, screen } from '@testing-library/react'
import { renderWithProviders } from 'testUtils'
import Registration from './Registration'

jest.mock('axios')
describe('(Module) <Registration> ', () => {
  const resources = {
    en: {
      translation: {
        registrationPrivacyPolicyRequired: 'checkbox error',
        registrationLastNameRequired: 'input error',
        registrationCountryRequired: 'dropdown error'
      }
    }
  }
  const cases = {
    token: 'ACCESS',
    email: 'dev@longdong.com',
    goodInput: 'I am a known spartan'
  }
  const state = {
    authReducer: {
      access: cases.token
    }
  }
  const textFields = ['firstName', 'lastName', 'email', 'state']
  const selectContent = {
    registrationCountryPlaceholder: 'editProfileCountryList.Afghanistan',
    registrationProfessionPlaceholder: 'editProfileProfessionList.Physician',
    registrationSpecialtyPlaceholder: 'editProfileSpecialtyList.Endocrinology'
  }

  const registration = state => {
    const { render } = renderWithProviders({
      ui: <Registration />,
      state,
      resources
    })
    return render
  }

  afterAll(() => {
    jest.restoreAllMocks()
  })
  it('should exist', () => {
    const { getByTestId } = registration(state)
    waitFor(() => expect(getByTestId('registration')).toBeInTheDocument())
  })
  describe('when user submits', () => {
    beforeEach(() => {
      window.grecaptcha = {
        ready: jest.fn(callback => {
          callback() // Calls the callback immediately
        }),
        execute: jest.fn(() => {
          // Simulate executing the reCaptcha and return a mock token
          return Promise.resolve('mock-recaptcha-token')
        })
      }
    })
    it('form should submit', async () => {
      const { getByTestId, getByRole, getByText } = registration(state)

      // fill text inputs
      await Promise.all(
        textFields.map(async testId => {
          const input = within(getByTestId(testId)).getByRole('textbox')
          fireEvent.change(input, {
            target: { value: cases.email }
          })
          await expect(input).toHaveValue(cases.email)
        })
      )
      //  fill selects
      for (const [key, value] of Object.entries(selectContent)) {
        const select = getByText(key)
        //const select = getByRole('button')
        expect(select).toBeInTheDocument()
        fireEvent.mouseDown(select)
        const listbox = within(getByRole('listbox'))
        const option = listbox.getByText(value)
        fireEvent.click(option)
      }
      //  toggle checkbox
      const toggle = getByTestId('toggle')
      await waitFor(() => {
        fireEvent.click(toggle)
      })

      //  Mock axios interaction
      axios.post.mockReturnValue({ data: {} })
      // Submit form
      await waitFor(() => fireEvent.click(screen.getByTestId('submit')))
      // Verify axios request
      await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))
    })
    it('inputs should trigger error msgs', async () => {
      const { getByText } = registration(state)

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('submit'))
      })
      expect(getByText('input error')).toBeInTheDocument()
      expect(getByText('checkbox error')).toBeInTheDocument()
      expect(getByText('dropdown error')).toBeInTheDocument()
    })
  })
})
