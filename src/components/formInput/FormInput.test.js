import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FormInput from './FormInput'
import ntk from 'styles/themes/ntk'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

describe('(component) <FormInput>', () => {
  const props = {
    name: 'input',
    label: 'Test Label',
    placeholder: 'Test Placeholder'
  }
  const cases = {
    okText: 'i am a known spartan',
    badMultiEmail: 'long@dong, longdong',
    errorMsg: 'long@dong is not a valid email longdong is not a valid email',
    helperMsg: 'long@dong is not a valid email longdong is not a valid email'
  }
  const initialValues = {
    input: ''
  }
  const Wrapper = ({ ...props }) => {
    const validationSchema = Yup.object({
      input: Yup.array()
        .transform((value, originalValue) => {
          if (value !== null) return value
          return originalValue ? originalValue.split(/[\s,]+/) : []
        })
        .of(
          Yup.string()
            .email(({ value }) => `${value} is not a valid email`)
            .required('required')
        )
        .required('required')
    })
    const { control, handleSubmit } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: initialValues
    })
    return (
      <ThemeProvider theme={createTheme(ntk)}>
        <form onSubmit={handleSubmit(() => {})}>
          <FormInput control={control} {...props} />
          <button type="submit">submit</button>
        </form>
      </ThemeProvider>
    )
  }

  it('should render', async () => {
    const { baseElement, getByText, getByPlaceholderText, getByRole } = render(
      <Wrapper {...props} />
    )
    expect(baseElement).toBeTruthy()

    await expect(getByText(props.label)).toBeInTheDocument()
    await expect(getByPlaceholderText(props.placeholder)).toBeInTheDocument()

    await expect(getByRole('textbox')).toHaveAttribute('type', 'text')
  })
  it('handles user input correctly', async () => {
    const { getByRole } = render(<Wrapper {...props} />)

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()

    await userEvent.type(input, cases.okText)
    expect(input).toHaveValue(cases.okText)
  })
  it('triggers multi error', async () => {
    const { getByRole, getByText } = render(<Wrapper {...props} />)

    const input = getByRole('textbox')
    expect(input).toBeInTheDocument()

    await userEvent.type(input, cases.badMultiEmail)
    await waitFor(() => {
      fireEvent.click(screen.getByText('submit'))
    })
    expect(getByText(cases.errorMsg)).toBeInTheDocument()
  })
  it('should not show FormInputHelper if optionalHelper is true', async () => {
    const { getByRole, getByTestId } = render(
      <Wrapper {...props} optionalHelper />
    )
    expect(screen.queryByTestId('form-error')).not.toBeInTheDocument()

    const input = getByRole('textbox')
    await userEvent.type(input, cases.badMultiEmail)
    await waitFor(() => {
      fireEvent.click(screen.getByText('submit'))
    })
    expect(getByTestId('form-error')).toBeInTheDocument()
  })
  it('should show helperMessage, and switch to error message', async () => {
    const { getByRole, getByTestId } = render(
      <Wrapper {...props} optionalHelper helperText={cases.helperMsg} />
    )
    expect(screen.queryByTestId('form-error')).toBeInTheDocument()
    expect(screen.getByText(cases.helperMsg)).toBeInTheDocument()

    const input = getByRole('textbox')
    await userEvent.type(input, cases.badMultiEmail)
    await waitFor(() => {
      fireEvent.click(screen.getByText('submit'))
    })
    expect(getByTestId('form-error')).toBeInTheDocument()
  })
})
