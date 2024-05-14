import React, { useState } from "react";
import axios from 'axios'
import { URL_API } from "./const";
import { useNavigate, useParams } from 'react-router-dom';

const endpoint = URL_API;

const InicioSesion = () => {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (email) => {
        setEmail(email.target.value);
    }
    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    }

    const handleFindAlumno = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${endpoint}/alumnos/find`, {
                email: email,
                password: password
            });
            if (response.data){
                localStorage.setItem("alumnoData", JSON.stringify(response.data));
                console.log("Respuesta del servidor:", response.data);
                navigate("/mostrar");
            }
            
        } catch (error) {
            console.error("Error al buscar alumno:", error);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card" >
                <div className="card-body">
                    <h1 className="card-title text-center">Inicio Sesion</h1>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input 
                                value={email} 
                                onChange={ handleEmailChange}
                                type='email'
                                className='form-control shadow-sm'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Password</label>
                            <input 
                                value={password} 
                                onChange={ handlePasswordChange}
                                type='password'
                                className='form-control shadow-sm'
                            />
                        </div>              
                        <button onClick={handleFindAlumno}
                         className='btn btn-success'
                         >Inicio Sesion</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default InicioSesion;