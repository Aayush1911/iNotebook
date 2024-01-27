import React, { useContext } from "react";
import Notecontext from '../context/notes/NoteContext';
import './Notesitem.css'

function Noteitem(props) {
  const { note, updatenote } = props;
  const context = useContext(Notecontext);
  const { deletenote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-pencil mx-2" onClick={() => { updatenote(note) }}></i>
            <i className="fa-solid fa-trash mx-2" onClick={() => {
              deletenote(note._id)
              props.showalert('Deleted Successfully', 'success')
            }}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
