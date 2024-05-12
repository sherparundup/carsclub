import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { DistributorContext } from '../App';

const DistributorSignin = () => {
  const { distributorState, dispatchDistributor } = useContext(DistributorContext);

  const distributorHistory = useHistory();
  const [distributorName, setDistributorName] = useState('');
  const [distributorPassword, setDistributorPassword] = useState('');

  const signinDistributor = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/signinDistributor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        distributorName,
        distributorPassword
      })
    });
    console.log("okkkkkkkk")
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid Credentials');
    } else {
      // dispatchDistributor({ type: 'DISTRIBUTOR', payload: true });
      window.alert('Signin Successful');
      distributorHistory.push('/dashboard');
    }
  };

  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>
        <a href="#" className="logo">
          {' '}
          <span>cars</span>Club{' '}
        </a>
        <nav className="navbar">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <a href="#vehicles">vehicles</a>
          <a href="#services">services</a>
          <a href="#featured">featured</a>
          <a href="#reviews">reviews</a>
          <a href="#contact">contact</a>
        </nav>
        <div id="login-btn">
          <button className="btn">
            <NavLink className="nav-link" to="/signin">
              Login
            </NavLink>
          </button>
        </div>
      </header>
      <div className="maincontainer">
        <div className="firstcontainer">
          <div className="titled"></div>
          <div id="distributorsignin" className="content">
            <h2>Signin As Distributor</h2>
            <form method="POST">
              <div className="user-details">
                <div className="input-box">
                  <span className="details">User Name</span>
                  <input
                    type="text"
                    value={distributorName}
                    onChange={(e) => setDistributorName(e.target.value)}
                    placeholder="Enter your user name"
                  />
                </div>
                <div className="input-box">
                  <span className="details">Password</span>
                  <input
                    type="password"
                    value={distributorPassword}
                    onChange={(e) => setDistributorPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="button">
                <input type="submit" value="Signin" onClick={signinDistributor} />
              </div>
            </form>
            <h3>
              Don't have an account{' '}
              <NavLink style={{ color: '#52f8ab' }} to="/distributersignup">
                create one
              </NavLink>
            </h3>
            <button className="btn">
              <NavLink className="nav-link" to="/signin">
                Signin As User
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistributorSignin;
