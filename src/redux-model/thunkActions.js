
import { thunk } from 'easy-peasy'



import config from '../config'

let SERVER_URL = ''

if (config.MODE === 'development') {
    SERVER_URL = config.SERVER_URL
}



export default {
    fetchPosts: thunk(async (actions, token = null) => {

        let res
        if (!token) {
            res = await fetch(`${SERVER_URL}/api/posts`)
        } else {
            res = await fetch(`${SERVER_URL}/api/posts`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        }
        const data = await res.json()
        actions.setPosts(data.posts)
    }),
    login: thunk(async (actions, data) => {
        try {

            const res = await fetch(`${SERVER_URL}/api/users/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify(data), // body data type must match "Content-Type" header
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const user = await res.json()
            if (user.token) {
                actions.setUser(user)
                actions.clearRequestError()

            } else {
                actions.requestFail('Authentication Failed')
            }
        } catch (error) {
            actions.requestFail(`${error}`)
        }
    }),
    register: thunk(async (actions, data) => {
        try {
            actions.clearRequestError()
            const res = await fetch(`${SERVER_URL}/api/users/register`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify(data), // body data type must match "Content-Type" header
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resData = await res.json()
            if (resData.user) {
                actions.successCreate()
                actions.clearRequestError()

            } else {
                actions.requestFail('Authentication Failed')
            }
        } catch (err) {
            actions.requestFail(`${err}`)
        }
    }),
    createPost: thunk(async (actions, data) => {
        try {
            actions.clearRequestError()
            const formData = new FormData()
            formData.append('image', data.image)
            formData.append('title', data.title)
            formData.append('content', data.content)

            const res = await fetch(`${SERVER_URL}/api/posts`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": "Bearer " + data.token
                }
            })

            //eslint-disable-next-line
            if (res.status == 201) {
                // const resData = await res.json()

                actions.successCreate()
            } else {
                actions.requestFail('Error Creating post')
            }

        } catch (err) {
            console.log(err)
            actions.requestFail(`${err}`)
        }

    }),
    deletePost: thunk(async (actions, data) => {

        const res = await fetch(`${SERVER_URL}/api/posts/${data.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + data.token
            }
        })

        //eslint-disable-next-line
        if (res.status == 200) {
            // actions.updatePosts(data.id)
            actions.fetchPosts()
            console.log('delete success from React')

        }

    })
}

