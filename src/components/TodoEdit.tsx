import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { TodoTasksList } from "../todo_task";

type Props = {
  todo: TodoTasksList;
  show: boolean;
  // onShow: () => {},
  onHide: () => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoEdit = (props: Props) => {
  const [newTitle, setNewTitle] = useState(props.todo.title);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
}

  const handleSaveClick = () => {

    props.onEdit(props.todo.id, newTitle);

    props.onHide();
  }

  return (
    <Modal show={props.show} onHide={props.onHide} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" value={newTitle} onChange={handleChange} className="border rounded p-1 w-10/12 border-red-700"/>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>close</button>
        <button onClick={handleSaveClick}>save me</button>
      </Modal.Footer>
    </Modal>

    // <div className='rounded-lg bg-yellow-400'>
    //     <h2>task here</h2>
    //     <p>description of this task is here</p>
    //     <button type='button'>cancel</button>
    // </div>
  );
};

export default TodoEdit;
