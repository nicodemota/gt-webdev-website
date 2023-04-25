import React, {Component, useEffect, useState} from "react";
import AdminNavBar from "../components/AdminNavBar";
import Head from 'next/head'
import {Box, Button, TextareaAutosize, TextField} from "@mui/material";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from "../helpers/firebase";
import {useRouter} from 'next/router'
import {readRemoteFile, jsonToCSV} from "react-papaparse";
import { CSVLink } from "react-csv";
import { scheduleData } from "../data/scheduleData";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";





const AdminDashboard = () => {
    

    
    const [adminConfirmed, setAdminConfirmed] = useState(false);

    // auto-sorting tool
    const [sheetId, setSheetId] = useState('1l4CCiWWuz0y40qaZ9rxIw2tqL-wb-N0VJKrEbtoQWIw');
    const [sheetName, setSheetName] = useState('Form Responses 2');
    const [nameColumn, setNameColumn] = useState('B');
    const [projectPreferenceNumber, setProjectPreferenceNumber] = useState(1);
    const [projectColumns, setProjectColumns] = useState('["I", "J", "K", "L", "M", "N", "O", "P", "Q", "BE", "BG", "BH", "BI"]');
    const [projectNameRegex, setProjectNameRegex] = useState(`\\[([^\\]]+)]`);
    const [projectRegexGroup, setProjectRegexGroup] = useState(1);
    const [csvData, setCSVData] = useState(undefined);

    const [eventName, setEventName] = useState(' ');
    const [eventDate, setEventDate] = useState(' ');
    const [eventLocation, setEventLocation] = useState(' ');
    const [eventDescription, setEventDescription] = useState(' ');

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

    const addToSchedule = async () => {
        try {
           
            const firebaseConfig = {
                apiKey: "AIzaSyCS2s7GzBGZ4-yKJ_q4d-vdqDNZQpD8M70",
                authDomain: "gt-webdev-website.firebaseapp.com",
                projectId: "gt-webdev-website",
                storageBucket: "gt-webdev-website.appspot.com",
                messagingSenderId: "562784179730",
                appId: "1:562784179730:web:37e4b2c5ea06f7f5e26acb",
                measurementId: "G-1QX4LKFHCS"
            }
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const scheduleRef = collection(db, "schedule");
            await setDoc(doc(scheduleRef, eventDate + eventLocation
                ), {
                datelocation: eventDate + " - " + eventLocation,
                title: eventName,
                description: eventDescription                
            })
        } catch (e) {
            console.log(e)
        }
        
    }

    const sortApplicants = () => {
        // https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}
        const csvURL = `https://docs.google.com/spreadsheets/d/${encodeURI(sheetId)}/gviz/tq?tqx=out:csv&sheet=${encodeURI(sheetName)}`;
        readRemoteFile(csvURL, {
            complete: (results) => {
                try {
                    // convert column letters to index (ex: A->0, B->1, etc.)
                    const nameColumnNumber = excelSheetColumnNumber(nameColumn);

                    // successfully fetched data of Google Sheet
                    const data = results?.data;
                    const formQuestions = data[0];

                    // extract project names and assign them to project groupings
                    const projectGroupings = {};
                    for (const columnLetter of JSON.parse(projectColumns)) {
                        const column = excelSheetColumnNumber(columnLetter);
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
                    let mostAmountOfPeopleInGrouping = 0;
                    for (let row = 1; row < data.length; row++) {
                        for (let k = 0; k < JSON.parse(projectColumns).length; k++) {
                            const columnLetter = JSON.parse(projectColumns)[k];
                            const column = excelSheetColumnNumber(columnLetter);
                            try {
                                if (parseInt(data[row][column]) === projectPreferenceNumber) {
                                    const projectName = projectNames[k];
                                    projectGroupings[projectName].push(data[row][nameColumnNumber]);
                                    mostAmountOfPeopleInGrouping = Math.max(mostAmountOfPeopleInGrouping, projectGroupings[projectName].length);
                                }
                            } catch (e) {
                                // could not parse int of data - could be empty or something
                                // don't do anything cuz we don't care about this case
                            }
                        }
                    }

                    // pad arrays in preparation to export as csv
                    for (let i = 0; i < projectNames.length; i++) {
                        const projectName = projectNames[i];
                        while (projectGroupings[projectName].length < mostAmountOfPeopleInGrouping) {
                            projectGroupings[projectName].push("");
                        }
                    }

                    // convert format of data in preparation to export as csv
                    const beforeCsvJsonData = [];
                    for (let j = 0; j < mostAmountOfPeopleInGrouping; j++) {
                        const obj = {};
                        for (let i = 0; i < projectNames.length; i++) {
                            const projectName = projectNames[i];
                            obj[projectName] = projectGroupings[projectName][j]
                        }
                        beforeCsvJsonData.push(obj);
                    }
                    const finalResult = jsonToCSV(beforeCsvJsonData);
                    if (finalResult) {
                        setCSVData(jsonToCSV(beforeCsvJsonData));
                    } else {
                        alert("Unable to convert final calculated result to CSV");
                    }
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
                                        <h2> Schedule </h2>
                                        <p style={{marginTop: "0px"}}>
                                            Tool to add events to the schedule page.
                                        </p>
                                        <TextField id="outlined-basic" label="Event Title" variant="outlined" type="text"
                                                    name="eventName" fullWidth={true} value={eventName} onChange={(event) => {
                                            setEventName(event.target.value)
                                        }}
                                        />
                                         <TextField id="outlined-basic" label="Date (eg. January 1, 2023)" variant="outlined" type="text"
                                                    name="eventDate" fullWidth={true} value={eventDate} onChange={(event) => {
                                            setEventDate(event.target.value)
                                        }}
                                        />
                                        <TextField id="outlined-basic" label="Location" variant="outlined" type="text"
                                                    name="eventLocation" fullWidth={true} value={eventLocation} onChange={(event) => {
                                            setEventLocation(event.target.value)
                                        }}
                                        />
                                        <TextField id="outlined-basic" label="Description" variant="outlined" type="text"
                                                    name="eventDescription" fullWidth={true} value={eventDescription} onChange={(event) => {
                                            setEventDescription(event.target.value)
                                        }}
                                        />
                                         <Button fullWidth={true} onClick={() => {
                                                    addToSchedule();
                                                }} variant="contained">✨Create Event ✨</Button>




                                        <h2>Applicant Auto-Sorter</h2>
                                        <p style={{marginTop: "0px"}}>
                                            Tool to help sort project applicants into teams.
                                            Ensure the Google Sheet is viewable by anyone with the link.
                                        </p>
                                        {
                                            (csvData !== undefined) ?
                                            <CSVLink
                                                data={csvData}
                                                onClick={() => {
                                                    setCSVData(undefined);
                                                }}
                                                style={{
                                                    backgroundColor: "#222220",
                                                    color: "white",
                                                    width: "200px",
                                                    height: "50px",
                                                    display: "flex",
                                                    alignContent: "center",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderRadius: "10px"
                                                }}
                                            >
                                                <span>Download CSV</span>
                                            </CSVLink> :
                                            <>
                                                <p style={{marginTop: "0px", wordBreak: "break-all", width: "100%"}}>
                                                    {`"Sheet ID" can be found from the URL of the Google Sheet (https://docs.google.com/spreadsheets/d/{Sheet ID})`}
                                                </p>
                                                <TextField id="outlined-basic" label="Sheet ID" variant="outlined" type="text"
                                                           name="sheet-id" fullWidth={true} value={sheetId} onChange={(event) => {
                                                    setSheetId(event.target.value)
                                                }}
                                                />
                                                <p style={{marginTop: "0px", width: "100%"}}>
                                                    {`"Sheet Name" is the name of the tab you are on (found at the bottom of Google Sheets)`}
                                                </p>
                                                <TextField id="outlined-basic" label="Sheet Name" variant="outlined" type="text"
                                                           name="sheet-name" fullWidth={true} value={sheetName} onChange={(event) => {
                                                    setSheetName(event.target.value)
                                                }}
                                                />
                                                <p style={{marginTop: "0px", width: "100%"}}>
                                                    Name column refers to the column in the Google Sheet that references the preferred name of an applicant
                                                </p>
                                                <TextField id="outlined-basic" label="Name Column" variant="outlined" type="text"
                                                           name="name" fullWidth={true} value={nameColumn} onChange={(event) => {
                                                    setNameColumn(event.target.value)
                                                }}
                                                />
                                                <p style={{marginTop: "0px", width: "100%"}}>
                                                    {`Project preference, 1 means group people by their top choice`}
                                                </p>
                                                <TextField id="outlined-basic" label="Project Preference" variant="outlined" type="number"
                                                           name="project-preference" fullWidth={true} value={projectPreferenceNumber} onChange={(event) => {
                                                    setProjectPreferenceNumber(parseInt(event.target.value))
                                                }}
                                                />
                                                <p style={{marginTop: "0px", width: "100%"}}>
                                                    Columns of the Google Sheet that refer to project preferences
                                                </p>
                                                <TextField id="outlined-basic" label="Project Columns" variant="outlined" type="text"
                                                           name="project-columns" fullWidth={true} value={projectColumns} onChange={(event) => {
                                                           setProjectColumns(event.target.value)
                                                }}
                                                />
                                                <p style={{marginTop: "0px", width: "100%"}}>
                                                    {`(Optional) Project name regex will extract the project name from the column title of the Google Sheet`}
                                                </p>
                                                <TextField id="outlined-basic" label="Project Name Regex" variant="outlined" type="text"
                                                           name="project-name-regex" fullWidth={true} value={projectNameRegex} onChange={(event) => {
                                                    setProjectNameRegex(event.target.value)
                                                }}
                                                />
                                                <p style={{marginTop: "0px", width: "100%"}}>
                                                    {`(Optional) Project regex group will extract the project name from a specified index of the matched regex group, note this is 0-indexed`}
                                                </p>
                                                <TextField id="outlined-basic" label="Project Regex Group" variant="outlined" type="number"
                                                           name="project-regex-group" fullWidth={true} value={projectRegexGroup} onChange={(event) => {
                                                    setProjectRegexGroup(parseInt(event.target.value))
                                                }}
                                                />
                                                <Button fullWidth={true} onClick={() => {
                                                    sortApplicants();
                                                }} variant="contained">✨Sort ✨</Button>
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

export default AdminDashboard;
