import React, {Component, useState, useEffect} from "react";
import Head from 'next/head';
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import { Grid, Typography, TextField, Button } from "@mui/material";

const Members = () => {
    const [newMemberName, setNewMemberName] = useState('');
    const [members, setMembers] = useState(['Deepak', 'Stephen']);

    function handleAddNewMember() {
        const newMembersArray = members.slice(0);
        newMembersArray.push(newMemberName);
        setMembers(newMembersArray);
        setNewMemberName('');
    }

    return (
        <div>
            <Head>
                <title>About Us | GT WebDev</title>
            </Head>
            <NavBar />
            <Grid container rowGap={7.5} className="aboutUsContainer">
                <Grid item xs={12} sm={6} md={6}>
                    {/* header text */}
                    <Typography variant="h3" className="aboutUsTxt">
                        Members
                    </Typography>
                    {/* TODO: ability to add new member */}
                    <div>
                        <TextField value={newMemberName} label="New member name" variant="outlined" 
                            onChange={(event) => {
                                setNewMemberName(event?.target?.value)}
                            }/>
                        <Button variant="contained" onClick={() => {handleAddNewMember();}}>Add</Button>
                    </div>
                    {/* list of member names */}
                    {
                        members.map((memberName, index) => {
                            return <Typography key={memberName}>{memberName}</Typography>;
                        })
                    }
                </Grid>
            </Grid>
            <BottomBar />
        </div>
    );
}

export default Members;