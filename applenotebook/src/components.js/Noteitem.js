import React from "react";
import { useContext } from "react";

import noteContext from "../context/notes/NotesContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);

  const { note , updateNote } = props;
  const { deletenote } = context;
  return (
    <div className="card my-3 ">
      <div className="card-body">
        <div className="d-flex_align-items-center">
          <h5 className="card-title">{note.title}</h5>

          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash-can mx-3"
            onClick={() => {
              deletenote(note._id);
              props.showAlert("\n the node is deleted successfully","success")
         
            }}
          ></i>

          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)
          
          }}></i>
        </div>
      
      </div>
     
    </div>
  );
};

export default Noteitem;
