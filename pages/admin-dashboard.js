import React, {Component, useEffect, useState} from "react";
import AdminNavBar from "../components/AdminNavBar";
import Head from 'next/head'
import {Box, Button, TextareaAutosize, TextField} from "@mui/material";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from "../helpers/firebase";
import {useRouter} from 'next/router'
import {readRemoteFile} from "react-papaparse";

const AdminDashboard = () => {
    const [adminConfirmed, setAdminConfirmed] = useState(false);

    // auto-sorting tool
    const [sheetId, setSheetId] = useState('1l4CCiWWuz0y40qaZ9rxIw2tqL-wb-N0VJKrEbtoQWIw');
    const [sheetName, setSheetName] = useState('Form Responses 2');
    const [nameColumn, setNameColumn] = useState('B');
    const [projectColumnStart, setProjectColumnStart] = useState('I');
    const [projectColumnEnd, setProjectColumnEnd] = useState('Q');
    const [projectNameRegex, setProjectNameRegex] = useState(`\\[([^\\]]+)]`);
    const [projectRegexGroup, setProjectRegexGroup] = useState(1);

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

    const excelSheetColumnNumber = function(columnTitle) {
        // source: https://leetcode.com/problems/excel-sheet-column-number/solutions/1717232/simple-javascript-solution/?q=javascript&orderBy=most_relevant
        let output = 0;
        for (let i = 0; i < columnTitle.length; i++) {
            output += (columnTitle.charCodeAt(columnTitle.length - 1 - i) - 64) * 26**i;
        }
        return output - 1;
    };

    const sortApplicants = () => {
        // https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}
        const csvURL = `https://docs.google.com/spreadsheets/d/${encodeURI(sheetId)}/gviz/tq?tqx=out:csv&sheet=${encodeURI(sheetName)}`;
        readRemoteFile(csvURL, {
            complete: (results) => {
                try {
                    // convert column letters to index (ex: A->0, B->1, etc.)
                    const nameColumnNumber = excelSheetColumnNumber(nameColumn);
                    const projectColumnStartNumber = excelSheetColumnNumber(projectColumnStart);
                    const projectColumnEndNumber = excelSheetColumnNumber(projectColumnEnd);

                    // successfully fetched data of Google Sheet
                    const data = results?.data;
                    const formQuestions = data[0];

                    // extract project names and assign them to project groupings
                    const projectGroupings = {};
                    for (let column = projectColumnStartNumber; column < projectColumnEndNumber + 1; column++) {
                        let projectName = formQuestions[column];
                        const projectNameRegexChecker = new RegExp(projectNameRegex, "g");
                        const regexResult = projectNameRegexChecker.exec(projectName);
                        if (regexResult) {
                            if (regexResult[projectRegexGroup]) {
                                projectName = regexResult[projectRegexGroup];
                            } else if (regexResult[0]) {
                                projectName = regexResult[0];
                            } else {
                                console.error("Unable to extract project name from regex result:", regexResult);
                            }
                        }
                        projectGroupings[projectName] = [];
                    }
                    const projectNames = Object.keys(projectGroupings);

                    // associate people with projects they chose as their nth preference
                    for (let row = 1; row < data.length; row++) {
                        for (let column = projectColumnStartNumber; column < projectColumnEndNumber + 1; column++) {
                            try {
                                if (parseInt(data[row][column]) === 1) {
                                    const projectName = projectNames[column - projectColumnStartNumber];
                                    console.log(projectName, data[row]);
                                    projectGroupings[projectName].push(data[row][nameColumnNumber]);
                                }
                            } catch (e) {
                                // could not parse int of data - could be empty or something
                                // don't do anything cuz we don't care about this case
                            }
                        }
                    }

                    console.log(projectGroupings);
                } catch (e) {
                    console.error("Error parsing applicant data: ", e);
                    alert("Error parsing applicant data. Refer to console logs");
                }
            },
            error(error, _) {
                // unable to fetch data of Google Sheet
                console.error(`Unable to download CSV file`, csvURL, error);
                alert(`ERROR! Ensure Google Sheet can be viewed by anyone. Unable to download CSV file ${csvURL}`);
            }
        });
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
                                        <p style={{marginTop: "0px", wordBreak: "break-all"}}>
                                            {`"Sheet ID" can be found from the URL of the Google Sheet (https://docs.google.com/spreadsheets/d/{Sheet ID})`}
                                        </p>
                                        <p style={{marginTop: "0px"}}>
                                            {`"Sheet Name" is the name of the tab you are on (found at the bottom of Google Sheets)`}
                                        </p>
                                        <p style={{marginTop: "0px"}}>
                                            Name column refers to the column in the Google Sheet that references the preferred name of an applicant
                                        </p>
                                        <p style={{marginTop: "0px"}}>
                                            Project column start and end refer to the columns in the Google Sheet that reference the project preferences results
                                        </p>
                                        <p style={{marginTop: "0px"}}>
                                            {`(Optional) Project name regex will extract the project name from the column title of the Google Sheet`}
                                        </p>
                                        <p style={{marginTop: "0px"}}>
                                            {`(Optional) Project regex group will extract the project name from a specified index of the matched regex group, note this is 0-indexed`}
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
                                        <TextField id="outlined-basic" label="Name Column" variant="outlined" type="text"
                                                   name="link" fullWidth={true} value={nameColumn} onChange={(event) => {
                                                   setNameColumn(event.target.value)
                                        }}
                                        />
                                        <TextField id="outlined-basic" label="Project Column Start" variant="outlined" type="text"
                                                   name="link" fullWidth={true} value={projectColumnStart} onChange={(event) => {
                                                   setProjectColumnStart(event.target.value)
                                        }}
                                        />
                                        <TextField id="outlined-basic" label="Project Column End" variant="outlined" type="text"
                                                   name="link" fullWidth={true} value={projectColumnEnd} onChange={(event) => {
                                                   setProjectColumnEnd(event.target.value)
                                        }}
                                        />
                                        <TextField id="outlined-basic" label="Project Name Regex" variant="outlined" type="text"
                                                   name="link" fullWidth={true} value={projectNameRegex} onChange={(event) => {
                                                   setProjectNameRegex(event.target.value)
                                        }}
                                        />
                                        <TextField id="outlined-basic" label="Project Regex Group" variant="outlined" type="number"
                                                   name="link" fullWidth={true} value={projectRegexGroup} onChange={(event) => {
                                                   setProjectRegexGroup(parseInt(event.target.value))
                                        }}
                                        />
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
