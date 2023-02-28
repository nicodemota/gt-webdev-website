import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
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
            <VerticalTimeline>
                <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#f0cd42', color: '#222220' }}
                contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                date=""
                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={< WorkIcon />}
                >
                <h3 className="vertical-timeline-element-title"> General Board Meeting </h3>
                <h4 className="vertical-timeline-element-subtitle">  February 24, 2023 - Howey L4</h4>
                <p>
                    Project meeting, Git/GitHub tutorial
                </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#f0cd42', color: '#222220' }}
                contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                date=""
                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={<WorkIcon />}
                >
                <h3 className="vertical-timeline-element-title"> General Board Meeting </h3>
                <h4 className="vertical-timeline-element-subtitle">  February 24, 2023 - Howey L4</h4>
                <p>
                    Project meeting, Git/GitHub tutorial
                </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#f0cd42', color: '#222220' }}
                contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                date=""
                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={<WorkIcon />}
                >
                <h3 className="vertical-timeline-element-title"> General Board Meeting </h3>
                <h4 className="vertical-timeline-element-subtitle">  February 24, 2023 - Howey L4</h4>
                <p>
                    Project meeting, Git/GitHub tutorial
                </p>
                </VerticalTimelineElement>
               
                <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#f0cd42', color: '#222220' }}
                contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                date=""
                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={<WorkIcon />}
                >
                <h3 className="vertical-timeline-element-title"> General Board Meeting </h3>
                <h4 className="vertical-timeline-element-subtitle">  February 24, 2023 - Howey L4</h4>
                <p>
                    Project meeting, Git/GitHub tutorial
                </p>
                </VerticalTimelineElement>
                
                <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#f0cd42', color: '#222220' }}
                contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                date=""
                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={<WorkIcon />}
                >
                <h3 className="vertical-timeline-element-title"> General Board Meeting </h3>
                <h4 className="vertical-timeline-element-subtitle">  February 24, 2023 - Howey L4</h4>
                <p>
                    Project meeting, Git/GitHub tutorial
                </p>
                </VerticalTimelineElement>
                
                <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#f0cd42', color: '#222220' }}
                contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                date=""
                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={<WorkIcon />}
                >
                <h3 className="vertical-timeline-element-title"> General Board Meeting </h3>
                <h4 className="vertical-timeline-element-subtitle">  February 24, 2023 - Howey L4</h4>
                <p>
                    Project meeting, Git/GitHub tutorial
                </p>
                </VerticalTimelineElement>
                
                <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#f0cd42', color: '#222220' }}
                contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                date=""
                // iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                // icon={<WorkIcon />}
                >
                <h3 className="vertical-timeline-element-title"> General Board Meeting </h3>
                <h4 className="vertical-timeline-element-subtitle">  February 24, 2023 - Howey L4</h4>
                <p>
                    Project meeting, Git/GitHub tutorial
                </p>
                </VerticalTimelineElement>
                
                
            </VerticalTimeline>
            
            <BottomBar />
        </div>
    )
}

export default Schedule;
