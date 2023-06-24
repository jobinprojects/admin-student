import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ title, onSignOut }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/login', { replace: true }); // Use the "replace" option to replace the current history entry
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">{title}</div>
      <button className="sign-out-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar title="BVICAM" onSignOut={() => console.log('Signing out...')} />
      {/* Your other app components */}
    </Router>
  );
};

export default App;
