import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Head from "next/head.js";
import NavBar from "../components/NavBar.js";
import { contactTitle } from '../data/contactData.js';

// Contact page consisting of a basic form asking for firstLastName, emailAddress, and msg to send
const Contact = () => {     // TODO - Make a small gap between first & last name textfield without creating margin, and change the color theme

    // Keep track of all the information within 
    const [blob, setBlob] = useState({first: '', last: '', email: '', msg: ''})

    // Handel form data change, pass in the attribute along with the value to set it to
    const handleFormChange = (blobProp, blobVal) => {
        const blobCopy = blob
        blobCopy[blobProp] = blobVal
        setBlob(blobCopy)
    }

    // Submit message to webDev email
    const submitMsg = () => {
        console.log(`A message submitted by ${blob.first} ${blob.last}(${blob.email}) \n message: ${blob.msg}.`)
    }
    
    return (
        <div>
            <Head>
                <title>Contact | GT WebDev</title>
            </Head>
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
