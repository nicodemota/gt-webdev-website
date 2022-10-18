import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import {meetData, scheduleData} from '../data/scheduleData.js';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

class Schedule extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Schedule | GT WebDev</title>
                </Head>
                <NavBar />
                <div className="main">
                    <Typography variant="h4" className="schedLabel">schedule</Typography>
                    <SchedTable />
                </div>
                <BottomBar />
            </div>
        );
    }
}

class SchedTable extends Component {
    render() {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow className="schedTableHeader">
                            <TableCell align="center" className="schedHeaderCell">
                                <Box fontWeight={600} fontSize={16}>Meeting Date</Box>
                            </TableCell>
                            <TableCell align="center" className="schedHeaderCell">
                                <Box fontWeight={600} fontSize={16}>Agenda</Box>
                            </TableCell>
                            <TableCell align="center" className="schedHeaderCell">
                                <Box fontWeight={600} fontSize={16}>Recording</Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {scheduleData.map(row => (
                        <TableRow key={row.name} className="schedTableRow">
                            <TableCell align="center" className="schedTableCell">{row.date}</TableCell>
                            <TableCell align="center" className="schedTableCell">{row.agenda}</TableCell>
                            <TableCell align="center" className="schedTableCell">
                                {(row.link === "TBD" || row.link === "N/A") ? row.link
                                :
                                    <>
                                        <a href={row.link} style={{ display: "block" }} target="_blank">Here</a>
                                        {row.link2 ? <a href={row.link2} style={{ display: "block" }} target="_blank">Here</a> : ""}
                                    </>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Schedule;
