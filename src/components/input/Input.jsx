import { styled } from '@mui/material/styles'
import OutlinedInput, {
  outlinedInputClasses
} from '@mui/material/OutlinedInput'

/**
 * Custom MUI OutlinedInput interface, based on theme's FormInput
 */
const Input = styled(OutlinedInput, {
  name: 'FormInput',
  overridesResolver: (props, styles) => [styles.root]
})(({ theme, error }) => {
  const borderColor = error
    ? theme.palette.error
    : theme.palette.formInput.inputBorder
  return {
    [`& .${outlinedInputClasses.input}`]: {
      ...theme.components.FormInput.styleOverrides.input,
      color: theme.palette.formInput.inputText,
      '&::placeholder': {
        color: theme.palette.formInput.inputPlaceholder,
        opacity: 1
      }
    },
    [`.${outlinedInputClasses.inputMultiline}`]: {
      ...theme.components.FormInput.styleOverrides.textArea
    },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: borderColor,
      padding: '0px'
    },
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: { opacity: 0.5 },
    [`& .${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: borderColor,
        borderWidth: '1px'
      }
  }
})
export default Input
