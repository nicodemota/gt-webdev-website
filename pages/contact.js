import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, {Component, useState} from "react";
import NavBar from "../components/NavBar.js";
import { contactTitle } from '../data/contactData.js';

const Contact = () => {

    const submitMsg = () => {
        console.log("Click on Submit")
    }
    
    return (
        <div>
            <NavBar />
            <br />
            <Typography variant="h4" component="p" className="contactUsText contactUsTitle">
                {contactTitle}
            </Typography>
            <Grid container spacing={1} className="contactUsForm">
                <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth required placeholder="Enter first name" label="First Name" variant="outlined"/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth required placeholder="Enter last name" label="Last Name" />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
                </Grid>
                
                <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" color="primary" onClick={submitMsg}>Submit</Button>
                </Grid>
            </Grid>

        </div>
    )
}

class Contact1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "email": "",
            "message": "",
            "submitted": false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    callAPI = () => {
        let url = process.env.NEXT_PUBLIC_BASE_URL + '/api/sendMessage';
        //let url = "http://localhost:3000/api/joinClub";
        return axios.post(url, {
            "name": this.state.name,
            "email": this.state.email,
            "message": this.state.message
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.name) {
            alert("You must fill in your name.");
        } else if (!this.state.email) {
            alert("You must fill in your email.");
        } else if (!this.state.message) {
            alert("You must fill in a message.");
        } else {
            this.callAPI()
            .then((res) => {
                this.setState({
                    "submitted": true
                });
            })
            .catch((error) => {
                alert("The email you inputted is invalid. Note that it must be a gatech.edu address.");
            });
        }
    }

    render() {
        let questionBody = this.state.submitted ?
            <MessageSubmitted /> :
            <AskQuestion handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        return (
            <div>
                <Head>
                    <title>Contact | GT WebDev</title>
                </Head>
                <NavBar />
                <div className="main">
                    <MainContact />
                    <Typography variant="h4" className="title">admin contact information</Typography>
                    <Grid container className="adminContactTitle">
                        {adminContacts.map(contact => (
                            <AdminContact name={contact.name} title={contact.title} email={contact.email}/>
                        ))}
                    </Grid>
                    <br />
                    {/* <Typography variant="h4" className="title">send gt webdev a message</Typography>
                    {questionBody} */}
                </div>
                <BottomBar />
            </div>
        );
    }
}

class MainContact extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4" className="title">organization contact information</Typography>
                <Grid container id="mainContactContainer" spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Link href="https://discord.gg/BbykvvQmGz">
                            <img src="discordIcon.png" className="mainContactImg"></img>
                            <Typography variant="body1">Join Our Discord Here!</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Link href="mailto:gtwebdevclub@gmail.com">
                            <img src="mailIcon.png" className="mainContactImg"></img>
                            <Typography variant="body1">gtwebdevclub@gmail.com</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Link href="https://www.instagram.com/gtwebdev/">
                            <img src="Instagram.png" className="mainContactImg"></img>
                            <Typography variant="body1">Instagram.com/gtwebdev/</Typography>
                        </Link>
                    </Grid>
                </Grid>
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
        let emailLink = "mailto:" + this.state.email;
        return (
            <Grid item xs={12} md={4}>
                <div className="centered">
                    <Typography variant="body1">{this.state.name}, <b>{this.state.title}</b></Typography>
                    <Link href={emailLink}>{this.state.email}</Link>
                </div>
            </Grid>
        );
    }
}

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.props.handleChange;
        this.handleSubmit = this.props.handleSubmit;
    }
    render() {
        return (
            <form noValidate autoComplete="off" className="indented" onSubmit={this.handleSubmit}>
                <TextField id="filled-basic" label="Name" name="name" variant="filled" onChange={this.handleChange} />
                <br />
                <br />
                <TextField id="filled-basic" label="Email" name="email" variant="filled" onChange={this.handleChange} />
                <br />
                <br />
                <TextField id="filled-basic" label="Message" name="message" variant="filled" className="emailBox" onChange={this.handleChange} />
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">Send Message</Button>
            </form>
        );
    }
}

class MessageSubmitted extends Component {
    render() {
        return (
            <div className="indented">
                <Typography variant="body1">You successfully sent us a message!</Typography>
                <br />
                <img src="happyKoala.jpg" id="happyKoala"></img>
            </div>
        );
    }
}

export default Contact;
