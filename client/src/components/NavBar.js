import React, {Component} from "react";
import './../App.css';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class NavBar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static" class="nav-bar overlay">
                    <Toolbar>
                        <img src="gt-webdev-logo.png" alt="GT WebDev" height="35"/>
                        <Button color="inherit" href="/">Home</Button>
                        <Button color="inherit" href="/schedule">Schedule</Button>
                        <Button color="inherit" href="/join">Join</Button>
                        <Button color="inherit" href="/projects">Projects</Button>
                        <Button color="inherit" href="/contact">Contact</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;