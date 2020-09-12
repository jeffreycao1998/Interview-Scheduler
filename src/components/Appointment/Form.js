import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const [ name, setName ] = useState(props.name || '');
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [ error, setError ] = useState('');

  // resets name and interview field
  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  // prevents user from saving an interview spot without a name
  const validate = () => {
    if (!name) {
      return setError('Student name cannot be blank!');
    }
    if (!interviewer) {
      return setError('Must select an interviewer!');
    }
    setError('');
    props.onSave(name, interviewer);
  };

  const cancel = () => {
    props.onCancel();
    reset();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid='student-name-input'
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}