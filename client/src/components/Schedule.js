import React, {Component} from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import './../App.css';

class Schedule extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>Schedule</div>
                <BottomBar />
            </div>
        );
    }
}

export default Schedule;