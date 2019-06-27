import React from 'react'
import PostFormField from './PostFormField';
import Button from '@material-ui/core/Button';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { makeStyles } from '@material-ui/core/styles';


import './form.scss'
const initValues = {
    email: '',
    password: '',
    username: ''
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'

    }
}));

const Register = (props) => {
    const register = useStoreActions(actions => actions.register)
    const classes = useStyles();
    const created = useStoreState(state => state.created)
    const [formFields] = React.useState(initValues);
    const [fieldError, setFieldError] = React.useState({ email: false, password: false, username: false })

    React.useEffect(() => {
        if (created === true) {
            props.history.push('/auth/login')
        }
    }, [created, props.history])

    const validate = (name, value) => {
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

        switch (name) {
            case 'email':
                const isValid = emailRegex.test(value)
                if (!isValid) {
                    setFieldError({ ...fieldError, email: true })
                } else {
                    setFieldError({ ...fieldError, email: false })
                }
                return
            case 'password':
                if (value.length < 4) {
                    setFieldError({ ...fieldError, password: true })
                } else {
                    setFieldError({ ...fieldError, password: false })
                }
                return
            case 'username':
                if (value.length < 4) {
                    setFieldError({ ...fieldError, username: true })
                } else {
                    setFieldError({ ...fieldError, username: false })
                }
                return
            default:
                return
        }
    }

    function handleChange(event) {
        const val = event.target.value
        const name = event.target.name
        formFields[name] = val
        validate(name, val)
    }

    const handleBlur = (e) => {
        const value = e.target.value
        const name = e.target.name
        validate(name, value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (fieldError.email || fieldError.password) {
            return
        }
        register(formFields)
    }
    return (
        <div className="register-comp">
            <div className="form-control">
                <h1>REGISTER</h1>
            </div>
            <form onSubmit={(e) => onSubmit(e)} >
                <div className={classes.container}>
                    <PostFormField
                        handleBlur={handleBlur}
                        errorMsg="Valid email is required" type="email"
                        isError={fieldError.email}
                        label="Email" name="email"
                        handleChange={handleChange} value={formFields.email}
                    />
                    <PostFormField
                        isError={fieldError.username}
                        errorMsg="Valid password is required"
                        type="text"
                        handleChange={handleChange}
                        value={formFields.username}
                        label="Name"
                        name="username"
                        handleBlur={handleBlur}
                    />

                    <PostFormField handleBlur={handleBlur} isError={fieldError.password} errorMsg="Valid password is required" type="password" handleChange={handleChange} value={formFields.password} label="Password" name="password" />
                </div>
                <div className="form-control">
                    <Button variant="contained" color="primary" type="submit">Register</Button>
                </div>
            </form>
        </div>
    )
}

export default Register
