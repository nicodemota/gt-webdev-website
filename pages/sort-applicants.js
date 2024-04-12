import React, { Component, useState } from 'react';
import Board from 'react-ui-kanban';
import AdminNavBar from "../components/AdminNavBar";
import Head from 'next/head'
import { Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import firebaseApp from "../helpers/firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function sortMembersPage() {

    // const app = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const [applicants, setApplicants] = useState([]);
    const [projects, setProjects] = useState([]);

    React.useEffect(async () => {
        const q = query(collection(db, "members"), where("semester", "==", "Fall 2023"));
        const querySnapshotApplicants = await getDocs(q);

        querySnapshotApplicants.forEach((doc) => {
            setApplicants((applicants) => {
                return [...applicants, {id: doc.id, title: doc.data().name}]
            });
        });

        const querySnapshotProjects = await getDocs(collection(db, "projects"));
        querySnapshotProjects.forEach((doc) => {
            setProjects((projects) => {
                return [
                    ...projects,
                    {id: doc.id, title: doc.data().name, style: {display: 'flex'}, cards: [{id: doc.data().members[0].id, title: doc.data().members[0].name}]}
                    // only works if there's already a card there
                ]
            });
        })
    }, []);

    const data = {
        lanes: projects.concat(
            {
                id: 'lane4',
                title: 'Not Accepted',
                style: { backgroundColor: '#F08080', display: "flex" },
                cards: applicants,
            }
        )
    }

    return (
        <div>
            <Head>
                <title>Sort Members Page</title>
            </Head>
            <AdminNavBar />
            <h1 style={{margin: '10px'}}>Sort Members</h1>
            <div style={{display: 'relative', width: '90%', margin: 'auto'}}>
                <FormControl>
                    <InputLabel id="select-label">Semester</InputLabel>
                    <Select labelId="select-label" label="Semester" style={{marginBottom: '10px', width: "200px"}}>
                        <MenuItem children="Fall 2023">Fall 2023</MenuItem>
                        <MenuItem children="Spring 2023">Spring 2023</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <Board data={data} draggable="true" style={{overflowY: "scroll", backgroundColor: 'gray'}}></Board>
                </div>
                <div style={{margin: "10px auto", width: "35%", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center"}}>
                    <Button variant="contained">Generate Rejection Email List</Button>
                    <Button variant="contained">Generate Per-Team Acceptance Email List</Button>
                    <Button variant="contained">Back</Button>
                </div>
            </div>
        </div>
    )
}

export default sortMembersPage;