import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, title = "DocIntelligence App" }) => {
  const currentYear = new Date().getFullYear();
  const appName = "FinLucentra";

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {/* Placeholder logo */}
            <img 
              src="https://via.placeholder.com/32" 
              alt="Logo" 
              style={{ height: '32px', marginRight: '8px' }}
            />
            {appName}
          </Link>
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Upload Document</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link disabled">Funds Data (Coming Soon)</span>
              </li>
              <li className="nav-item">
                <span className="nav-link disabled">Calculations (Coming Soon)</span>
              </li>
              <li className="nav-item">
                <span className="nav-link disabled">About</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="content-wrapper container flex-grow-1" style={{ padding: '40px' }}>
        {children}
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        marginTop: '40px',
        fontSize: '0.9em',
        color: '#6c757d'
      }}>
        &copy; {currentYear} {appName}. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;