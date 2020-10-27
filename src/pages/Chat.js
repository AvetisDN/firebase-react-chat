import React, {Component} from 'react';
import {
    Grid,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Avatar,
    Typography
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';
import {auth} from "../services/firebase";
import {db} from "../services/firebase";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    async handleSubmit(e) {
        e.preventDefault()
        this.setState({
            writeError: null
        })
        try {
            await db().ref('chats').push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid,
                email: this.state.user.email
            })
            this.setState({
                content: ''
            })
        } catch (err) {
            this.setState({
                writeError: err.message
            })
        }
    }

    handleInput(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    userFriendlyTimestamp(ts) {
        const d = new Date(ts)
        return d.toLocaleString('ru')
    }

    componentDidMount() {
        this.setState({
            readError: null
        })
        try {
            db().ref('chats').on('value', snapshot => {
                let chats = []
                snapshot.forEach((snap) => {
                    chats.push(snap.val())
                })
                this.setState({
                    chats: chats
                })
            })
        } catch (err) {
            console.error(err)
            this.setState({
                readError: err.message
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Chat</h1>
                <h4>
                    Hello, {this.state.user.email}
                </h4>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete={'off'}
                                        fullWidth
                                        label="Message"
                                        required
                                        // multiline
                                        rows={4}
                                        name={'content'}
                                        variant="outlined"
                                        onChange={this.handleInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button size='large'
                                            type='submit'
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SendIcon/>}>
                                        Send
                                    </Button>
                                    {this.state.readError &&
                                    <Alert severity="error">{this.state.readError}</Alert>
                                    }
                                    {this.state.writeError &&
                                    <Alert severity="error">{this.state.writeError}</Alert>
                                    }
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {this.state.chats.map((chat, index) => {
                                return (
                                    <ListItem key={chat.timestamp} className={`msg ${chat.uid === this.state.user.uid ? 'msg-mine' : ''}`}>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    <b>
                                                        {chat.email}
                                                    </b>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                        style={{marginLeft: 10}}
                                                    >
                                                        {this.userFriendlyTimestamp(chat.timestamp)}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    {chat.content}
                                                </React.Fragment>
                                            }
                                        />
                                        <Divider style={{margin: '10px'}}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
