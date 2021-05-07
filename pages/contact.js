import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";

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