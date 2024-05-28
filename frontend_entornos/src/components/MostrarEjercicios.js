import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from './const';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs'; // Importa el icono de lápiz
const endpoint = URL_API;

const MostrarEjercicios = () => {
    const [ejercicios, setEjercicios] = useState([]);
    
    useEffect(() => {
        getAllEjercicios();
    }, []);

    const getAllEjercicios = async () => {
        const response = await axios.get(`${endpoint}/ejercicios`);
        setEjercicios(response.data);
    };

    return (
        <div className='container mt-4'>
            <h1 className='mb-4'>Tabla de Ejercicios</h1>
            <div className='d-grid gap-2 col-md-6'>
                {/* Aquí podrías agregar un botón u otro contenido si es necesario */}
            </div>
            <div className='table-responsive shadow-sm p-3 mb-5 bg-white rounded'>
                <table className='table table-striped'>
                    <thead className='bg-primary text-white'>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo de lenguaje</th>
                            <th>Ejercicio Regular</th>
                            <th>Ejercicio No BackSpace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ejercicios.map((ejercicio) => (
                            <tr key={ejercicio.id}>
                                <td>{ejercicio.nombre}</td>
                                <td>{ejercicio.tipo}</td>
                                <td>
                                    <Link to={`/mostrar/${ejercicio.id}`} className='btn  me-2'><BsPencil /></Link>
                                </td>
                                <td>
                                    <Link to={`/mostrar-NoBackspace/${ejercicio.id}`} className='btn me-2'><BsPencil /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MostrarEjercicios;