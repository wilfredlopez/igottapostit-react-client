import React from 'react'
import Button from '@material-ui/core/Button';
import { useStoreActions, useStoreState } from 'easy-peasy'
import TextField from '@material-ui/core/TextField';
import './createPost.scss'

const CreatePost = (props) => {
    const imageEl = React.useRef()
    const user = useStoreState(state => state.user)
    const created = useStoreState(state => state.created)
    const requestError = useStoreState(state => state.requestError)
    const requestMessage = useStoreState(state => state.requestMessage)
    const createPost = useStoreActions(actions => actions.createPost)
    const startCreate = useStoreActions(actions => actions.startCreate)
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [fieldError] = React.useState({ title: false, content: false, image: false })
    const [image, setImage] = React.useState()
    const [imagePreview, setImagePreview] = React.useState(null)

    React.useEffect(() => {
        if (!user.token) {
            props.history.push('/')
        } else {
            startCreate()
        }
    }, [user, props.history, startCreate])

    React.useEffect(() => {
        if (created) {
            props.history.push('/')
        }
    })

    const validate = (name, value) => {
        switch (name) {
            case 'title':
                if (value.length <= 3) {
                    fieldError.title = true
                } else if (value.length > 3) {
                    fieldError.title = false
                }
                return
            case 'content':
                if (value.length <= 3) {
                    fieldError.content = true
                } else if (value.length > 3) {
                    fieldError.content = false
                }
                return
            default:
                return
        }
    }

    function setValues(name, value) {
        switch (name) {
            case 'title':
                setTitle(value);
                return
            case 'content':
                setContent(value)
                return
            default:
                return
        }
    }

    function handleChange(event) {
        const val = event.target.value
        const name = event.target.name
        setValues(name, val)
        validate(name, val)
    }

    const handleImage = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)


        setImage(file)
    }

    const handleBlur = (e) => {
        const name = e.target.name
        const value = e.target.value
        validate(name, value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (fieldError.title || fieldError.content) {
            return
        }

        const data = {
            title: title,
            content: content,
            image: image,
            token: user.token
        }



        createPost(data)
        //redirect
    }

    const pickFile = () => {
        imageEl.current.click()
    }



    return (
        <div style={{ marginTop: '2rem' }}>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-container">
                    <TextField
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="title"
                        label="Title"
                        name="title"
                        value={title}
                        style={{ margin: 8 }}
                        placeholder="add post title here"
                        helperText="Full width!"
                        fullWidth
                        margin="normal"
                        error={fieldError.title}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <label htmlFor="outlined-button-file">
                        <Button variant="outlined" id="btnPick" component="span"
                            className="create-post-btn" onClick={pickFile}>
                            Upload
        </Button>
                    </label>
                    <div style={{ display: 'none' }}>
                        <input
                            type="file"
                            name="image" id="image"
                            ref={imageEl} aria-labelledby="btnPick"
                            onChange={handleImage}
                        />
                    </div>
                    <br />
                    {imagePreview &&
                        <div className="img-preview-container">

                            <img src={imagePreview} alt="preview" className="img-preview">

                            </img>
                        </div>}
                    <TextField
                        id="content"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Content"
                        name="content"
                        value={content}
                        error={fieldError.content}
                        placeholder="add post content here..."
                        multiline
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ marginLeft: '8px' }}>
                    <Button variant="contained" color="primary" type="submit" >CREATE POST</Button>
                </div>
                {requestError &&
                    <p className="request-error">{requestMessage}</p>}
            </form>
        </div>
    )
}

export default CreatePost

