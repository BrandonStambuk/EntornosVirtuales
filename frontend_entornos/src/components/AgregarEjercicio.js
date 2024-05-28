import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios'
import { URL_API } from "./const";
import Swal from 'sweetalert2'; 
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
        setCodigo(codigo);
    }

    const handleStoreEjercicio = async (e) => {
        e.preventDefault();


        try{
            await axios.post(`${endpoint}/crearEjercicio`, {
                nombre: nombre,
                tipo: tipo,
                codigo: codigo          
            });
            Swal.fire({
                title: 'Registro Exitoso',
                text: 'Se agrego el ejercicio correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/mostrarEjercicio'; 
                }
            });
        }catch(error){

        }
        
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
                    <Editor
                        apiKey="et3kv22txmedmy751hwdgrmywr1k93evr5t5in9vmjh0mze8"
                        id="descripcion"
                        name="descripcion"
                        value={codigo}
                        init={{
                        directionality: 'ltr',
                        setup: function (editor) {
                            editor.on('init', function () {
                                editor.on('keydown', function (e) {
                                    if (e.keyCode === 9) {
                                        e.preventDefault();
                                        
                                        const selection = editor.selection.getRng();
                                        const startOffset = selection.startOffset;
                                        const endOffset = selection.endOffset;
                                        if (startOffset !== endOffset) {
                                            const selectedText = editor.selection.getContent();
                                            const indentedText = selectedText.replace(/^/gm, '\t');
                                            editor.selection.setContent(indentedText);
                                        } else {
                                            editor.insertContent('\t');
                                        }
                                    }
                                });
                            });
                        },
                    }}
                    onEditorChange={handleCodigoChange}
                    />
                </div>                
                <button onClick={handleStoreEjercicio} className='btn btn-success'>Agregar</button>
            </form>
        </div>
    )
}
export default AgregarEjercicio;