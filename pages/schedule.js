import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import {meetData, scheduleData} from '../data/scheduleData.js';
import {Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const Schedule = () => {

    const oneColText = (txt) => {
        const res = txt.split(" ");
        console.log(`${res[0]}\n${res[1]}\n${res[2]}`)
        return `${res[0]}\n${res[1]}\n${res[2]}`
    }
    
    return(
        <div>
            <Head>
                <title>Schedule | GT WebDev</title>
            </Head>
            <NavBar />
            
            <Grid container className="ScheduleContainer" style={{margin: "15px"}}>
                {scheduleData.map((cur, ind) => {
                    return(
                        <Grid container item columnGap={1} className="ScheduleGrid">
                            <Grid sm={4} md={2} lg={2} className="ScheduleDateBox">
                                {oneColText(cur['date'])}
                            </Grid>
                            <Grid sm={4} md={5} lg={5} style={{color: "#000000"}}>
                                {cur['agenda']}
                            </Grid>
                            <Grid sm={4} md={2} lg={2} >
                                {cur['link'] != 'N/A' ? "Camera" : <span />}
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
            <BottomBar />
        </div>
    )
}

// class Schedule extends Component {
//     render() {
//         return (
//             <div>
//                 <Head>
//                     <title>Schedule | GT WebDev</title>
//                 </Head>
//                 <NavBar />
//                 <div className="main">
//                     <Typography variant="h4" className="schedLabel">schedule</Typography>
//                     <SchedTable />
//                 </div>
//                 <BottomBar />
//             </div>
//         );
//     }
// }

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
