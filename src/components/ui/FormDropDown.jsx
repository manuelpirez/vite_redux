import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

import { FormControl, MenuItem, Select as SelectMui } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled } from '@mui/material/styles'

import FormInputHelper from '@ui/FormInputHelper'
import Input from '@ui/Input'
import Label from '@ui/Label'

const Select = styled(SelectMui, {
  name: 'FormDropDown',
  overridesResolver: (props, styles) => [styles.root]
})(({ theme }) => {
  return {
    '.MuiSelect-icon, .MuiSelect-iconOpen': {
      color: theme.palette.formDropDown.selectIcon,
      fontSize: theme.components.FormDropDown.styleOverrides.root.fontSize
    }
  }
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const formControlStyle = { width: '100%' }

/**
 * react-hook-form MUI dropdown integration
 *
 * @param {Object} propOptions
 * @param {string} placeholder
 * @param {string} name
 * @param {*} control
 * @param {string} label
 * @param {boolean} hasHelper
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const FormDropDown = ({
  options: propOptions = {},
  placeholder,
  name,
  control,
  label,
  hasHelper = true,
  ...rest
}) => {
  const options = useMemo(
    () =>
      Object.keys(propOptions).map(key => ({
        key,
        value: propOptions[key]
      })),
    [propOptions]
  )
  const getOptions = () => {
    return options.map(({ key, value }) => (
      <MenuItem key={value} value={key}>
        {value}
      </MenuItem>
    ))
  }
  return (
    <FormControl sx={formControlStyle}>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Select
              displayEmpty
              defaultValue=""
              value={value}
              input={<Input />}
              onChange={onChange}
              MenuProps={MenuProps}
              IconComponent={KeyboardArrowDownIcon}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={value => (value ? propOptions[value] : placeholder)}
              {...rest}
            >
              {getOptions()}
            </Select>
            {hasHelper && (
              <FormInputHelper error={error ? error.message : null} />
            )}
          </>
        )}
      />
    </FormControl>
  )
}
FormDropDown.propTypes = {
  /**
   * list of items for select input
   */
  options: PropTypes.objectOf(PropTypes.string),
  /**
   * input name
   */
  name: PropTypes.string,
  /**
   *
   */
  control: PropTypes.any,
  /**
   * input top label
   */
  label: PropTypes.string,
  /**
   * input holder
   */
  placeholder: PropTypes.string,
  /**
   * if shows FormInputHelper
   */
  hasHelper: PropTypes.bool
}
export default FormDropDown
