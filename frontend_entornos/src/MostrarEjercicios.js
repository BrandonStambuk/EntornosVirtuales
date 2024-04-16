import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { URL_API } from './const'
import { Link } from 'react-router-dom'
const endpoint = URL_API;

const MostrarEjercicios = () => {
    const [ejercicios, setEjercicios] = useState([])
    useEffect ( ()=> {
        getAllEjercicios()
    }, [])

    const getAllEjercicios = async () => {
        const response = await axios.get(`${endpoint}/ejercicios`)
        setEjercicios(response.data)
    }

    return (
        <div>
        <div className='d-grid gap-2 col-md-6'>
            <Link to="/agregar" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Agregar Ejercicio</Link>
        </div>
        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>nombre</th>
                    <th>tipo de lenguaje</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                { ejercicios.map( (ejercicio) => (
                    <tr key={ejercicio.id}>
                        <td>{ejercicio.nombre}</td>
                        <td>{ejercicio.tipo}</td>
                        <td>
                            <button className='btn btn-info'>Editar</button>
                            <button className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))}                
            </tbody>
        </table>
        </div>
    )
}
export default MostrarEjercicios;