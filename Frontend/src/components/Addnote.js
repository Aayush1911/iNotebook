import React, { useContext, useState } from "react";
import Notecontext from '../context/notes/NoteContext';

function Addnote(props) {
  const context=useContext(Notecontext)
  const {addnote}=context;

  const [note ,setnote]=useState({title:"",description:"",tag:""})

  const handleclick=(e)=>{
    e.preventDefault()
    addnote(note.title , note.description , note.tag)
    setnote({title:"",description:"",tag:""})
    props.showalert('Added Successfully','success')
  }
  const onchange=(e)=>{
      setnote({...note,[e.target.name] : e.target.value})
  }
  return (
    <div>
      <div className="container my-4">
        <h2 className="my-3">Add Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name='title'
              id="title"
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description"  className="form-label">
            Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name='description'
              onChange={onchange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag"  className="form-label">
            Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              onChange={onchange}
              value={note.tag}
            />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleclick} className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
