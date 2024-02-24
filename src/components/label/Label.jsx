import { styled } from '@mui/material/styles'

/**
 * Custom Label, based on theme's FormInput
 */
const Label = styled('span', {
  name: 'Label',
  overridesResolver: (props, styles) => [styles.root]
})(({ theme }) => ({
  color: theme.palette.label.labelText
}))
export default Label
