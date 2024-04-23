import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios'
import { URL_API } from "./const";

const endpoint = URL_API;

const AgregarEjercicio = () => {
    const [nombre, setnombre] = useState("");
    const [tipo, setTipo] = useState("");    
    const [codigo, setCodigo] = useState("");

    
    const handleNombreChange = (nombre) => {
        setnombre(nombre.target.value);
    }
    const handleTipoChange = (tipo) => {
        setTipo(tipo.target.value);
    }
    const handleCodigoChange = (codigo) => {
        setCodigo(codigo.target.value);
    }

    const handleStoreEjercicio = async (e) => {
        e.preventDefault();
        await axios.post(`${endpoint}/crearEjercicio`, {
            nombre: nombre,
            tipo: tipo,
            codigo: codigo          
        });
    }


    return (
        <div>
            <h1>Agregar Ejercicio</h1>
            <form>
                <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                <input 
                    value={nombre} 
                    onChange={ handleNombreChange}
                    type='text'
                    className='form-control'
                />
                </div>
                <div className='mb-3'>
                <label className='form-label'>Tipo de Codigo</label>
                <input 
                    value={tipo} 
                    onChange={ handleTipoChange}
                    type='text'
                    className='form-control'
                />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Codigo</label>
                    <div>
                    <textarea
                        onChange={handleCodigoChange}
                        value={codigo}
                        type='text'
                        className='form-control'
                    />
                    </div>
                    
                </div>                
                <button onClick={handleStoreEjercicio} className='btn btn-success'>Agregar</button>
            </form>
        </div>
    )
}
export default AgregarEjercicio;