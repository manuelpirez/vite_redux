import '@testing-library/jest-dom'
import ntk from 'styles/themes/ntk'
import FormDropDown from './FormDropDown'
import { useForm } from 'react-hook-form'
import { fireEvent, render, within } from '@testing-library/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '@testing-library/jest-dom/extend-expect'

describe('(Component) <FormDropDown>', () => {
  const props = {
    options: {
      option1: 'Option 1',
      option2: 'Option 2'
    },
    name: 'select',
    label: 'Example Label'
  }
  const cases = {
    selectedOption: 'Option 2'
  }
  const defaultValues = {
    select: ''
  }
  const Wrapper = ({ ...props }) => {
    const { control } = useForm({ defaultValues })
    const options = { option1: 'Option 1' }
    return (
      <ThemeProvider theme={createTheme(ntk)}>
        <FormDropDown control={control} options={options} {...props} />
      </ThemeProvider>
    )
  }

  it('should render truthy', () => {
    const { baseElement } = render(<Wrapper {...props} />)
    expect(baseElement).toBeTruthy()
  })
  it('should render truthy when empty', () => {
    const { baseElement } = render(<Wrapper name={props.name} />)
    expect(baseElement).toBeTruthy()
  })
  it('handles change event', async () => {
    const { getByRole } = render(<Wrapper {...props} />)

    fireEvent.mouseDown(getByRole('combobox'))

    const listbox = within(getByRole('listbox'))

    fireEvent.click(listbox.getByText(cases.selectedOption))
    expect(getByRole('combobox')).toHaveTextContent(cases.selectedOption)
  })
})
