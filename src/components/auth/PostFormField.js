import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FilledInput from '@material-ui/core/FilledInput';


const PostFormField = ({ handleChange, value, label, name, isError, errorMsg, type, handleBlur }) => {
    return (
        <FormControl className='form-control' variant="outlined" error={isError}>
            <InputLabel htmlFor={name}>
                {label}
            </InputLabel>
            <FilledInput
                id={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                name={name}
                type={type}
            />
            {isError &&
                <FormHelperText id={name}>{errorMsg}</FormHelperText>}
        </FormControl>
    )
}

PostFormField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMsg: PropTypes.string,
    isError: PropTypes.bool,
    type: PropTypes.string
}

export default PostFormField
