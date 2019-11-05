import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "components/../hooks/useVisualMode";

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT";
    const ERROR_DELETE = "ERROR_DELETE"
    const ERROR_SAVE = "ERROR_SAVE"
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        transition(SAVING);
        const interview = {
          student: name,
          interviewer
        };
          props.bookInterview(props.id, interview)
         .then(() => transition(SHOW))
         .catch(() => transition(ERROR_SAVE, true))
      }

    function cancel() {
        transition(DELETING, true);
        props.cancelInterview(props.id)
        .then(()=> transition(EMPTY))
        .catch(()=> transition(ERROR_DELETE, true))
    }

    return (<article className="appointment" data-testid="appointment" >
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && 
            (<Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onDelete={()=> transition(CONFIRM)}
                onEdit={()=> transition(EDIT)}
            />
            )}
        {mode === CREATE && 
            (<Form
                interviewers={props.interviewers}
                onCancel={() => back()}
                onSave={save}
            />
            )}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting"/>}
        {mode === CONFIRM && <Confirm
         onCancel={()=> back()}
         onConfirm={cancel}
         message="Are you sure you would like to delete?"/>}
         {mode === EDIT && (<Form
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            name={props.interview.student}
            onCancel={() => back()}
            onSave={save}/>
         )}
         {mode === ERROR_SAVE && (<Error 
         message="Error saving interview"
         onClose={() => back()}/>)}
         {mode === ERROR_DELETE && (<Error 
         message="Error deleting interview"
         onClose={() => back()}/>)}
 
    </article>
    )
}
