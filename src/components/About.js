import React from 'react';
import aboutus from './aboutus.jpg';

const About = () => {
  return (
    <div className="container">
      <img src={aboutus} className="img-fluid" alt="About iNotebook" style={{ width: 700, height: 300 }} />
      <h1><u>Welcome to iNotebook</u></h1>
      <p>Enjoy a seamless experience to securely create, store, and retrieve your personal and business notes over the<br/> cloud in a secure manner. iNotebook offers you top-notch service and secures your notes over the cloud in an encrypted manner</p>
    </div>
  );
}

export default About;
