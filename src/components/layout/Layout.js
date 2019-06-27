import React from 'react'
import Header from '../header/Header'
import './layout.scss'

const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout
