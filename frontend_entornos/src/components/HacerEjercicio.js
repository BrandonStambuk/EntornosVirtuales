import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { URL_API } from './const'
import { useNavigate, useParams } from 'react-router-dom'
const endpoint = URL_API;

const HacerEjercicios = () => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [codigo, setCodigo] = useState('');
    const { id } = useParams();

    
    useEffect ( ()=> {
        getEjercicio()
    }, [])

    const getEjercicio = async () => {
        const response = await axios.get(`${endpoint}/ejercicios/${id}`)
        setTipo(response.data.tipo)
        setNombre(response.data.nombre)
        setCodigo(response.data.codigo)
    }
    const handleComenzar = () => {
        
    }

    return (
        <div>
            <h1>{nombre}</h1>
            <h2>{tipo}</h2>
            <div className="event-info-container">
            
                <p className="event-info-text left">
                  <strong>Codigo:</strong>
                  
                </p>
                <div className="event-description" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: codigo }} />
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleComenzar}>Comenzar</button>
            </div>

        </div>
        
    )
}
export default HacerEjercicios;