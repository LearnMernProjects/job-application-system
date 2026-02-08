import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Job Hub
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                {user.role === 'admin' ? (
                  <Link to="/dashboard/admin" className="nav-link">
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard/user" className="nav-link">
                    My Dashboard
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <span className="nav-user">
                  Welcome, {user.name}
                </span>
              </li>
              <li className="nav-item">
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
