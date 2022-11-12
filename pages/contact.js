import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, {Component, useState} from "react";
import NavBar from "../components/NavBar.js";
import { contactTitle } from '../data/contactData.js';

const Contact = () => {

    const [blob, setBlob] = useState({first: "W", last: "A", email: "LKJ", msg: "alsjdfl;asd"})

    const submitMsg = () => {
        console.log(`A message submitted by ${blob.first} ${blob.last}(${blob.email}) \n message: ${blob.msg}.`)
    }

    const handleFormChange = (blobProp, blobVal) => {
        const blobCopy = blob
        blobCopy[blobProp] = blobVal
        setBlob(blobCopy)
    }
    
    return (
        <div>
            <NavBar />
            <br />
            <Typography variant="h4" component="p" className="contactUsText contactUsTitle">
                {contactTitle}
            </Typography>
            <Grid container rowSpacing={1} className="contactUsForm">
                <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth required placeholder="Enter first name" label="First Name" variant="outlined"
                        onChange={ e => handleFormChange('first', e.target.value) }
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth required placeholder="Enter last name" label="Last Name" variant="outlined"
                        onChange={ e => handleFormChange('last', e.target.value) }
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <TextField fullWidth required type="email" placeholder="Enter email" label="Email" variant="outlined"
                        onChange={ e => handleFormChange('email', e.target.value) }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField fullWidth required multiline rows={10} placeholder="Type your message here" label="Message" variant="outlined"
                        onChange={ e => handleFormChange('msg', e.target.value) }
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" color="primary" onClick={submitMsg}>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Contact;
