import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'

import FormInputHelper from '@ui/FormInputHelper'
import Input from '@ui/Input'
import Label from '@ui/Label'

const formControlStyle = { width: '100%' }

/**
 * process react-hook-form error array
 * @param {array} error
 * @returns {*|undefined}
 */
const handleErrorMsg = error => {
  if (error)
    return Array.isArray(error)
      ? error.map(error => error.message).join(' ')
      : error?.message
  return undefined
}
/**
 * Decides which text to show below the input
 * @param error
 * @param optionalHelper
 * @param helperText
 * @returns {undefined|JSX.Element}
 */
const handleInputHelper = (error, optionalHelper, helperText) => {
  const formError = <FormInputHelper error={handleErrorMsg(error)} />
  const formHelper = <FormInputHelper message={helperText} />
  if (!optionalHelper) return formError
  if (optionalHelper && error) return formError
  if (optionalHelper && helperText) return formHelper
  return undefined
}

/**
 * react-hook-form MUI integration
 * @param type
 * @param name
 * @param control
 * @param label
 * @param placeholder
 * @param helper
 * @param optionalHelper
 * @param rest
 * @returns {JSX.Element}
 */
const FormInput = ({
  optionalHelper = false,
  type = 'text',
  helperText = '',
  name,
  control,
  label,
  placeholder,
  labelStyle,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={formControlStyle}>
          <Label sx={labelStyle}>{label}</Label>
          <Input
            inputProps={{
              'data-testid': 'form-input'
            }}
            fullWidth
            type={type}
            error={!!error}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            {...rest}
          />
          {handleInputHelper(error, optionalHelper, helperText)}
        </FormControl>
      )}
    />
  )
}
FormInput.propTypes = {
  /**
   * react-hook-form useForm control
   */
  control: PropTypes.any.isRequired,
  /**
   * input type
   */
  type: PropTypes.string,
  /**
   * input name
   */
  name: PropTypes.string,
  /**
   * top label text
   */
  label: PropTypes.string,
  /**
   * If true:
   *  it will hide the FormInputHelper component until there is an error
   *  it will show helperText whenever there is no error
   */
  optionalHelper: PropTypes.bool,
  /**
   * non error input helper text
   */
  helperText: PropTypes.string,
  /**
   * input placeholder
   */
  placeholder: PropTypes.string,
  /**
   * styles applied directly to the label
   */
  labelStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}
export default FormInput
