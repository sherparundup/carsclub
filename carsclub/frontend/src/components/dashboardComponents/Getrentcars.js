import React, {useState, useEffect, useContext} from 'react'
import {NavLink} from "react-router-dom";

import { AdminContext } from "../../App"

const Getrentcars = () => {

  const {adminState, dispatchadmin} = useContext(AdminContext)

  const [getCars, setGetCars] = useState([]);

  const getallsalecars = async () =>{
    try {
        const res = await fetch ('/getAvailableRentCars', {
            method: 'GET',
        });

        const data = await res.json();
        setGetCars(data);

    }
    catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getallsalecars();
}, [])

let carIdFromDashBoard;
  const deleteUser = (e) =>{
    carIdFromDashBoard = e.target.id;

    return fetch("/deleteRentCarFromDashboard", {
      method: "POST",
      headers:{
          "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        carIdFromDashBoard
      })
  })
  }


  const Loginbutton= () =>{
        
    if(adminState){
        return <div> 
            <button className="logoutbtnDash"><NavLink className="nav-link" to="/adminsignout">logout</NavLink></button>      
        </div>
    }
    else{
        return <div>  
                <button className="logoutbtnDash"><NavLink className="nav-link" to="/signin">login</NavLink></button>
                
            </div>
    }
  }


    return (
        <>
            
            
<div className="sidebar">
    <div className="logo-details">
      <i className='bx bxl-c-plus-plus'></i>
      <span className="logo_name">Cars Club</span>
    </div>
      <ul className="nav-links">
        {/* <li className="active"> */}
        <li>
            <NavLink className="dashlinks" to="/dashboard">
            <i className='bx bx-grid-alt' ></i>
            <span className="allLinks_name">Dashboard</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/addcars">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Add Cars</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/getsalecarsforadmin">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Available SaleCars</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/getrentcarsforadmin">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Available RentCars</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/salecarsreports">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Sale Cars Income</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/rentcarsreports">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Rent Cars Income</span>
            </NavLink>
        </li>
        <li>
          <NavLink className="dashlinks" to="/availableusers">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">Available Users</span>
          </NavLink>
        </li>
        <li>
        <NavLink className="dashlinks" to="/usermessages">
            <i className='bx bx-box' ></i>
            <span className="allLinks_name">User's Messages</span>
          </NavLink>
        </li>
      </ul>

      <div className="logoutbtnDashDiv">
        <Loginbutton/>
      </div>
  </div>



  <section className="home-section">
    <nav>
      <div className="sidebar-button">
        <i className='bx bx-menu sidebarBtn'></i>
        <span className="dashboard">Dashboard</span>
      </div>
      
      <div className="profile-details">
        {/* <img src="/image/profile.jpg" alt=""/> */}
        <span className="admin_name">Team 5</span>
        <i className='bx bx-chevron-down' ></i>
      </div>
    </nav>



        
    <div className = "salecartableDiv">

            <h1 className="heading"><span>Available Rent Cars</span></h1>

            <table className = "salecartable">
                  <thead>
                    <tr>
                      <th >BRAND </th>
                      <th >MODEL </th>
                      <th >RENT </th>
                      <th >PRICE </th>
                      <th >AVAILABILITY </th>
                      <th >DELETE </th>
                    </tr>
                    </thead>

        {getCars.map((getCars) => 
            <tbody   key={getCars._id} >
                <tr>
                    <td >{getCars.brand}</td>
                    <td >{getCars.model}</td>
                    <td >{getCars.rent}</td>
                    <td >{getCars.price} Rs</td>
                    <td >{getCars.availability} hours</td>
                    <td ><button id = {getCars._id} onClick={deleteUser} className="btn"><i className="fa fa-trash"></i></button></td>
                </tr> 
            </tbody>
         
        )}
      </table>
    </div>
    </section>
        </>
    )
}

export default Getrentcars
