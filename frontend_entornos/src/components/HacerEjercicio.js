import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { URL_API } from './const';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from './Timer';
const endpoint = URL_API;
let mistake = false;
let totalMistakes = 0;

const Character = ({ actual, expected }) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === ' ';
  if (isCorrect) {
    mistake = false;
  } else {
    mistake = true;
  }
  const textStyle = {
    color: isCorrect && !isWhiteSpace ? '#3B82F6' : '#EF4444',
    backgroundColor: !isCorrect && isWhiteSpace ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
  };

  return (
    <span style={textStyle}>
      {expected}
    </span>
  );
};

const UserTypings = ({ userInput, words }) => {
  const typedCharacters = userInput.split('');

  return (
    <div>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
        />
      ))}
    </div>
  );
};

const HacerEjercicio = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigo2, setCodigo2] = useState('');
  const [typed, setTyped] = useState('');
  const [cursor, setCursor] = useState(0);
  const [keyEvents, setKeyEvents] = useState([]);
  const [mistakes, setMistakes]=useState(0);  
  const [startTimer, setStartTimer] = useState(false);
  const totalTyped = useRef(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const isKeyboardCodeAllowed = (code) => {
    if (code === 'Shift' || code === 'CapsLock' || code === 'Control' || code === 'Alt') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const keydownHandler = ({ key, code }) => {
      if (isKeyboardCodeAllowed(key)) {
        return;
      }
      if (!startTimer) {
        setStartTimer(true);
      }
      const event = {
        key,
        time: new Date().getTime(), 
      };
    
      setKeyEvents((prevEvents) => [...prevEvents, event]);

      if (mistake && key === 'Backspace') {
        setTyped((prev) => prev.slice(0, -1));
        setCursor((cursor) => cursor - 1);
        totalTyped.current -= 1;
        totalMistakes += 1;
        setMistakes(totalMistakes);
        return;
      }

      if (mistake) {
        return;
      }

      switch (key) {
        case 'Backspace':
          setTyped((prev) => prev.slice(0, -1));
          setCursor((cursor) => cursor - 1);
          totalTyped.current -= 1;
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setCursor((cursor) => cursor + 1);
          totalTyped.current += 1;
      }
    };

    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [mistake, startTimer]);

  useEffect(() => {
    if (typed.length > 0 && typed.length === codigo2.length) {
      const stats = keyEvents.map(event => ({
        key: event.key,
        time: event.time
      }));

      const alumnoId = localStorage.getItem('alumnoData');
      console.log("alumnoData:", alumnoId);
      if (alumnoId) {
        updateAlumnoStats(alumnoId, stats);
      }
    }
  }, [typed, codigo2, keyEvents]);

  useEffect(() => {
    getEjercicio();
  }, []);

  const updateAlumnoStats = async (alumnoId, stats) => {
    try {
      const alumnoData = JSON.parse(alumnoId); // Convertir la cadena JSON a un objeto JavaScript
      const { id } = alumnoData; // Extraer el ID del objeto alumnoData
      await axios.put(`${endpoint}/alumnosStats/${id}`, {
      stats: JSON.stringify(stats)
      });
      navigate('/mostrar');
    } catch (error) {
      console.error("Error al actualizar stats del alumno:", error);
    }
  };

  const getEjercicio = async () => {
    const response = await axios.get(`${endpoint}/ejercicios/${id}`);
    setTipo(response.data.tipo);
    setNombre(response.data.nombre);
    setCodigo(response.data.codigo);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = response.data.codigo;

    tempDiv.querySelectorAll('*').forEach(node => node.removeAttribute('style'));
    tempDiv.querySelectorAll('*').forEach(node => node.removeAttribute('class'));

    const plainText = tempDiv.innerText;

    setCodigo2(plainText);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{nombre}:  {tipo}</h1>
      <Timer startTimer={startTimer}></Timer>
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="event-info-container">
                <p className="event-info-text left">
                  <strong>Codigo:</strong>
                </p>
                <div>
                  <div style={{ position: 'relative' }}>
                    <div dangerouslySetInnerHTML={{ __html: codigo }} className="text-monospace fs-4" />
                    <div style={{ position: 'absolute', top: 0, left: 0 }} className="text-monospace fs-4">
                      <UserTypings userInput={typed} words={codigo2} />
                    </div>
                  </div>
                </div>
                <div className="text-danger mt-3">Errores: {mistakes}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HacerEjercicio;
