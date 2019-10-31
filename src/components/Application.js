import React, { useState, useEffect } from "react";
import axios from "axios";
import  {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";

export default function Application(props) {

  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = currentDay => setState({ ...state, currentDay });


  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    }).catch((e)=> console.log('error:', e))
   }, [])

   function bookInterview(id, interview) {
    console.log('bookInterview', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

  return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => setState({ ...state, appointments }))
  }

  let _appointments = getAppointmentsForDay(state, state.currentDay);
  let _interviewers = getInterviewersForDay(state, state.currentDay);
console.log(_interviewers)

  let schedule = _appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={_interviewers}
      bookInterview={bookInterview}
    />
    )
  })

return (
  <main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.currentDay}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
    </section>
    <section className="schedule">
      {schedule}
      <Appointment 
        key={"last"} 
        time={"4pm"} 
         />
    </section>
  </main>
);
}
