import React, { useEffect, useState } from "react";
import dataContext from "../Context/DataContext"
const DataState = ({ children }) => {

   const [ data, setData ] = useState([])

   const getData = async ( ) => {
    const response = await fetch(`http://localhost:5000/api/data/getData`, {
        method: "GET",
        headers: {
            "content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })

    const { data } = await response.json();
    // console.log(data)
    setData(data)
}

const deleteData = async (id) => {
    const data = await fetch(`http://localhost:5000/api/data/deleteData/${ id }`, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })

        const deleteData = data.filter( data => { return data._id !== id } )
        setData(deleteData)
}


    return (
        <dataContext.Provider value={{ getData, data, deleteData }}>
            {children}
        </dataContext.Provider>
    )
}

export default DataState