import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

const SignUp = () => {

  let navigate = useNavigate()

  const [ credentials, setCredentials ] = useState({ name: "", email: "", password: "" })

  const handleChange = ( e ) => {

    setCredentials({ ...credentials, [ e.target.name ] : e.target.value })

  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()

    const data = await fetch("http://localhost:5000/api/user/createUser", {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    })

    const json = await data.json()

    if(json.success){
      localStorage.setItem("token", json.authToken)
      console.log(json.authToken, json.success)
      navigate("/home")
    }

  } 

  return (
    <div className='container' style={{ width: "600px", height: "65vh" }}>
      <form onSubmit={ handleSubmit }>
        <h2 className='heading text-center'>Welcome to Sign Up page</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={ handleChange } value={ credentials.name } />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={ handleChange } value={ credentials.email } />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={ handleChange } value={ credentials.password } />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp