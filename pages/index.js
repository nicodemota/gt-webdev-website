import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {slogan, aboutUs, qAndAs, members} from '../data/homeData.js';

class Home extends Component {
  render() {
      return (
          <div>
              <NavBar />
              <IntroBox />
              <div className="main">
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
          <div className="intro-box">
              <Typography variant="h1" style={{ fontWeight: 400 }}>GT WebDev</Typography>
              <Typography variant="body1">
                  { slogan }
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
              <Typography variant="body1" className="indented">{aboutUs}</Typography>
          </div>
      );
  }
}

class FAQ extends Component {
  render() {
      return (
        <div>
            <Typography variant="h4">FAQ</Typography>
            {qAndAs.map(elem => (
                <QuestAndAnswer question={elem.question} answer={elem.answer}/>
            ))}
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
          <div className="indented">
              <Typography variant="body1" fontWeight={600}>
                <Box fontWeight={600}>
                    {this.state.question}
                </Box>
              </Typography>
              <Typography variant="body1">{this.state.answer}</Typography>
          </div>
      )
  }
}

class MeetMembers extends Component {
  render() {
      return (
          <div>
              <Typography variant="h4">Meet Our Members</Typography>
              <div className="indented">
                <Grid container spacing={3}>
                    {members.map(member => (
                        <MemberBox name={member.name} title={member.title} imageURL={member.imageURL} description={member.description} />
                    ))}
                </Grid>
              </div>
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
            <Grid item xs={4} className="centered">
              <img className="memberImg" src={this.state.imageURL} alt="well that didn't work"/>
              <Typography variant="body1"><b>{this.state.name}</b>, {this.state.title}</Typography>
              <Typography variant="body1">{this.state.description}</Typography>
            </Grid>
      );
  }
}

export default Home;