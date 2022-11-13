import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import {scheduleData} from '../data/scheduleData.js';
import { Grid, Typography } from "@mui/material";

const Schedule = () => {

    const oneColText = (txt) => {
        const res = txt.split(" ")
        console.log(`${res[0]}\n${res[1]}\n${res[2]}`)
        if (res[1] == undefined)
            return txt
        return `${res[0]}\n${res[1]}\n${res[2]}`
    }

    return(
        <div>
            <Head>
                <title>Schedule | GT WebDev</title>
            </Head>
            <NavBar />
            
            <Grid container rowGap={3} className="scheduleContainer">
                {scheduleData.map((cur, ind) => {
                    return(
                        <Grid container item className="scheduleGrid">
                            <Grid xs={4} className="scheduleDateGrid">
                                <Typography className="scheduleDateText">
                                    {oneColText(cur['date'])}
                                </Typography>
                            </Grid>
                            <Grid xs={6} >
                                <Typography className="scheduleAgendaTxt">
                                    {cur['agenda']}
                                </Typography>
                            </Grid>
                            <Grid xs={2} >
                                {cur['link'] != 'N/A'
                                ? 
                                <a href={cur['link']}> <img src="camera.png" className="bottomBarImg"/></a>
                                :
                                <span />}
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
            <BottomBar />
        </div>
    )
}

export default Schedule;
