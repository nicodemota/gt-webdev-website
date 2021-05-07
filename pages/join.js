import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';

class Join extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="main">
                    <Typography variant="h5">Join</Typography>
                    <form noValidate autoComplete="off">
                        <Typography variant="p">First Name: </Typography>
                        <TextField id="filled-basic" label="First Name" variant="filled" />
                        <br />
                        <Typography variant="p">Last Name: </Typography>
                        <TextField id="filled-basic" label="Last Name" variant="filled" />
                        <br />
                        <Typography variant="p">Email: </Typography>
                        <TextField id="filled-basic" label="Email" variant="filled" />
                        <br />
                        <Typography variant="p">Subscribe to the mailing list to hear about updates and upcoming meetings?</Typography>
                        <Checkbox value="mailChecked" />
                        <br />
                        <Typography variant="p">How did you hear about us?</Typography>
                        <Select>
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