import React, {Component, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material";

import Head from 'next/head'
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import { slogan, contactEmail, faq } from "../data/homeData.js";

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
                <Introduction />
                <BottomBar />
          </div>
      )
  }
}

// Home page with webDev slogan as well as faqs. 2 columns style in any screen bigger or equal to sm, else 1 column
const Introduction = () => {    // TODO - Make either custome theme or mediaFrame CSS markup to make text size smaller in smaller screen

    // State to keep track of which faq panel to open, only one panel will be open at a time
    const [faqPanel, setFaqPanel] = useState("faqPanel_")

    return (
        <Grid container rowSpacing={1} >
            {/* UpperHalf Text+Img */}
            <Grid item xs={12} sm={6} md={6} className="homeSloganGrid homeGridMargin">
                <Typography variant="h3" className="homeSloganTxt">
                    { slogan[0] }
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="homeImgGrid homeGridMargin">
                <img src="homeImageOne.jpg" className="homeImg"/>
            </Grid>

            <Grid item xs={12} sm={6} md={6} className="homeImgGrid">
                <img src="homeImageTwo.jpg" className="homeImg"/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="homeSloganGrid">
                <Typography variant="h3" className="homeSloganTxt">
                    { slogan[1] }
                    <span className="homeSlogan2Underline" />
                </Typography>
            </Grid>

            <Grid item xs={12} md={12} className="homeSloganGrid homeGridMargin">
                <Typography variant="h3" className="homeSloganTxt">
                    { slogan[2] }
                </Typography>
            </Grid>
            
            {/* Map out the faq in an accordion style*/}
            <Grid item xs={12} md={12} className="faqStartMargin">
                <Typography variant="h3" className="faqTitle">
                    FAQ
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} className="faqContactMargin" >
                <Typography variant="h4" className="faqTitle">
                    Any other questions related to WebDev can be emailed to: {contactEmail}
                </Typography>
            </Grid>
            {faq.map((cur, ind) => {
                return (
                    <Grid item xs={12} md={12} lg={12} >
                        <Accordion expanded={faqPanel === `faqPanel${ind}`} onChange={e => {
                            // Reset the accordion back to initial state if a human clicks on the same accordion
                            const curPanel = `faqPanel${ind}`
                            setFaqPanel(faqPanel == curPanel ? '_' : curPanel)
                        }} className="faqAccordion">
                            <AccordionSummary id={`faqPanel${ind}`} className="faqAccordionSummary">
                                <Typography variant="h4">
                                    Q. {cur[`q`]}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="faqAccordionSummary">
                                <Typography variant="h4">
                                    {cur[`a`]}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Home
