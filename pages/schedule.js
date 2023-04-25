import React, {Component} from "react";
import NavBar from "../components/NavBar";
import BottomBar from "../components/BottomBar";
import Head from 'next/head'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, where, query} from "firebase/firestore";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useAsync } from "react-async"

const getScheduleInfo = async (list) => {
    try {

    const firebaseConfig = {
        apiKey: "AIzaSyCS2s7GzBGZ4-yKJ_q4d-vdqDNZQpD8M70",
        authDomain: "gt-webdev-website.firebaseapp.com",
        projectId: "gt-webdev-website",
        storageBucket: "gt-webdev-website.appspot.com",
        messagingSenderId: "562784179730",
        appId: "1:562784179730:web:37e4b2c5ea06f7f5e26acb",
        measurementId: "G-1QX4LKFHCS"
    }
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, "schedule"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // console.log(doc.datelocation, " => ", doc.data());
    const sched = doc.data()
    list.push( 
    {
        "eventlocation": sched.datelocation.toString(),
        "title": sched.title.toString(),
        "description": sched.description.toString()
    }
    )
    });
} catch (e) {
    console.log(e)
}

}


  
const Schedule = () => {

    let list = []
    console.log(list)

    const { data, error, isPending } = useAsync({ promiseFn: getScheduleInfo(list), userId: 1 })
    if (isPending) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)
        return(
            <div>
                <Head>
                    <title>Schedule | GT WebDev</title>
                </Head>
                <NavBar />
                <VerticalTimeline>
                {list.map((cur, ind) => {
                    return(
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: '#f0cd42', color: '#222220' }}
                            contentArrowStyle={{ borderRight: '7px solid #f0cd42' }}
                            date=""
                            iconStyle={{ background: 'rgb(60, 60, 57)', color: '#fff' }}
                            icon = {< FaDesktop />}
                            >
                            <h3 className="vertical-timeline-element-title"> {cur['title']} </h3>
                            <h4 className="vertical-timeline-element-subtitle">  {cur['datelocation']} </h4>
                            <p>
                                {cur['description']}
                            </p>
                        </VerticalTimelineElement>
                    )
                })}

                </VerticalTimeline>
                
                <BottomBar />
            </div>
        )
}

export default Schedule;
