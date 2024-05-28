import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = "http://localhost:8000/api";
const InicioSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFindAlumno = async (e) => {
    e.preventDefault();
    let is_alumno = true;

    try {
      const response = await axios.post(`${endpoint}/profesor/find`, {
        email: email,
        password: password
      });

      if (response.data) {
        localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify({ id: response.data.id, is_profesor: true }));
        is_alumno = false;
        console.log("Respuesta del servidor:", response.data);

        
          navigate("/agregar");
          window.location.reload();
      }
    } catch (error) {
      console.error("Error al buscar profesor:", error);
    }

    if (is_alumno) {
      try {
        const responseAlumno = await axios.post(`${endpoint}/alumnos/find`, {
          email: email,
          password: password
        });

        if (responseAlumno.data) {
          localStorage.removeItem("userData");
          localStorage.setItem("userData", JSON.stringify({ id: responseAlumno.data.id, is_profesor: false }));
          console.log("Respuesta del servidor:", responseAlumno.data);

          
            navigate("/mostrar");
            window.location.reload();
        }
      } catch (error) {
        console.error("Error al buscar alumno:", error);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">Inicio Sesión</h1>
          <form>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                value={email}
                onChange={handleEmailChange}
                type='email'
                className='form-control shadow-sm'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <input
                value={password}
                onChange={handlePasswordChange}
                type='password'
                className='form-control shadow-sm'
              />
            </div>
            <button onClick={handleFindAlumno} className='btn btn-success'>Inicio Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
