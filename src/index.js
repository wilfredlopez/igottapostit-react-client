import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import model from "./redux-model";
import { StoreProvider, createStore } from "easy-peasy";


const store = createStore(model);


ReactDOM.render(
    <StoreProvider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </StoreProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
