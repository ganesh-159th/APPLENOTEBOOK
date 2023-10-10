import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sigup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" ,cpassword:""});

   
  let history = useNavigate();
  
   const handlesubmit = async (e)=>{
      e.preventDefault();
     const  {name ,email,password} = credentials;
    
      const response = await fetch('http://localhost:8000/api/auth/createuser', {
          method:'POST',
    
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name , email ,password})
          
        });
        const json =await response.json();
        console.log(json);
        if(json.success){
     
          // save the auth token and then redirect it 
          localStorage.setItem('token', json.authtoken);
          history("/Home",{push:true})
          props.showAlert("The Account has been Created  successfully  ","success")
      
       
      }else{
        props.showAlert("invalid input has been givne ","danger")
      }
    }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div>
        <form onSubmit={handlesubmit}>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label"> Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange}/>
  </div>
  
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </div>
  )
}

export default Sigup


