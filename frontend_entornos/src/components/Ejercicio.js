import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Timer from './Timer';
import QuoteDisplay from '../Components/QuoteDisplay';
import QuoteInput from '../Components/QuoteInput';
import axios from 'axios';
import { URL_API } from './const';
import '../css/App.css';
const Ejercicio = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [codigo, setCodigo] = useState('');
  const { id } = useParams();
  const endpoint = URL_API;

  useEffect(() => {
    const getEjercicio = async () => {
      try {
        const responseId = await axios.get(`${endpoint}/ejercicio-aleatorio`);
        const idEjercicio = responseId.data;

        const response = await axios.get(`${endpoint}/ejercicios/${idEjercicio}`);
        setTipo(response.data.tipo);
        setNombre(response.data.nombre);

        // Convierte el HTML a texto
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(response.data.codigo, 'text/html');
        const texto = htmlDoc.body.textContent;
        setCodigo(texto);
      } catch (error) {
        console.error('Error al obtener el ejercicio:', error);
      }
    };

    getEjercicio();
  }, []);

  return (
    <div>
      <Timer />
      <div className="container">
        <QuoteDisplay quote={codigo} />
        <QuoteInput />
      </div>
    </div>
  );
}

export default Ejercicio;
