import React, {Component} from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import './../App.css';

class Join extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>Join</div>
                <BottomBar />
            </div>
        );
    }
}

export default Join;