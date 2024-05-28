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
        <div>
            <div className='d-grid gap-2 col-md-6'>
            </div>
            <table className='table table-striped'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo de lenguaje</th>
                        <th>Ejercicio Regular</th>
                    </tr>
                </thead>
                <tbody>
                    {ejercicios.map((ejercicio) => (
                        <tr key={ejercicio.id}>
                            <td>{ejercicio.nombre}</td>
                            <td>{ejercicio.tipo}</td>
                            <td>
                                <Link to={`/mostrarEjercicio/${ejercicio.id}`} className='btn btn-info me-2'><BsPencil /></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MostrarEjercicios;
