import '@testing-library/jest-dom'
import FormCheckBox from './FormCheckBox'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ntk from 'styles/themes/ntk'
import { useForm } from 'react-hook-form'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('(Component) <FormCheckBox>', () => {
  const props = {
    name: 'check'
  }
  const defaultValues = {
    check: false
  }
  const Wrapper = ({ ...props }) => {
    const { control } = useForm({ defaultValues })
    return (
      <ThemeProvider theme={createTheme(ntk)}>
        <FormCheckBox control={control} {...props} />
      </ThemeProvider>
    )
  }

  it('should render truthy', () => {
    const { baseElement } = render(<Wrapper {...props} />)
    expect(baseElement).toBeTruthy()
  })
  it('should handleChange', async () => {
    const { getByTestId } = render(<Wrapper {...props} />)

    const unchecked = getByTestId('CheckBoxOutlineBlankIcon')
    expect(unchecked).toBeInTheDocument()
    await waitFor(() => {
      fireEvent.click(unchecked)
    })
    expect(getByTestId('CheckBoxIcon')).toBeInTheDocument()
  })
})
