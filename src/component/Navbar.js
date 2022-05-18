
import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/Calender">
              Calender
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Record">
              Record
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Teaminf">
              Team
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Playerinf">
              Player
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Reservation">
              Reservation
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;