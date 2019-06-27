import React from 'react'
import PostFormField from './PostFormField';
import Button from '@material-ui/core/Button';
import { useStoreActions, useStoreState } from 'easy-peasy'
import './form.scss'

const Login = (props) => {
    const [initValues] = React.useState({
        email: '',
        password: ''
    })

    const login = useStoreActions(actions => actions.login)
    const user = useStoreState(state => state.user)
    const requestError = useStoreState(state => state.requestError)
    const requestMessage = useStoreState(state => state.requestMessage)
    const [formFields, setFormFields] = React.useState(initValues);
    const [fieldError, setFieldError] = React.useState({ email: false, password: false })

    React.useEffect(() => {
        if (user.token) {
            props.history.push('/')
        }
    }, [user, props.history])

    const validate = (name, value) => {
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

        switch (name) {
            case 'email':
                const isValid = emailRegex.test(value)
                if (!isValid) {
                    setFieldError({ email: true })
                } else {
                    setFieldError({ email: false })
                }
                return
            case 'password':
                if (value && value.length < 4) {
                    setFieldError({ password: true })
                } else {
                    setFieldError({ password: false })
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
        const val = e.target.value
        const name = e.target.name
        validate(name, val)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (fieldError.email || fieldError.password) {
            return
        }

        login(formFields)
        setFormFields(initValues)
    }


    return (
        <div>
            <div className="form-control">
                <h1>LOGIN</h1>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-container">
                    <PostFormField isError={fieldError.email} errorMsg="Valid email is required" type="email" handleChange={handleChange} value={formFields.email} label="Email" name="email" handleBlur={handleBlur} />
                    <PostFormField isError={fieldError.password} errorMsg="Valid password is required" type="password" handleChange={handleChange} value={formFields.password} label="Password" name="password" />
                </div>
                <div className="form-control">
                    <Button variant="contained" color="primary" type="submit">LOGIN</Button>
                </div>
                {requestError && <p className="request-error">{requestMessage}</p>}
            </form>
        </div>
    )
}

export default Login
