import React, { useState } from 'react';
import "../registerStyle.css";
import { NavLink, useHistory } from 'react-router-dom';

const AdminSignup = () => {
    const history = useHistory();
    const [admin, setAdmin] = useState({
        adminName: "",
        adminEmail: "",
        adminPhone: "",
        adminPassword: "",
        adminCPassword: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const { adminName, adminPhone, adminEmail, adminPassword, adminCPassword } = admin;

        const res = await fetch("http://localhost:5000/signupAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adminName, adminPhone, adminEmail, adminPassword, adminCPassword
            })
        })

        const data = await res.json();

        if (data.error) {
            window.alert(data.error);
        } else {
            window.alert(data.message);
            history.push("/adminsignin");
        }
    }

    return (
        <>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>cars</span>Club </NavLink>
                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/exploreSaleCars">Explore-Sale-Cars</NavLink>
                    <NavLink to="/exploreRentCars">Explore-Rent-Cars</NavLink>
                </nav>
                <div id="login-btn">
                    <button className="btn"><NavLink className="nav-link" to="/adminsignin">Login</NavLink></button>
                </div>
            </header>

            <div className="maincontainer">
                <div className="firstcontainer">
                    <div className="titled">Admin Registration</div>
                    <div className="content">
                        <form method="POST">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Full Name</span>
                                    <input type="text" name="adminName" value={admin.adminName} onChange={handleInputs} placeholder="Enter your name" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" name="adminEmail" value={admin.adminEmail} onChange={handleInputs} placeholder="Enter your email" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input type="text" name="adminPhone" value={admin.adminPhone} onChange={handleInputs} placeholder="Enter your number" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input type="password" name="adminPassword" value={admin.adminPassword} onChange={handleInputs} placeholder="Enter your password" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input type="password" name="adminCPassword" value={admin.adminCPassword} onChange={handleInputs} placeholder="Confirm your password" />
                                </div>
                            </div>
                            <div className="button">
                                <input type="submit" name="signup" value="Register" onClick={postData} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSignup;
