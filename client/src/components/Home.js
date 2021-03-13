import React, {Component} from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import {Link} from "react-router-dom";
import './../App.css';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>Home</div>
                <BottomBar />
            </div>
        );
    }
}

export default Home;