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
                <h1>GT WebDev</h1>
                <p>Some description for the organization</p> 
            </div>
        );
    }
}

class AboutUs extends Component {
    render() {
        return (
        <div>
            <h2>About Us</h2>
            <p>At GT WebDev, we...</p>
        </div>
        );
    }
}

class FAQ extends Component {
    render() {
        return (
            <div>
                <h2>FAQ</h2>
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
                <p>{this.state.question}</p>
                <p>{this.state.answer}</p>
            </div>
        )
    }
}

class MeetMembers extends Component {
    render() {
        return (
            <div>
                <h2>Meet Our Members</h2>
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
                <p><b>{this.state.name}</b>, {this.state.title}</p>
                <p>{this.state.description}</p>
            </div>
        );
    }
}

export default Home;