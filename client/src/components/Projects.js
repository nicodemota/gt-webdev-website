import React, {Component} from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import './../App.css';

class Projects extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>Projects</div>
                <BottomBar />
            </div>
        );
    }
}

export default Projects;