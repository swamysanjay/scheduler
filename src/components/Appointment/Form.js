import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const [input, setInput] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const handleSave = function () {
    if (input === '') {
      return setError('Student name cannot be blank');
    }
    if (!interviewer) {
      return setError('Need to choose an interviewer');
    }
    setError('');
    props.onSave(input, interviewer);
  };


  const handleCancel = function () {
    setInterviewer(null);
    props.onCancel();
  };
  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={input}
            onChange={handleInput}
            data-testid="student-name-input"
          />
        </form>
        {error && (
        <p>
          {' '}
          {error}
          {' '}
        </p>
        )}
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={handleCancel}>Cancel</Button>
          <Button confirm onClick={handleSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}
