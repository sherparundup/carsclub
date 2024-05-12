import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const DistributorSignup = () => {
    const history = useHistory();
    const [distributor, setDistributor] = useState({
        distributorName: "",
        distributorEmail: "",
        distributorPhone: "",
        distributorPassword: "",
        distributorCPassword: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setDistributor({ ...distributor, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const { distributorName, distributorPhone, distributorEmail, distributorPassword, distributorCPassword } = distributor;

        const res = await fetch("http://localhost:5000/signupDistributor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                distributorName, distributorPhone, distributorEmail, distributorPassword, distributorCPassword
            })
        })

        const data = await res.json();

        if (data.error) {
            window.alert(data.error);
        } else {
            window.alert(data.message);
            history.push("/distributersignin");
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
                    <button className="btn"><NavLink className="nav-link" to="/DistributerSignin">Login</NavLink></button>
                </div>
            </header>

            <div className="maincontainer">
                <div className="firstcontainer">
                    <div className="titled">Distributor Registration</div>
                    <div className="content">
                        <form method="POST">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Full Name</span>
                                    <input type="text" name="distributorName" value={distributor.distributorName} onChange={handleInputs} placeholder="Enter your name" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" name="distributorEmail" value={distributor.distributorEmail} onChange={handleInputs} placeholder="Enter your email" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input type="text" name="distributorPhone" value={distributor.distributorPhone} onChange={handleInputs} placeholder="Enter your number" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input type="password" name="distributorPassword" value={distributor.distributorPassword} onChange={handleInputs} placeholder="Enter your password" />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input type="password" name="distributorCPassword" value={distributor.distributorCPassword} onChange={handleInputs} placeholder="Confirm your password" />
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

export default DistributorSignup;
