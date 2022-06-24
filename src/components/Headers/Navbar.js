import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    let navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem('token')
        navigate('/login')
        toast.success('"Logout Successfully');
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><i className="fas fa-mail-bulk text-primary mx-2"></i>Assignment</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/data">Records</Link>
                            </li>
                           
                        </ul>
                        {localStorage.getItem('token') ? <button onClick={handleClick} className='btn btn-primary' type='button'>LogOut</button>: <form className="d-flex">
                            <Link to='/login' className='btn btn-primary mx-2'>Login</Link>
                        </form>}
                    </div>
                </div>
            </nav>
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
            />
        </div>
    )
}

export default Navbar