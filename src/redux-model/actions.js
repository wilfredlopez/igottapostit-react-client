
import { action } from 'easy-peasy'

export default {
    setUser: action((state, user) => {
        state.user = user
    }),
    logout: action((state) => {
        state.user = {}
    }),
    setPosts: action((state, posts) => {
        state.posts = posts
    }),
    requestFail: action((state, message) => {
        state.requestError = true
        state.requestMessage = message
    }),
    clearRequestError: action((state) => {
        state.requestError = false
        state.requestMessage = null
    }),
    successCreate:action((state) => {
        state.created = true
        state.requestError = false
        state.requestMessage = null
    }),
    startCreate:action((state) => {
        state.created = false
    })
}