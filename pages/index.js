import React, {Component, useState} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head'
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import styled from "@material-ui/core";


import { slogan, contactEmail, faq } from "../data/homeData.js";

// ThemeProvider makes the layout look goofy, originaly (6-6)(6-6)(12) layout,
// after themeprovider(12)(12)(12)(12)(12) layout
/*
const theme = createMuiTheme()
theme.typography.h2 = {
    fontSize: '3.75rem',
    '@media (max-width:480px)': {
      fontSize: '2.25rem',
    },
    '@media (max-width:1024px)': {
        fontSize: '3.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };
*/


class Home extends Component {
  render() {
      return (
          <div>
                <Head>
                    <title>GT WebDev | Georgia Tech</title>
                    <meta name="description" content="At GT WebDev, we learn about different web development languages, technologies, 
                        and frameworks, as well as how they work in combination with each other. Learning is done with a hybrid of both a
                        traditional, demo-style approach and an interactive, hands-on approach. For the former, we have weekly tutorials
                        on web development technologies like Node.js, MongoDB, and React.js. For the latter, we have project teams in which
                        members can practice their newly-learned skills into nice, (ideally) working web applications."
                    />
                    <meta property="og:title" content="GT WebDev | Georgia Tech" />
                    <meta property="og:description" content="At GT WebDev, we learn about different web development languages,
                        technologies, and frameworks, as well as how they work in combination with each other. Learning is done with
                        a hybrid of both a traditional, demo-style approach and an interactive, hands-on approach. For the former, we
                        have weekly tutorials on web development technologies like Node.js, MongoDB, and React.js. For the latter, we
                        have project teams in which members can practice their newly-learned skills into nice, (ideally) working
                        web applications." 
                    />  
                    <meta property="og:site_name" content="GT Web Dev" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
                    <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/gt-webdev-logo.png`} />
                    <meta property="og:image:alt" content="GT WebDev logo" />
                    <meta property="og:locale" content="en_US" />

                    <meta property="twitter:card" content="summary_large_image" />
                </Head>
                <NavBar />
                <Introduction />
                <BottomBar />
          </div>
      );
  }
}

const Introduction = () => {

    const [faqPanel, setFaqPanel] = useState("faqPanel9")

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={12} sm={6} md={6} className="homeSloganGrid homeGridMargin">
                <Typography variant="h2" className="homeSloganTxt">
                    { slogan[0] }
                </Typography>
            </Grid>
            <Grid xs={12} sm={6} md={6} className="homeImgGrid homeGridMargin">
                <img src="homeImageOne.jpg" className="homeImg"/>
            </Grid>

            <Grid xs={12} sm={6} md={6} className="homeImgGrid">
                <img src="homeImageTwo.jpg" className="homeImg"/>
            </Grid>
            <Grid xs={12} sm={6} md={6} className="homeSloganGrid">
                <Typography variant="h2" className="homeSloganTxt">
                    { slogan[1] }
                    <span className="homeSlogan2Underline" />
                </Typography>
            </Grid>

            <Grid xs={12} md={12} className="homeSloganGrid homeGridMargin">
                <Typography variant="h2" className="homeSloganTxt">
                    { slogan[2] }
                </Typography>
            </Grid>
            
            {/* Map out the faq in an accordion style*/}
            <Grid xs={12} md={12} className="faqStartMargin">
                <Typography variant="h3" className="faqTitle">
                    FAQ
                </Typography>
            </Grid>
            <Grid xs={12} md={12} >
                <Typography variant="h4" className="faqTitle">
                    Any other questions related to WebDev can be emailed to: {contactEmail}
                </Typography>
            </Grid>
            {faq.map((cur, ind) => {
                return(
                    <Grid xs={12} md={12} lg={12} className="">
                        <Accordion expanded={faqPanel === `faqPanel${ind}`} onChange={e => {
                            setFaqPanel(faqPanel == `faqPanel${ind}` ? `faqPanel_` : `faqPanel${ind}`)
                        }} style={{paddingLeft: "15vw"}}>
                            <AccordionSummary aria-controls="panel1d-content" id={`faqPanel${ind}`} >
                                <Typography variant="h4">
                                    {cur[`q`]}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h5">
                                    {cur[`a`]}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                )
            })}

            {/* {faq.map((cur, ind) => {
                return(
                    <Grid container>
                        <Grid xs={12} md={6} className="faqTextGrid faqTextMargin">
                            <Typography variant="h2" className="faqText">
                                {ind%2 == 0 ? cur['q'] : cur['a']}
                            </Typography>
                        </Grid>
                        <Grid xs={12} md={6} className="faqTextGrid faqTextMargin">
                            <Typography variant="h2" className="faqText">
                                { ind%2 == 1 ? cur['q'] : cur['a']}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            })} */}
        </Grid>
    )
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
              <Typography variant="body1" fontWeight={600}>
                <Box fontWeight={600}>
                    {this.state.question}
                </Box>
                {this.state.answer}
              </Typography>
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