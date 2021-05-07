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

class Schedule extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="main">
                    <Typography variant="h5">Where We Meet</Typography>
                    <Typography variant="p">We meet in...</Typography>
                    <br />
                    <br />
                    <Typography variant="h5">Schedule</Typography>
                    <SchedTable />
                </div>
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
                "meetingDate": "2/2/2021",
                "agenda": "Project meetings, HTML/CSS tutorial",
                "recording": "?"
            },
            {
                "meetingDate": "2/9/2021",
                "agenda": "Project meetings",
                "recording": "?"
            },
            {
                "meetingDate": "2/16/2021",
                "agenda": "Project meeting, JavaScript tutorial",
                "recording": "https://bluejeans.com/s/MEG0MozyCbi/"
            },
            {
                "meetingDate": "2/23/2021",
                "agenda": "Project meeting, React.js tutorial",
                "recording": "https://bluejeans.com/s/1nPn4Nu6Kb3/"
            },
            {
                "meetingDate": "3/2/2021",
                "agenda": "Project meeting, Node and Express.js tutorial",
                "recording": "https://bluejeans.com/s/QVR3gAXDOXn/"
            },
            {
                "meetingDate": "3/9/2021",
                "agenda": "Project meeting, MongoDB tutorial",
                "recording": "?"
            },
            {
                "meetingDate": "3/23/2021",
                "agenda": "Project meeting, Material-UI tutorial",
                "recording": "?"
            },
            {
                "meetingDate": "3/30/2021",
                "agenda": "Project meeting, Git/GitHub tutorial",
                "recording": "?"
            },
            {
                "meetingDate": "4/6/2021",
                "agenda": "Project meeting, Python Flask tutorial",
                "recording": "?"
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