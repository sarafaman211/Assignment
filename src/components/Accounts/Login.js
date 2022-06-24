import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const data = await fetch('http://localhost:5000/api/user/validate', {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })

    const json = await data.json()

    if (json.success) {
      localStorage.setItem("token", json.authToken)
      console.log(json.authToken)
      navigate('/data')
    } else {
      alert("fill the correct credentials")
    }

  }

  return (
    <div className='container' style={{ width: "600px", height: "65vh" }}>
      <form onSubmit={handleSubmit}>
        <h2 className='heading text-center'>Welcome to login page</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} name="email" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} name="password" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Submit</button>
        <p style={{ textAlign: "center", padding: 12, fontWeight: "bold" }}>If you don't have account feel free to <Link to="/signup" className="text-primary" style={{ textDecoration: "none" }}>Sign Up !!!</Link></p>
      </form>

      <ToastContainer
        position='bottom-center'
        autoClos="1500"
      />
    </div>
  )
}

export default Login