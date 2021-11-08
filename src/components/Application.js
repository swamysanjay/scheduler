import React from 'react';

import 'components/Application.scss';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';
import DayList from './DayList';
// import InterviewerList from "./InterviewerList";
import Appointment from './Appointment';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const appointmentsObject = getAppointmentsForDay(state, state.day);

  const interviewersObject = getInterviewersForDay(state, state.day);

  const appointment = appointmentsObject.map((appointmentObj) => {
    const interview = getInterview(state, appointmentObj.interview);
    return (
      <Appointment
        {...appointmentObj}
        key={appointmentObj.id}
        interview={interview}
        interviewers={interviewersObject}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            onChange={setDay}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment
          key="last"
          time="5pm"
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      </section>
    </main>
  );
}
