import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Join from './components/Join';
import Projects from './components/Projects';
import Contact from './components/Contact';

const MainRouter = () => (
    <React.Fragment>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/contact" component={Contact} />
            <Route path="*">
                {"404"}
            </Route>
        </Switch>
    </React.Fragment>
);

export default MainRouter;
