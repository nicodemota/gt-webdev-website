import React, {Component, useState} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head'
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";

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
      )
  }
}

const Introduction = () => {

    const [faqPanel, setFaqPanel] = useState("faqPanel_")

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* UpperHalf Text+Img */}
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
            <Grid xs={12} md={12} className="faqContactMargin" >
                <Typography variant="h4" className="faqTitle">
                    Any other questions related to WebDev can be emailed to: {contactEmail}
                </Typography>
            </Grid>
            {faq.map((cur, ind) => {
                return (
                    <Grid xs={12} md={12} lg={12} >
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