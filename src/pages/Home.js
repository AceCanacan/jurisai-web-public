import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages-css/Home.css'; // Adjust the import path as per your project structure
import icon from '../assets/jurisai_icon.png';

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <img src={icon} alt="Medgpt Icon" className="icon" />
      <h2 className="large-text">JurisAI</h2>
      <h2 className="small-text">Instant Legal Queries</h2>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/input')}>Start</button>
      </div>
    </div>
  );
}

export default Home;
