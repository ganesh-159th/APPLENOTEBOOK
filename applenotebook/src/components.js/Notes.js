import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NotesContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getnotes, editnote } = context;
  useEffect(() => {
    getnotes();
  }, [getnotes]);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: " ",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    console.log("\n the node has been updated ", note);
    editnote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("\n the node is Updated successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Node
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3 my-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.title}
                    onChange={onChange}
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
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
             
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                {" "}
                Update Note{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <h1> You're Notes</h1>
        <div className="container">
        {notes.length ===0 && 'no notes to display '}
        </div>
        
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote}  showAlert={props.showAlert}note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
