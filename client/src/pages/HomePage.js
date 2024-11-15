import React from "react";
import '../styles//HomePage.css'; // Import the CSS file
import logo from '../components/bookmydoc.jpg'; // Adjust the path as needed

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo-container">
          {/* Display the logo image */}
          <img src={logo} alt="BookMyDoc Logo" className="logo-image" />
        </div>
      </header>

      <main className="main-content">
        <h1 className="heading-text">Welcome to the Doctor Appointment Scheduling System</h1>
        <p className="sub-text">Avoid Hassles & Delays.</p>
        <p className="sub-text2">
          How is health today?<br />
          Sounds like not good!<br />
          Don't worry. Find your doctor online. Book as you wish with BookMyDoc.<br />
          We offer you a free doctor channeling service. Make your appointment now.
        </p>

        <div className="button-group">
          <a href="/register" className="button-link">
            <button className="btn-primary">Make Appointment</button>
          </a>
        </div>

        <div className="login-options">
          <a href="/login" className="button-link">
            <button className="btn-secondary">Doctor Login</button>
          </a>
          <a href="/login" className="button-link">
            <button className="btn-secondary">Patient Login</button>
          </a>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-text">A Web Solution by Supreet and Sushant.</p>
      </footer>
    </div>
  );
};

export default HomePage;
