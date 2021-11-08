import React, { useEffect } from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const CONFIRM = 'CONFIRM';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [mode, transition, props.interview]);

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function remove() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={edit}
        onDelete={() => transition(CONFIRM)}
      />
      )}
      {mode === CREATE
          && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
          )}
      {mode === EDIT
          && (
          <Form
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onCancel={back}
            onSave={save}
          />
          )}
      {mode === SAVING
          && (
          <Status
            message="Saving"
          />
          )}
      {mode === DELETING
          && (
          <Status
            message="Deleting"
          />
          )}
      {mode === CONFIRM
          && (
          <Confirm
            message="Are you sure you want to delete?"
            onConfirm={remove}
            onCancel={back}
          />
          )}
      {mode === ERROR_SAVE
          && (
          <Error
            message="Could not create appointment"
            onClose={back}
          />
          )}
      {mode === ERROR_DELETE
          && (
          <Error
            message="Could not cancel appointment"
            onClose={back}
          />
          )}
    </article>
  );
}
