import React from "react";
import "../css/Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="content-wrapper">
        <h1 className="title">Rapid Coder - Entornos Virtuales UMSS</h1>
        <section className="waves-section">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
        </section>
        <a href="/mostrar" className="start-button">Start</a>
      </div>
    </div>
  );
};

export default Homepage;