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
                <div class="main">
                    <AboutUs />
                    <br />
                    <FAQ />
                    <br />
                    <MeetMembers />
                </div>
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
                <Typography variant="p">
                    Fostering the learning of web development framework by framework
                </Typography>
            </div>
        );
    }
}

class AboutUs extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4">About Us</Typography>
                <Typography variant="p">
                    At GT WebDev, we learn about different web development languages, technologies, and frameworks,
                    as well as how they work in combination with each other. Learning is done with a hybrid of both
                    a traditional, demo-style approach and an interactive, hands-on approach. For the former, we have
                    weekly tutorials on web development technologies like Node.js, MongoDB, and React.js. For the latter,
                    we have project teams in which members can practice their newly-learned skills into nice, working (ideally)
                    web applications.
                </Typography>
            </div>
        );
    }
}

class FAQ extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4">FAQ</Typography>
                <QuestAndAnswer question="What if I want to join GT WebDev, but am unavailable during the scheduled meeting time?" answer="No worries! All of our meetings and tutorials are recorded and can be found on the Schedule tab of this website, as well as in the Slack." />
                <QuestAndAnswer question="How do I join?" answer="Check out the Join page of this website for more information!" />
                <QuestAndAnswer question="Will GT WebDev be in-person or virtual for the fall?" answer="We still need to figure this out, but as an idea: maybe we are in-person mainly (assuming things progress as predicted), but record everything so people can join virtually?" />
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
                <Typography variant="h4">Meet Our Members</Typography>
                <MemberBox name="Bek Hovakimian"
                    title="President"
                    imageURL="google.com"
                    description="Bek is..."
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
        };
    }
    render() {
        return (
            <div>
                *some image*
                <br />
                <Typography variant="p"><b>{this.state.name}</b>, {this.state.title}</Typography>
                <br />
                <Typography variant="p">{this.state.description}</Typography>
                <br />
            </div>
        );
    }
}

export default Home;