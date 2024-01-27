import React, { useContext, useState, useEffect, useRef } from "react";
import Notecontext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";


function Notes(props) {
  const context = useContext(Notecontext);
  const { notes, getnote,editnote } = context;
  const navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
    getnote();
    }else{
      navigate('/login')
    }
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({
      id:currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const [note, setnote] = useState({ id:"",etitle: "", edescription: "", etag: "" });

  const handleclick = (e) => {
    // console.log("updateing....", note);
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click()
    props.showalert('Updated Successfully','success')
  };

  const {showalert}=props

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote showalert={props.showalert}/>
      {/* edit note starts  */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etitle"
                    id="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    name="etag"
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={note.etitle.length<5 || note.edescription.length<5}
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className="my-4">Your Note</h2>
        {notes.length === 0 && <div className='container mx-2'> No notes to desplay</div>}
        {notes.map((note) => {
          return (   
            <Noteitem note={note}showalert={showalert} updatenote={updatenote} key={note._id} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
