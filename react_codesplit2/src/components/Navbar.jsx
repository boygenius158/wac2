import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Todo App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Database Todos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/localstorage">Local Storage Todos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/scroll">Scroll JSON</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/swr">Scroll swr</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/test">Test</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
