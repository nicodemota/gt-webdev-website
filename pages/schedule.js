import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {meetData, scheduleData} from '../data/scheduleData.js';

class Schedule extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="main">
                    <Typography variant="h4">Where We Meet</Typography>
                    <Typography className="indented" variant="body1">{meetData}</Typography>
                    <br />
                    <br />
                    <Typography variant="h4">Schedule</Typography>
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
                            <TableCell align="center" className="schedTableCell">Meeting Date</TableCell>
                            <TableCell align="center" className="schedTableCell">Agenda</TableCell>
                            <TableCell align="center" className="schedTableCell">BlueJeans Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {scheduleData.map(row => (
                        <TableRow key={row.name} className="schedTableRow">
                            <TableCell align="center" className="schedTableCell">{row.date}</TableCell>
                            <TableCell align="center" className="schedTableCell">{row.agenda}</TableCell>
                            <TableCell align="center" className="schedTableCell">{row.link}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Schedule;