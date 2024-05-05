import React, { useState } from "react";
import axios from 'axios'
import { URL_API } from "./const";

const endpoint = URL_API;

const RegistroAlumno = () => {
    const [nombre, setnombre] = useState("");
    const [apellido, setApellido] = useState("");    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNombreChange = (nombre) => {
        setnombre(nombre.target.value);
    }
    const handleApellidoChange = (apellido) => {
        setApellido(apellido.target.value);
    }
    const handleEmailChange = (email) => {
        setEmail(email.target.value);
    }
    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    }

    const handleStoreAlumno = async (e) => {
        e.preventDefault();
        await axios.post(`${endpoint}/registrarAlumno`, {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password    
        });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '80%', maxWidth: '800px', height: '80%', maxHeight: '600px' }}>
                <div className="card-body">
                    <h1 className="card-title text-center">Registro Alumno</h1>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input 
                                value={nombre} 
                                onChange={ handleNombreChange}
                                type='text'
                                className='form-control shadow-sm'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Apellido</label>
                            <input 
                                value={apellido} 
                                onChange={ handleApellidoChange}
                                type='text'
                                className='form-control shadow-sm'
                            />
                        </div>
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
                        <button onClick={handleStoreAlumno}
                         className='btn btn-success'
                         >Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default RegistroAlumno;