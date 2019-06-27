import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStoreState, useStoreActions } from 'easy-peasy'
import { NavLink } from 'react-router-dom'
import './header.scss'

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


const Header = () => {
    const classes = useStyles();
    const logout = useStoreActions(actions => actions.logout)
    const user = useStoreState(state => state.user)

    return (
        <nav>
            <AppBar position="static">
                <Toolbar color="primary">
                    <ul>
                        <li>
                            <NavLink to="/" exact><h3>IGottaPostIt!</h3> </NavLink>
                        </li>
                        <div className="spacer"></div>
                        {!user.token ?
                            <React.Fragment>

                                <li>
                                    <Button variant="contained" color="primary"><NavLink to="/auth/login">LOGIN</NavLink></Button>
                                </li>
                                <li>
                                    <Button variant="contained" color="primary"><NavLink to="/auth/signup">SIGNUP</NavLink></Button>
                                </li>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <li>
                                    <Fab size="small" color="secondary" aria-label="Add" className={classes.fab}>
                                        <NavLink to="/posts/create"> <AddIcon /></NavLink>
                                    </Fab>
                                </li>
                                <li>

                                    <Button variant="contained" color="primary" onClick={() => logout()}>
                                        <span>{
                                            user.username
                                        }</span>
                                    </Button>
                                </li>
                            </React.Fragment>
                        }
                    </ul>
                </Toolbar>
            </AppBar>
        </nav>
    )
}

export default Header
