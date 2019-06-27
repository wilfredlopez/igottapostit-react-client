import React from 'react'

import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';

const classes =
{
    modalContainer: {
        position: 'fixed',
        left: 0,
        top: 0,
        padding: ' 2.8rem',
        width: '100%',
        background: 'rgba(32, 30, 30, 0.89)',
        zIndex: 2000,
        height: '100%'
    },
    modal: {
        padding: '2rem',
        background: "#fff",
        borderRadius: '5px 5px',
        border: '1px solid #534f4f'
    },
    'btn-close': {
        marginLeft: '8px'
    }
}


const EditPost = (props) => {
    let post = props.post
    const imageEl = React.useRef()


    const [title, setTitle] = React.useState(post.title);
    const [content, setContent] = React.useState(post.content);
    const [fieldError] = React.useState({ title: false, content: false, image: false })
    const [image, setImage] = React.useState(post.image)



    // React.useEffect(() => {
    //i need to create the state first
    //     if (created) {
    //         props.history.push('/')
    //     }
    // })




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

        setImage(file)
    }

    const handleBlur = (e) => {
        const name = e.target.name
        const value = e.target.value
        validate(name, value)
    }



    const pickFile = () => {
        imageEl.current.click()
    }






    return (
        <div style={classes.modalContainer}>
            <div style={classes.modal}>

                <form onSubmit={(e) => {
                    const updatedPost = {
                        _id: post._id,
                        title: title,
                        image: image,
                        content: content
                    }
                    props.updatePost(e, updatedPost)
                }
                }>
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
                        <Button variant="contained" color="primary" type="submit" >UPDATE POST</Button>
                        <Button variant="contained" color="default" type="submit" onClick={() => props.close()} style={{ marginLeft: '8px' }}>Go Back</Button>
                    </div>

                    <p className="request-error">"Error"</p>
                </form>
            </div>
        </div>
    )
}

export default EditPost

