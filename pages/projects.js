import React, {Component} from "react";
import NavBar from "../components/NavBar";
import {currentData,previousData} from '../data/projectData.js';
import BottomBar from "../components/BottomBar";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head'

class Projects extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Projects | GT WebDev</title>
                </Head>
                <NavBar />
                <div className="main">
                    <CurrentProjects />
                    <br />
                    <PreviousProjects />
                </div>
                <BottomBar />
            </div>
        );
    }
}

class CurrentProjects extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4" className="title">current projects</Typography>
                <Typography variant="body1" className="indented">
                    {currentData}
                </Typography>
            </div>
        );
    }
}

class PreviousProjects extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4" className="title">previous projects</Typography>
                    {previousData.map(semester => (
                        <div className="indented">
                            <Typography variant="h6">{semester.semester}</Typography>
                            <Grid container spacing={3}>
                                {semester.projects.map(project => (
                                    <Project name={project.name} description={project.description} members={project.members} />
                                ))}
                            </Grid>
                        </div>
                    ))}
            </div>
        );
    }
}

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": this.props.name,
            "description": this.props.description,
            "members": this.props.members
        }
    }
    render() {
        let memberList = this.state.members.join(", ");
        return (
            <Grid item xs={6} className="centered">
                <div className="tab">
                    <Typography variant="body1"><b>{this.state.name}</b></Typography>
                    <Typography variant="body1">{this.state.description}</Typography>
                    <Typography variant="body1">Members: {memberList}</Typography>
                </div>
            </Grid>
        );
    }
}

export default Projects;