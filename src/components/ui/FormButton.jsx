import PropTypes from 'prop-types'

import { Button as ButtonUI } from '@mui/material'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

const Button = styled(ButtonUI, {
  name: 'FormButton',
  overridesResolver: (props, styles) => [styles.root]
})(({ theme }) => {
  return {
    color: theme.palette.formButton.fontColor,
    background: theme.palette.formButton.backgroundColor,
    fontSize: theme.palette.formButton.fontSize
  }
})

const Spinner = styled(CircularProgress, {
  name: 'FormButton',
  overridesResolver: (props, styles) => [styles.spinner]
})(({ theme }) => {
  return {
    color: theme.palette.formButton.spinnerColor
  }
})

/**
 * Custom MUI button
 * Inherits from: https://mui.com/material-ui/api/button
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {string} props.text
 * @param {boolean} props.loading
 * @param {*} props.children
 * @param {string} props.variant
 * @returns {JSX.Element}
 * @constructor
 */
const FormButton = ({
  text,
  loading,
  children,
  variant = 'contained',
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      endIcon={loading && <Spinner size={24} />}
      {...rest}
    >
      {children || text}
    </Button>
  )
}

FormButton.propTypes = {
  section: PropTypes.oneOf([
    'feedback',
    'profile',
    'emailShare',
    'loginWithEmailAndPass',
    'loginWithEmail',
    'registration',
    'unsubscribe'
  ]),
  variant: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.string
}

export default FormButton
