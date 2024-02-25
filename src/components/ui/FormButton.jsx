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
 * @param props
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
  /**
   * Refers to specific style for the section
   */
  section: PropTypes.oneOf([
    'feedback',
    'profile',
    'emailShare',
    'loginWithEmailAndPass',
    'loginWithEmail',
    'registration',
    'unsubscribe'
  ]),
  /**
   * MUI button variant, defaults to contained
   */
  variant: PropTypes.string,
  /**
   * Button type, defaults to "button"
   */
  type: PropTypes.oneOf(['button', 'submit']),
  /**
   * Button text
   */
  text: PropTypes.string,
  /**
   * Show the loading spinner
   */
  loading: PropTypes.bool,
  /**
   * Disable the button
   */
  disabled: PropTypes.bool,
  /**
   * Support for child component
   */
  children: PropTypes.string
}

export default FormButton
