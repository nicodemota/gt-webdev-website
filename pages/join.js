import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

class Join extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="main">
                    <Typography variant="h5">Join</Typography>
                    <Typography variant="body1">Fill out the form below to join GT WebDev!</Typography>
                    <br />
                    <form noValidate autoComplete="off">
                        <TextField id="filled-basic" label="First Name" variant="filled" />
                        <br />
                        <br />
                        <TextField id="filled-basic" label="Last Name" variant="filled" />
                        <br />
                        <br />
                        <TextField id="filled-basic" label="Email" variant="filled" />
                        <br />
                        <br />
                        <br />
                        <Typography variant="p" className="padRight">How did you hear about us?</Typography>
                        <Select className="hearDropDown">
                            <MenuItem value="coc">College of Computing</MenuItem>
                            <MenuItem value="google">Google</MenuItem>
                            <MenuItem value="referral">A referral</MenuItem>
                        </Select>
                        <br />
                        <br />
                        <Button variant="contained" color="primary" type="submit">Join GT WebDev</Button>
                    </form>
                </div>
                <BottomBar />
            </div>
        );
    }
}

export default Join;