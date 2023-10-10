import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components.js/Navbar";
import Home from "./components.js/Home";
import About from "./components.js/About";
// import NotesContext from "./context/notes/NotesContext";
import NotesState from "./context/notes/NoteSate";
import Alert from "./components.js/Alert";
import Login from "./components.js/Login";
import Sigup from "./components.js/Sigup";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";



function App() {
  const [alert, setAlert] = useState(null);


  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NotesState>
        <Router>
          <Navbar  />
          <Alert alert={alert} />
          <div className="container my-7">
            <Routes>
              <Route exact path="/Home" element={<Home showAlert={showAlert}/>} />

              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login showAlert={showAlert}/>} />

              <Route exact path="/Sigup" element={<Sigup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
