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
import Box from '@material-ui/core/Box';
import {meetData} from '../data/scheduleData.js';
const axios = require("axios");

class Schedule extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="main">
                    <Typography variant="h4" className="title">where we meet</Typography>
                    <Typography className="indented" variant="body1">{meetData}</Typography>
                    <br />
                    <br />
                    <Typography variant="h4" className="schedLabel">schedule</Typography>
                    <SchedTable />
                </div>
                <BottomBar />
            </div>
        );
    }
}

class SchedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {scheduleData: null};
        this.callAPI().then((res) => {
            this.setState({scheduleData: res.data.data});
            console.log(JSON.stringify(this.state.scheduleData));
        });
    }

    callAPI = () => {
        let url = process.env.NEXT_PUBLIC_BASE_URL + 'api/getSchedule';
        return axios.get(url);
    }

    render() {
        let dataBlock = (this.state.scheduleData) ?
            <TableBody>
            {this.state.scheduleData.map(row => (
                <TableRow key={row.name} className="schedTableRow">
                    <TableCell align="center" className="schedTableCell">{row.date.split('T')[0]}</TableCell>
                    <TableCell align="center" className="schedTableCell">{row.agenda}</TableCell>
                    <TableCell align="center" className="schedTableCell">{row.link}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            : <TableRow className="schedTableRow"></TableRow>;
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
                                <Box fontWeight={600} fontSize={16}>BlueJeans Link</Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {dataBlock}
                </Table>
            </TableContainer>
        );
    }
}

export default Schedule;