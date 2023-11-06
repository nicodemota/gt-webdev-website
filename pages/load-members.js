import React, {Component, useEffect, useState} from "react";
import AdminNavBar from "../components/AdminNavBar";
import Head from 'next/head'
import {Box, Button, TextareaAutosize, TextField} from "@mui/material";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from "../helpers/firebase";
import {useRouter} from 'next/router'


const LoadMembersPage = () => {

    const [adminConfirmed, setAdminConfirmed] = useState(false);



    const [googleSheetURL, setSheetId] = useState('https://docs.google.com/spreadsheets/d/1eMMkaZPDnYvdCXVUvtI4P1QEDBlYmoMzZL3XOKJqaWE');
    const [nameColumn, setSheetName] = useState('B');
    const [formerMemberColumn, setFormerMemberColumn] = useState('N');
    const [appliedPastColumn, setAppliedPastColumn] = useState('P');
    const [essayResponseColumn, setEssayResponseColumn] = useState('["AK", "AL"]');
    const [projectPreferenceColumn, setProjectPreferenceColumn] = useState('["I", "J", "K", "L", "M"]');
    const [semesterName, setSemesterName] = useState("Fall 2023");

    const auth = getAuth(firebaseApp);
    const router = useRouter();

    // check if user is admin - if they are not, then kick them out from this page
    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    user.getIdTokenResult()
                        .then((idTokenResult) => {
                            const isAdmin = idTokenResult?.claims?.admin === true;
                            if (isAdmin) {
                                setAdminConfirmed(true);
                            } else {
                                router.push('/login');
                            }
                        })
                        .catch((error) => {
                            console.log('Error verifying user information', error);
                            alert('Error verifying user information');
                        });
                } else if (!user) {
                    router.push('/login');
                }
            });
        }
    }, []);




    return (
        <div>
            {
                adminConfirmed === false ?
                    (
                        <>
                            <Head>
                                <title>Contact | GT WebDev</title>
                            </Head>
                            <AdminNavBar/>
                            <div className="main" style={{display: "flex", width: "100%", justifyContent: "center"}}>
                                <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '500px', rowGap: '10px'}}>
                                    <h2 style={{textAlign: "center"}}>Verifying authentication...</h2>
                                </Box>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <Head>
                                <title>Contact | GT WebDev</title>
                            </Head>
                            <AdminNavBar/>
                            <div className="main" style={{display: "flex", width: "100%", justifyContent: "center"}}>
                                <Box sx={{display: 'flex', flexDirection: 'column', width: "100%", rowGap: '10px', alignItems: "center"}}>
                                    <h1 style={{textAlign: "center", fontSize: '60px'}}>Load Members From Google Sheets</h1>
                                    <Box sx={{display: 'flex', flexDirection: 'column', width: "70%", maxWidth: "600px", alignItems: "center", rowGap: "10px"}}>

                                        {
                                
                                            <>
                                                
                                                <TextField id="outlined-basic" label="Form Responses URL (Google Sheet)" variant="outlined" type="text"
                                                           name="sheet-id" fullWidth={true} value={googleSheetURL} onChange={(event) => {
                                                    setSheetId(event.target.value)
                                                }} style={{
                                                    textcolor: 'white',
                                                }}
                                                />
                                                
                                                <TextField id="outlined-basic" label="Name Column" variant="outlined" type="text"
                                                           name="sheet-name" fullWidth={true} value={nameColumn} onChange={(event) => {
                                                    setSheetName(event.target.value)
                                                }}
                                                />
                                                
                                                <TextField id="outlined-basic" label="Was Former Member Column" variant="outlined" type="text"
                                                           name="name" fullWidth={true} value={formerMemberColumn} onChange={(event) => {
                                                    setNameColumn(event.target.value)
                                                }}
                                                />
                                              
                                                <TextField id="outlined-basic" label="Applied to Project in Past Column" variant="outlined" type="number"
                                                           name="project-preference" fullWidth={true} value={appliedPastColumn} onChange={(event) => {
                                                    setProjectPreferenceNumber(parseInt(event.target.value))
                                                }}
                                                />
                                               
                                                <TextField id="outlined-basic" label="Essay Responses Columns" variant="outlined" type="text"
                                                           name="former-member" fullWidth={true} value={essayResponseColumn} onChange={(event) => {
                                                    setFormerMemberColumn(event.target.value)
                                                }}
                                                />
                                                
                                    
                                                
                                                <TextField id="outlined-basic" label="Project Preferences Column" variant="outlined" type="text"
                                                           name="essay-columns" fullWidth={true} value={projectPreferenceColumn} onChange={(event) => {
                                                           setEssayColumns(event.target.value)
                                                }}
                                                />
                                               
                                                <TextField id="outlined-basic" label="Semester Name" variant="outlined" type="text"
                                                           name="project-columns" fullWidth={true} value={semesterName} onChange={(event) => {
                                                           setProjectColumns(event.target.value)
                                                }}
                                                />

                                              


                                                <Button fullWidth={true} onClick={() => {
                                                }} variant="contained"> Load Members from Google Sheet Into Database </Button>


<Button fullWidth={true} onClick={() => {
                                                }} variant="contained"> Back </Button>
                                            </>

                                            
                                        }
                                    </Box>
                                </Box>
                            </div>
                        </>
                    )
            }
        </div>
    );
}

export default LoadMembersPage;
