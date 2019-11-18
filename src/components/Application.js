import React from "react";
import  {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import AppData from "../hooks/useApplicationData.js";

export default function Application(props) {

  const {state, setDay, cancelInterview, bookInterview} = AppData();


  let _appointments = getAppointmentsForDay(state, state.currentDay);
  let _interviewers = getInterviewersForDay(state, state.currentDay);


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
      cancelInterview={cancelInterview}
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
    </section>
    <section className="schedule">
      {schedule}
      <Appointment 
        key={"last"} 
        time={"5pm"} 
         />
    </section>
  </main>
);
}
