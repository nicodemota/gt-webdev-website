import React, {Component} from "react";
import {adminContacts} from '../data/contactData.js';
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Contact extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="main">
                    <Typography variant="h4">Admin Contact Information</Typography>
                    <br />
                    <Grid container>
                        {adminContacts.map(contact => (
                            <AdminContact name={contact.name} title={contact.title} email={contact.email}/>
                        ))}
                    </Grid>
                    <br />
                    <AskQuestion />
                </div>
                <BottomBar />
            </div>
        );
    }
}

class AdminContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": this.props.name,
            "title": this.props.title,
            "email": this.props.email
        }
    }
    render() {
        return (
            <Grid item xs={4} className="centered">
                <Typography variant="body1">{this.state.name}, <b>{this.state.title}</b></Typography>
                <Typography variant="body1">{this.state.email}</Typography>
            </Grid>
        );
    }
}

class AskQuestion extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4">Ask GT WebDev a Question</Typography>
                <form noValidate autoComplete="off" className="indented">
                    <TextField id="filled-basic" label="Name" variant="filled" />
                    <br />
                    <br />
                    <TextField id="filled-basic" label="Email" variant="filled" />
                    <br />
                    <br />
                    <TextField id="filled-basic" label="Content" variant="filled" className="emailBox" />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">Send Message</Button>
                </form>
            </div>
        );
    }
}

export default Contact;