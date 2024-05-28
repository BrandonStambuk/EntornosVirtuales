import React, { useState } from "react";
import axios from 'axios';
import { URL_API } from "./const";
import Swal from 'sweetalert2';  // Importa sweetalert correctamente
const endpoint = URL_API;

const RegistroAlumno = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    }
    const handleApellidoChange = (e) => {
        setApellido(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleStoreAlumno = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${endpoint}/registrarAlumno`, {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password    
            });
            Swal.fire({
                title: 'Registro Exitoso',
                text: 'El alumno ha sido registrado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirige a la nueva ruta al confirmar la alerta
                    window.location.href = '/mostrar';  // Cambia '/nueva-ruta' por la ruta deseada
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error al añadir al alumno",
              
              });
        }
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
                                onChange={handleNombreChange}
                                type='text'
                                className='form-control shadow-sm'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Apellido</label>
                            <input 
                                value={apellido} 
                                onChange={handleApellidoChange}
                                type='text'
                                className='form-control shadow-sm'
                            />
                        </div>
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