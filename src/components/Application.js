import React, {useState, useEffect, useDebugValue} from "react";

import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];


const appointment = appointments.map((appt) => {
  return (
    <Appointment key={appt.id} id={appt.id} time={appt.time} interview={appt.interview} />
  )
})

export default function Application(props) {
  const [day, setDay] = useState([]);
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:8001/api/days')
    .then(res => {
      setDayData(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
        days={dayData} 
        value={day} 
        onChange={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key = "last" time="5pm" />
      </section>
    </main>
  );
}
