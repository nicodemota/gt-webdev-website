import React, {Component} from "react";
import {Link} from "react-router-dom";
import logo from './../logo.svg';
import './../App.css';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        GT Web Dev Home
                    </p>
                    <p>
                        This is home - navigate to other routes to see a different page
                    </p>
                    <p>
                        For example see <Link to="/schedule">Schedule Page</Link>
                    </p>
                </header>
            </div>
        );
    }
}

export default Home;