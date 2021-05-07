import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";

class Projects extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="main">
                    Projects
                </div>
                <BottomBar />
            </div>
        );
    }
}

export default Projects;