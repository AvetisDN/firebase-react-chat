import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Container, Grid, Paper} from "@material-ui/core";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import {auth} from './services/firebase';

function PrivateRoute({component: Component, authenticated, ...params}) {
    return (
        <Route
            {...params}
            render={(props) => {
                return authenticated ?
                    <Component {...props}/> :
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }}
        />
    )
}

function PublicRoute({component: Component, authenticated, ...params}) {
    return (
        <Route
            {...params}
            render={(props) => {
                return !authenticated ?
                    <Component {...props}/> :
                    <Redirect to='/chat'/>
            }}
        />
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            isLoading: true,
            user: null
        }
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    isLoading: false,
                    user: user
                })
            } else {
                this.setState({
                    authenticated: false,
                    isLoading: false,
                    user: null
                })
            }
        })
    }

    render() {
        return this.state.isLoading ? <h3>Loading...</h3> :
            (
                <Router>
                    <Container className='main'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={9}>
                                <Paper className='paper' elevation={6}>
                                    <Switch>
                                        <Route exact path="/" component={Home}/>
                                        <PrivateRoute path="/chat" authenticated={this.state.authenticated}
                                                      component={Chat}/>
                                        <PublicRoute path="/login" authenticated={this.state.authenticated}
                                                     component={Login}/>
                                        <PublicRoute path="/signup" authenticated={this.state.authenticated}
                                                     component={Signup}/>
                                    </Switch>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper className='paper sidebar' elevation={6}>
                                    <Sidebar user={this.state.user}/>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>
                </Router>
            );
    }

}

export default App;
