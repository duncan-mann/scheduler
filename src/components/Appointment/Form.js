import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
    const [name, setName] =  useState(props.name || "")
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    const reset = function() {
        setName("");
        setInterviewer(null);
    }

    const cancel = function() {
        reset();
        props.onCancel();
    }

    function validate() {
      if (name === "") {
        setError("student name cannot be blank");
        return;
      } else if (name !== "" && error !== "") {
        setError("");
      }
    
      props.onSave(name, interviewer);
    }

    return (
        <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        value={name}
        type="text" 
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        data-testid = "student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
    )
}