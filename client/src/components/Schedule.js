import React, {Component} from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import './../App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Schedule extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Typography variant="h5">Where We Meet</Typography>
                <Typography variant="p">We meet in...</Typography>
                <Typography variant="h5">Schedule</Typography>
                <SchedTable />
                <BottomBar />
            </div>
        );
    }
}

class SchedTable extends Component {
    render() {
        const rows = [
            {
                "meetingDate": "1/26/2021",
                "agenda": "Project Introductions",
                "recording": "google.com"
            },
            {
                "meetingDate": "2/16/2021",
                "agenda": "Project Meeting, JavaScript Tutorial",
                "recording": "google.com"
            },
            {
                "meetingDate": "2/23/2021",
                "agenda": "Project Meeting, React.js Tutorial",
                "recording": "google.com"
            },
            {
                "meetingDate": "3/02/2021",
                "agenda": "Project Meeting, React.js Tutorial",
                "recording": "google.com"
            }
        ];
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Meeting Date</TableCell>
                            <TableCell align="center">Agenda</TableCell>
                            <TableCell align="center">BlueJeans Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="center">{row.meetingDate}</TableCell>
                            <TableCell align="center">{row.agenda}</TableCell>
                            <TableCell align="center">{row.recording}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default Schedule;