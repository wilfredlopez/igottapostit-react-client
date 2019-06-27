import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Pagination, TablePaginationActions } from '../pagination/Pagination';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import './posts.scss'
import EditPost from './EditPosts'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import { useStoreState, useStoreActions } from 'easy-peasy'

import config from '../../config/index'


let serverUrl = ''

if (config.MODE === 'development') {
    serverUrl = config.SERVER_URL
}



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


const Post = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    // const posts = useStoreState(state => state.posts)
    const [posts, setPosts] = React.useState([])
    const user = useStoreState(state => state.user)
    // const fetchPosts = useStoreActions(actions => actions.fetchPosts)
    const fetchPosts = async () => {
        let res
        if (!user.token) {
            res = await fetch(`${serverUrl}/api/posts`)
        } else {
            res = await fetch(`${serverUrl}/api/posts`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
        }
        const data = await res.json()
        setPosts(data.posts)
    }
    const deletePost = useStoreActions(actions => actions.deletePost)
    const [editContent, setEditContent] = React.useState(null)

    React.useEffect(() => {
        // fetchPosts(user.token)
        fetchPosts()

        //eslint-disable-next-line
    }, [])



    const handleDelete = (id) => {
        const data = {
            id: id,
            token: user.token
        }

        deletePost(data)

    }

    const closeEdit = () => {
        setEditContent(null)
    }

    const handleEditPost = (post) => {
        setEditContent(<EditPost post={post} close={() => closeEdit()} updatePost={(e, post) => updatePost(e, post)} />)
    }

    const updatePost = async (e, post) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', post.image)
        formData.append('title', post.title)
        formData.append('content', post.content)

        fetch(`${serverUrl}/api/posts/${post._id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        }).then((res) => {
            //eslint-disable-next-line
            if (res.status === 200) {
                res.json().then((data) => {
                    const index = posts.findIndex(p => p._id === post._id)
                    posts[index] = data.post
                }).then(() => {
                    setEditContent(null)
                })
            }
        })
        //close modal

    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
    }
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage)
    const classes = useStyles();


    const allPosts = posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(post => {
        const updateDate = new Date(post.updatedAt).toDateString()
        return <ExpansionPanel key={post._id}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"

            >
                <Typography className={classes.heading}>
                    {post.title}
                </Typography>
            </ExpansionPanelSummary>
            <div className="post-image">
                <img src={post.image} alt="wilfred" />
            </div>
            <ExpansionPanelDetails>
                <div>
                    <Typography>
                        {post.content}
                    </Typography>
                </div>
            </ExpansionPanelDetails>
            <div className="post-footer">


                <Typography variant="caption">
                    <p className="post-username">By {post.creator.username}</p>
                    <p>Updated: {updateDate}</p>

                </Typography>

            </div>
            <Divider />
            {post.creator._id === user.userId &&
                <ExpansionPanelActions>
                    <Button size="small" color="primary" onClick={() => { handleEditPost(post) }}>Edit</Button>
                    <Button size="small" color="secondary" onClick={() => handleDelete(post._id)}>
                        Delete
              </Button>

                </ExpansionPanelActions>
            }
        </ExpansionPanel>

    })


    return (
        <div className="posts-component">
            <div className={classes.root}>
                {allPosts}
                {editContent}

            </div>

            <br />
            <div className="pagination-div">
                <InputLabel htmlFor="rows-per-page">Posts Per Page: </InputLabel>
                <Select
                    input={<Input id="rows-per-page" />}
                    value={rowsPerPage}
                    onChange={(e) => {
                        setPage(0)
                        return setRowsPerPage(e.target.value)
                    }}
                    inputProps={{
                        name: 'page',
                        id: 'Per Page',
                    }}
                >
                    <MenuItem value={1}>1</MenuItem>
                    {posts.length > 2 && <MenuItem value={3}>3</MenuItem>}
                    {posts.length > 6 && <MenuItem value={6}>6</MenuItem>}
                    {posts.length > 15 && <MenuItem value={15}>15</MenuItem>}
                </Select>
                <Pagination
                    rowsPerPageOptions={[1, 5, 15]}
                    colSpan={1}
                    count={posts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'Rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />


            </div>

        </div>
    )
}




export default Post
