import React from "react";
import "../css/Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="content-wrapper">
        <div className="container-bienvenida">
          <h1 className="title">Rapid Coder - Entornos Virtuales UMSS</h1>
          <p className="description">Bienvenido a Rapid Coder, donde puedes mejorar tus habilidades en programación.
          </p>
          
          <a href="/ejercicio" className="start-button">Start</a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
