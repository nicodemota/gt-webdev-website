import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import {scheduleData} from '../data/scheduleData.js';
import { Grid } from "@mui/material";

const Schedule = () => {

    const oneColText = (txt) => {
        const res = txt.split(" ");
        console.log(`${res[0]}\n${res[1]}\n${res[2]}`)
        return `${res[0]}\n${res[1]}\n${res[2]}`
    }

    return(
        <div>
            <Head>
                <title>Schedule | GT WebDev</title>
            </Head>
            <NavBar />
            
            <Grid container className="ScheduleContainer" style={{margin: "15px"}}>
                {scheduleData.map((cur, ind) => {
                    return(
                        <Grid container item columnGap={1} className="ScheduleGrid">
                            <Grid sm={4} md={2} lg={2} className="ScheduleDateBox">
                                {oneColText(cur['date'])}
                            </Grid>
                            <Grid sm={4} md={5} lg={5} style={{color: "#000000"}}>
                                {cur['agenda']}
                            </Grid>
                            <Grid sm={4} md={2} lg={2} >
                                {cur['link'] != 'N/A' 
                                ? 
                                <a href={cur['link']}>
                                    <img src="camera.png" className="bottomBarImg"/>
                                </a>
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
