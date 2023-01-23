import React, {Component, useEffect, useState} from "react";
import AdminNavBar from "../components/AdminNavBar";
import Head from 'next/head'
import {Box, Button, TextareaAutosize, TextField} from "@mui/material";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from "../helpers/firebase";
import {useRouter} from 'next/router'

const AdminDashboard = () => {
    const [adminConfirmed, setAdminConfirmed] = useState(false);

    // auto-sorting tool
    const [sheetId, setSheetId] = useState('1l4CCiWWuz0y40qaZ9rxIw2tqL-wb-N0VJKrEbtoQWIw');
    const [sheetName, setSheetName] = useState('Form Responses 2');
    const [applicantSortResult, setApplicantSortResult] = useState('');

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

    const sortApplicants = () => {
        // https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}
        const csvURL = `https://docs.google.com/spreadsheets/d/${encodeURI(sheetId)}/gviz/tq?tqx=out:csv&sheet=${encodeURI(sheetName)}`;
        window.open(csvURL);
    }

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
                                    <h1 style={{textAlign: "center"}}>Admin Dashboard</h1>
                                    <Box sx={{display: 'flex', flexDirection: 'column', width: "70%", maxWidth: "600px", alignItems: "center", rowGap: "10px"}}>
                                        <h2>Applicant Auto-Sorter</h2>
                                        <p style={{marginTop: "0px"}}>
                                            Tool to help sort project applicants into teams.
                                            Ensure the Google Sheet is viewable by anyone with the link.
                                        </p>
                                        <p style={{marginTop: "0px"}}>
                                            {`"Sheet ID" can be found from the URL of the Google Sheet (https://docs.google.com/spreadsheets/d/{Sheet ID})`}
                                        </p>
                                        <p style={{marginTop: "0px"}}>
                                            {`"Sheet Name" is the name of the tab you are on (found at the bottom of Google Sheets)`}
                                        </p>
                                        <TextField id="outlined-basic" label="Sheet ID" variant="outlined" type="text"
                                                   name="link" fullWidth={true} value={sheetId} onChange={(event) => {
                                                       setSheetId(event.target.value)
                                                   }}
                                        />
                                        <TextField id="outlined-basic" label="Sheet Name" variant="outlined" type="text"
                                                   name="link" fullWidth={true} value={sheetName} onChange={(event) => {
                                                   setSheetName(event.target.value)
                                        }}
                                        />
                                        { (applicantSortResult && applicantSortResult.length > 0) &&
                                            <>
                                                <TextField id="outlined-basic" label="CSV Result" variant="outlined" type="text"
                                                           name="sort-result" fullWidth={true} multiline={true}
                                                           value={applicantSortResult}
                                                           onChange={(event) => {
                                                               setApplicantSortResult(event.target.value)
                                                           }}/>
                                                <p>Tip: paste this into Google Sheets</p>
                                            </>
                                        }
                                        <Button onClick={() => {
                                            sortApplicants();
                                        }} variant="contained">✨Sort ✨</Button>
                                    </Box>
                                </Box>
                            </div>
                        </>
                    )
            }
        </div>
    );
}

export default AdminDashboard;
