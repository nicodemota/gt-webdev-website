import React, {Component} from "react";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import {Link} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import './../App.css';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <IntroBox />
                <AboutUs />
                <FAQ />
                <MeetMembers />
                <BottomBar />
            </div>
        );
    }
}

class IntroBox extends Component {
    render() {
        return (
            <div class="intro-box">
                <Typography variant="h1">GT WebDev</Typography>
                <Typography variant="p">Some description for the organization</Typography>
            </div>
        );
    }
}

class AboutUs extends Component {
    render() {
        return (
        <div>
            <Typography variant="h3">About Us</Typography>
            <Typography variant="p">At GT WebDev, we...</Typography>
        </div>
        );
    }
}

class FAQ extends Component {
    render() {
        return (
            <div>
                <Typography variant="h3">FAQ</Typography>
                <QuestAndAnswer question="Question 1?" answer="Answer 1" />
                <QuestAndAnswer question="Question 2?" answer="Answer 2" />
            </div>
        );
    }
}

class QuestAndAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            answer: this.props.answer
        }
    }

    render() {
        return (
            <div>
                <Typography variant="p">{this.state.question}</Typography>
                <Typography variant="p">{this.state.answer}</Typography>
            </div>
        )
    }
}

class MeetMembers extends Component {
    render() {
        return (
            <div>
                <Typography variant="h3">Meet Our Members</Typography>
                <MemberBox name="Person One"
                    title="Member"
                    imageURL="google.com"
                    description="Person One is a ...."
                />
            </div>
        );
    }
}

class MemberBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            title: this.props.title,
            imageURL: this.props.imageURL,
            description: this.props.description
        }
    }
    render() {
        return (
            <div>
                *some image*
                <Typography variant="p"><b>{this.state.name}</b>, {this.state.title}</Typography>
                <Typography variant="p">{this.state.description}</Typography>
            </div>
        );
    }
}

export default Home;