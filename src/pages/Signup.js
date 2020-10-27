import React, {Component} from 'react';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import GitHubIcon from '@material-ui/icons/GitHub';
import Alert from '@material-ui/lab/Alert';
import {signup, loginGoogle, loginGithub} from "../helpers/auth";
import {NavLink} from "react-router-dom";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleGoogle = this.handleGoogle.bind(this)
        this.handleGithub = this.handleGithub.bind(this)
    }
    async handleSubmit(e) {
        e.preventDefault()
        this.setState({
            error: ''
        })
        try {
            await signup(this.state.email, this.state.password)
        } catch (err) {
            this.setState({
                error: err.message
            })
        }
    }
    handleInput(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async handleGoogle(e) {
        e.preventDefault()
        try {
            await loginGoogle()
        } catch (err) {
            this.setState({
                error: err.message
            })
        }
    }
    async handleGithub(e) {
        e.preventDefault()
        try {
            await loginGithub()
        } catch (err) {
            this.setState({
                error: err.message
            })
        }
    }
    render() {
        return (
            <div>
                <h1>Signup</h1>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <FormGroup>
                                <TextField type='email'
                                           required
                                           variant="outlined"
                                           label='E-Mail'
                                           value={this.state.email}
                                           name='email'
                                           onChange={this.handleInput}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs>
                            <FormGroup>
                                <TextField type='password'
                                           required
                                           variant="outlined"
                                           label='Password'
                                           value={this.state.password}
                                           name='password'
                                           onChange={this.handleInput}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Button size='large'
                                    type='submit'
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<SaveIcon />}>
                                Sign Up
                            </Button>
                            <Button size='large'
                                    type='button'
                                    variant="contained"
                                    color="default"
                                    style={{marginLeft: 15, fontSize: 24, lineHeight: '1em'}}
                                    onClick={this.handleGoogle}
                            >
                                G
                                {/*<img alt={'Google'} width={25} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_"G"_Logo.svg/512px-Google_"G"_Logo.svg.png'}/>*/}
                            </Button>
                            <Button size='large'
                                    type='button'
                                    variant="contained"
                                    color="default"
                                    style={{marginLeft: 15, fontSize: 28, lineHeight: '1em'}}
                                    onClick={this.handleGithub}
                            >
                                <GitHubIcon/>
                            </Button>
                        </Grid>
                        {this.state.error &&
                            <Grid item xs>
                                <Alert severity="error">{this.state.error}</Alert>
                            </Grid>
                        }
                    </Grid>
                </form>
                <Grid container spacing={3}>
                    <Grid item xs>
                        Already have an account? <NavLink to={'/login'}>Log In</NavLink>
                    </Grid>
                </Grid>

            </div>
        )
    }
}
