import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios'
import { URL_API } from "./const";

const endpoint = URL_API;

const AgregarEjercicio = () => {
    const [descripcion, setDescripcion] = useState("");
    const [nombre, setnombre] = useState("");

    
    const handleNombreChange = (nombre) => {
        setnombre(nombre.value);
    }
    const handleDescripcionChange = (descripcion) => {
        setDescripcion(descripcion);
    }

    const handleStoreEjercicio = async (e) => {
        e.preventDefault();
        const responseEvento = await axios.post(`${endpoint}/crearEventoDinamico`, {
            descripcion: descripcion,
            nombre: nombre
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
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <Editor
                        apiKey="et3kv22txmedmy751hwdgrmywr1k93evr5t5in9vmjh0mze8"
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        init={{
                        directionality: 'ltr',
                        setup: function (editor) {
                            editor.on('init', function () {                            
                            });
                        },
                        }}
                        onEditorChange={handleDescripcionChange}
                    />
                </div>                
                <button onClick={handleStoreEjercicio} className='btn btn-success'>Agregar</button>
            </form>
        </div>
    )
}
export default AgregarEjercicio;