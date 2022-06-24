import React, { useContext, useState, useEffect, createElement } from 'react'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import dataContext from '../../Context/DataContext';
import Pagination from '../Assest/Pagination';

const Records = () => {

  const [ credentials, setCredentials ] = useState({ fname: "", lname: "", email: "", password: "", address: "" })
  const { getData, data, deleteData } = useContext(dataContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [search, setSearch] = useState("")

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    if(localStorage.getItem("token")){
      getData()
    }
    toast("logged In")
  }, [])
  

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const cancel = () => {
    setSearch("")
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:5000/api/data/addData`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ fname: credentials.fname, lname: credentials.lname, email: credentials.email, passwords: credentials.password, address: credentials.address})
    })
    toast("DATA SAVED")
    setCredentials({ fname: "", lname: "", email: "", password: "", address: "" })

  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name] : e.target.value })
  }


  return (
    <div className='container'>

      <div className='container pb-5' style={{ width: "600px" }}>

        <h2 className="heading text-center">Enter the data </h2>

        <form onSubmit={handleSubmit} >
          <div className="mb-3 ">
            <label htmlFor="fname" className="form-label">First Name</label>
            <input type="text" className="form-control" id="fname" onChange={handleChange} value={credentials.fname} name='fname' />
          </div>
          <div className="mb-3 ">
            <label htmlFor="lname" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lname" onChange={handleChange} value={credentials.lname} name='lname' />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" aria-describedby="emailHelp" onChange={handleChange} value={credentials.address} name="address" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">password</label>
            <input type="text" className="form-control" id="password" aria-describedby="emailHelp" onChange={handleChange} value={credentials.password} name="password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Add Data</button>
        </form>
      </div>

      <div className="user-data">
        <h2 className="heading text-secondary text-center ">All USERS DATA</h2>

        <div className='d-flex justify-content-end align-items-end' >
          <input style={{ padding: 5 }} value={search} type="text" placeholder="seach..." onChange={handleSearch} />
          <button className='btn btn-danger mx-2' onClick={cancel}>Cancel</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Password</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>

          {data && data.filter(data => {
            if (search === "") {
              return data;
            } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
              return data;
            }
          }).map((data, index) => {
            return (
              <tbody key={data._id}>
                <tr>
                  <th scope="row">{index}</th>
                  <td>{data.fname}</td>
                  <td>{data.lname}</td>
                  <td>{data.email}</td>
                  <td>{data.address}</td>
                  <td>{data.password ? data.passwod : "Confidential"}</td>
                  <td>{new Date(data.createdAt).toGMTString()}</td>
                  <td onClick={() =>{ return deleteData(data._id) , toast( "User Info Deleted" ) }}><i className="fas fa-trash-alt text-danger" style={{ cursor: "pointer" }}></i></td>
                </tr>
              </tbody>

            )
          })}
        </table>
        <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
      </div>

      <ToastContainer
        position='bottom-center'
        autoClos="1500"
      />
    </div>
  )
}

export default Records