import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  )
  
  return (
    <article className = "appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)}/>
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave ={() => transition(SAVING)}/>}
        {mode === EDIT && <Form name={props.name} value={props.value} interviewers={props.interviewers} interviewer={props.interviewer} onCancel={back} onSave ={() => transition(SAVING)}/>}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={() => transition(DELETING)} onCancel={back}/>}
    </article>
  )
}