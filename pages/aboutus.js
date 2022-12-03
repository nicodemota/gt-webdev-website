import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import { aboutUs } from "../data/aboutusData";
import { Grid, Typography } from "@mui/material";

const AboutUs = () => {
    
    return(
        <div>
            <Head />
            <NavBar />
            <Grid container rowGap={7.5} className="aboutUsContainer">
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h3" className="aboutUsTxt">
                        { aboutUs[0] }
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="aboutUsGrid">
                    <img src="undraw-graphic-1.png" className="aboutUsImg"/>
                </Grid>

                <Grid item xs={12} sm={6} md={6} className="aboutUsGrid">
                    <img src="undraw-graphic-2.png" className="aboutUsImg"/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h3" className="aboutUsTxt">
                        { aboutUs[1] }
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h3" className="aboutUsTxt">
                        { aboutUs[2] }
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="aboutUsGrid">
                    <img src="undraw-graphic-3.png" className="aboutUsImg"/>
                </Grid>

                <Grid item xs={12} sm={6} md={6} className="aboutUsGrid">
                    <img src="undraw-graphic-4.png" className="aboutUsImg"/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h3" className="aboutUsTxt">
                        { aboutUs[3] }
                    </Typography>
                </Grid>
            </Grid>
            <BottomBar />
        </div>
    )

}

export default AboutUs;