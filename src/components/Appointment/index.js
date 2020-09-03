import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back, history } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVE);

    props.bookInterview(props.id, interview, transition, SHOW)
  };

  const onConfirm = () => {
    transition(DELETE, true);

    props.cancelInterview(props.id, transition, EMPTY);
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const onEdit = () => {
    transition(EDIT);
  };

  const onClose = () => {
    back();
  };

  const onCancel = () => {
    back();
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVE && <Status message={'Saving'} />}
      {mode === DELETE && <Status message={'Deleting'} />}
      {mode === CONFIRM && <Confirm message={'Are you sure you would like to delete?'} onCancel={onCancel} onConfirm={onConfirm} />}
      {mode === ERROR_SAVE && <Error message={'Save failed'} onClose={onClose} />}
      {mode === ERROR_DELETE && <Error message={'Delete failed'} onClose={onClose} />}
      {mode === EDIT && (
        <Form  
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={onSave}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === CREATE && (
        <Form  
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </article>
  );
}