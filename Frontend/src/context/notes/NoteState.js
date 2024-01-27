import React, { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://inotebook-roan.vercel.app";
  const initialnotes = [];
  const [notes, setnotes] = useState(initialnotes);

  //all note
  const getnote = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json);
    setnotes(json);
  };

  //add note
  const addnote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    // console.log('added note');
    setnotes(notes.concat(note));
  };

  //edit note
  const editnote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    let newnote=JSON.parse(JSON.stringify(notes))
    //logic to edit for client
    for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
      
    }
    setnotes(newnote)
  };

  //delete note
  const deletenote =async (id) => {
     //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json);
    setnotes(json);
    // console.log('deleting note with id ' ,id);
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newnote);
  };
  return (
    <Notecontext.Provider
      value={{ notes, getnote, addnote, editnote, deletenote }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;
