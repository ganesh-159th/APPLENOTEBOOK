import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

   
let history = useNavigate();

 const handlesubmit = async (e)=>{
    e.preventDefault();
  
    const response = await fetch('http://localhost:8000/api/auth/login', {
        method: "POST",
  
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})
        
      });
      const json =await response.json();
      console.log(json);
      if(json.success){
        // save the auth token and then redirect it 
        localStorage.setItem('token', json.authtoken);
        history("/Home",{push:true})
        props.showAlert(" The User has logged in Successfully  ","success")
      }
      else{
       props.showAlert(" Invvalid input has been givne ","danger")
      }
    
 }
 const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
  <div className="mb-3 my-13">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"aria-describedby="emailHelp" onChange={onChange} value={credentials.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange}  value={credentials.password}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
      
    </div>
  )
}

export default Login
