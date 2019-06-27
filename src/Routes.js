import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Post from './components/posts/Post'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CreatePost from './components/posts/CreatePost'

const Routes = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" component={Post} exact></Route>
                <Route path="/auth/login" component={Login} exact></Route>
                <Route path="/auth/signup" component={Register} exact></Route>
                <Route path="/posts/create" component={CreatePost} exact></Route>
                <Route path="/" component={NotFound} ></Route>
            </Switch>

        </React.Fragment>
    )
}

export default Routes

const NotFound = () => {
    return (
        <div>
            <h1>Not Found</h1>
        </div>
    )
}
