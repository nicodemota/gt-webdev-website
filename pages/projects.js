import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import {Grid, Typography, Box} from "@mui/material";

import {currentData,previousData} from '../data/projectData.js';

const Projects = () => {

    const commonStyles = {
        bgcolor: '#202022',
        m: 1,
        width: '15rem',
        height: '15rem',
      };

    return(
        <div>
            <Head>
                <title>Projects | GT WebDev</title>
            </Head>
            <NavBar />

            {/* Current Semster Project List */}
            <Typography variant="h3" className="projectSectionTitle">
                {currentData[0]['semester']}
            </Typography>
            <Grid container columnGap={2} className="projectSectionPadding">
                {currentData[0]['projects'].map((cur, ind) => {
                    return(
                        <Box sx={{ ...commonStyles, borderRadius: 5 }} className="projectBoxInfo projectBoxTxt">
                            {cur['name']}
                        </Box>
                    )
                })}
            </Grid>

            {/* List of previous semester projects */}
            {previousData.map((cur, ind) => {
                return (
                    <div>
                        <Typography variant="h3" className="projectSectionTitle">
                            {cur['semester']}
                        </Typography>
                        <Grid container columnGap={2} className="projectSectionPadding">
                            {cur['projects'].map((cur, ind) => {
                                return(
                                    <Box sx={{ ...commonStyles, borderRadius: 5 }} className="projectBoxInfo projectBoxTxt">
                                        {cur['name']}
                                    </Box>
                                )
                            })}
                        </Grid>
                    </div>
                )
            })}
            <BottomBar />
        </div>
    )
}

export default Projects