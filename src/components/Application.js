import React, {useState, useEffect} from "react";

import "components/Application.scss";
import DayList from "./DayList";
//import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));
  //const setDays = days => setState(prev => ({...prev, days}));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  const appointmentsObject = getAppointmentsForDay(state, state.day);
  const interviewersObject = getInterviewersForDay(state, state.day);

  const appointment = appointmentsObject.map((appointmentObj) => {
    const interview = getInterview(state, appointmentObj.interview);
    return (
      <Appointment {...appointmentObj} key={appointmentObj.id} interview={interview} interviewers={interviewersObject}/>
    )
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
        days={state.days} 
        value={state.day} 
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
