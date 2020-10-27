import React, {Component} from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {NavLink} from "react-router-dom";
import {signout} from '../helpers/auth'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(e) {
        e.preventDefault()
        signout()
    }
    render() {
        return (
            <React.Fragment>
                <h3>Menu</h3>
                <List>
                    <NavLink exact to='/'>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Home'}/>
                        </ListItem>
                    </NavLink>
                    <NavLink to='/chat'>
                        <ListItem button>
                            <ListItemIcon>
                                <ForumIcon/>
                            </ListItemIcon>
                            {!this.props.user &&
                            <ListItemText primary={'Chat'} secondary={'only for users'}/>
                            }
                            {this.props.user &&
                            <ListItemText primary={'Chat'} secondary={`as ${this.props.user.email}`}/>
                            }
                        </ListItem>
                    </NavLink>
                    <NavLink to='/login'>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Login'}/>
                        </ListItem>
                    </NavLink>
                    <NavLink to='/signup'>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonAddIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Signup'}/>
                        </ListItem>
                    </NavLink>
                    <ListItem button onClick={this.handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Logout'}/>
                    </ListItem>
                </List>
            </React.Fragment>
        )
    }
}
