import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

const MainRouter = () => (
    <React.Fragment>
        <Switch>
            {/* Once we have components made we'll route them like component={Home} */}
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/">
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>
                </div>
            </Route>
            <Route exact path="/schedule">
                {"Schedule"}
            </Route>
            <Route exact path="/join">
                {"Join"}
            </Route>
            <Route exact path="/projects">
                {"Projects"}
            </Route>
            <Route exact path="/contact">
                {"Contact"}
            </Route>
            <Route path="*">
                {"404"}
            </Route>
        </Switch>
    </React.Fragment>
);

export default MainRouter;
