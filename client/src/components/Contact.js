import React, {Component} from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import './../App.css';

class Contact extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div class="main">
                    Contact
                </div>
                <BottomBar />
            </div>
        );
    }
}

export default Contact;