import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import {slogan, aboutUs, qAndAs, members} from '../data/homeData.js';
import {Box, Grid, Typography} from "@mui/material";

class Home extends Component {
  render() {
      return (
          <div>
                <Head>
                    <title>GT WebDev | Georgia Tech</title>
                    <meta name="description" content="At GT WebDev, we learn about different web development languages, technologies, and frameworks, as well as how they work in combination with each other. Learning is done with a hybrid of both a traditional, demo-style approach and an interactive, hands-on approach. For the former, we have weekly tutorials on web development technologies like Node.js, MongoDB, and React.js. For the latter, we have project teams in which members can practice their newly-learned skills into nice, (ideally) working web applications." />

                    <meta property="og:title" content="GT WebDev | Georgia Tech" />
                    <meta property="og:description" content="At GT WebDev, we learn about different web development languages, technologies, and frameworks, as well as how they work in combination with each other. Learning is done with a hybrid of both a traditional, demo-style approach and an interactive, hands-on approach. For the former, we have weekly tutorials on web development technologies like Node.js, MongoDB, and React.js. For the latter, we have project teams in which members can practice their newly-learned skills into nice, (ideally) working web applications." />
                    <meta property="og:site_name" content="GT Web Dev" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
                    <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/gt-webdev-logo.png`} />
                    <meta property="og:image:alt" content="GT WebDev logo" />
                    <meta property="og:locale" content="en_US" />

                    <meta property="twitter:card" content="summary_large_image" />
                </Head>
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
              <Typography variant="h1" className="mainTitle">gt webdev</Typography>
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
                <Typography variant="h4" className="title">about us</Typography>
                <div className="centered">
                    <img src="homeImageOne.jpg" className="homeImg" />
                    <img src="homeImageTwo.jpg" className="homeImg" />
                </div>
                <Typography variant="body1" className="indented">{aboutUs}</Typography>
          </div>
      );
  }
}

class FAQ extends Component {
  render() {
      return (
        <div>
            <Typography variant="h4" className="title">faq</Typography>
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
              {/*<Typography variant="body1" fontWeight={600}>*/}
              {/*  <Box fontWeight={600}>*/}
              {/*      {this.state.question}*/}
              {/*  </Box>*/}
              {/*  {this.state.answer}*/}
              {/*</Typography>*/}
          </div>
      )
  }
}

class MeetMembers extends Component {
  render() {
      return (
          <div>
              <Typography variant="h4" className="title">meet our members</Typography>
              <div className="indented">
                <Grid container spacing={3}>
                    Under Construction
                    {/* {members.map(member => (
                        <MemberBox name={member.name} title={member.title} imageURL={member.imageURL} description={member.description} />
                    ))} */}
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
