import { useState } from "react";
import NotesContext from "./NotesContext";


// import { json } from "react-router-dom";

const NotesState = (props) => {
  const host = "http://localhost:8000"
  const noteinitial = []
  const [notes, setnotes] = useState(noteinitial)
    // getallnotes  note
    const getnotes = async () => {
      
       //API call
  
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        
      });
  
    console.log(await response.json())
    
    }
  
  
  // add a note
  const addnote = async (title, description, tag) => {
    // todo :api call
     //API call

     const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });

    const note = await response.json();
    setnotes(notes.concat(note))
  }
  



  // delete a note
  
  const deletenote =  async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token" :localStorage.getItem('token')
      },
     
    });
    const json = response.json();
    console.log(json)



    console.log("Deleting the node with id "+id);
    const newnotes =notes.filter((note) =>{
      return note._id !== id
    })


    
    setnotes(newnotes);
  }

  // edit a note
  const editnote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        "Content-Type": "application/json",
        "auth-token" :localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
console.log(json)

  
  
 let newNotes  = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index <  newNotes.length; index++) {
      const element =  newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      
      }
      break;
    
    }
    
    console.log( notes);
    setnotes( newNotes);
  };

  return (
    <NotesContext.Provider
      value={{ notes, setnotes, addnote, deletenote, editnote , getnotes }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
