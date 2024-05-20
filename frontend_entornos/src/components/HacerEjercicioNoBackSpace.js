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

const HacerEjercicioNoBackSpace = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigo2, setCodigo2] = useState('');
  const [typed, setTyped] = useState('');
  const [cursor, setCursor] = useState(0);
  const [keyEvents, setKeyEvents] = useState([]);
  const [mistakes, setMistakes]=useState(0);  
  const [startTimer, setStartTimer] = useState(false);
  const [alumnoStats, setAlumnoStats] = useState({});
  const [statsAlumnoError, setStatsAlumnoError] = useState({});
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

      if (mistake && key === 'Backspace') {
        setTyped((prev) => prev.slice(0, -1));
        setCursor((cursor) => cursor - 1);
        totalTyped.current -= 1;
        totalMistakes += 1;
        setMistakes(totalMistakes);
        setKeyEvents((prevEvents) => prevEvents.slice(0, -1));
        return;
      }

      if (mistake) {
        
        return;
      }
      const event = {
        key,
        time: new Date().getTime(), 
      };
    
      setKeyEvents((prevEvents) => [...prevEvents, event]);

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
      const stats = [];
      const keyStats = {};
  
      for (let i = 1; i < keyEvents.length; i++) {
        const event = keyEvents[i];
        const lastEvent = keyEvents[i - 1];
        const timeDifference = event.time - lastEvent.time;
        const key = event.key;
  
        if (keyStats.hasOwnProperty(key)) {
          keyStats[key].count++;
          keyStats[key].total += timeDifference;
        } else {
          keyStats[key] = { count: 1, total: timeDifference };
        }
  
        const statsIndex = stats.findIndex(stat => stat.key === key);
  
        if (statsIndex !== -1) {
          stats[statsIndex] = {
            ...stats[statsIndex],
            occurrences: keyStats[key].count,
            total:keyStats[key].total,
            average:keyStats[key].total / keyStats[key].count,
          };
        } else {
          stats.push({
            key,
            occurrences: keyStats[key].count,
            total:keyStats[key].total,
            average:keyStats[key].total / keyStats[key].count,
          });
        }        
      }
      console.log("alumnoStats", alumnoStats);
      if (alumnoStats) {
        const alumnoStatsObject = typeof alumnoStats === 'object' ? alumnoStats : JSON.parse(alumnoStats);

        console.log("alumnoStatsObject", alumnoStatsObject);
        for (let j = 0; j < alumnoStatsObject.length; j++) {
        const primeraEntrada = alumnoStatsObject[j];
        const clave = primeraEntrada.key;
        console.log(clave);
          const statIndex = stats.findIndex(stat => stat.key === clave);
          
          console.log("key", clave);
          console.log("statIndex", statIndex);
          if (statIndex !== -1) {
            const { occurrences, total } = alumnoStatsObject[j];
            stats[statIndex] = {
              ...stats[statIndex],
              occurrences: stats[statIndex].occurrences + occurrences,
              total: stats[statIndex].total + total,
              average: (stats[statIndex].total + total) / (stats[statIndex].occurrences + occurrences),
            };
            console.log("stats[statIndex]", stats[statIndex]);
          }
        }
      }
      const statsError=[];
      statsError.push({
        errors:mistakes,
        totalTyped:totalTyped.current,
        accuracy:((totalTyped.current-mistakes)/totalTyped.current)*100
      });
      if(statsAlumnoError){
        const statsErrorObject = typeof statsAlumnoError === 'object' ? statsAlumnoError : JSON.parse(statsAlumnoError);
        console.log("statsErrorObject", statsErrorObject);
        const entrada = statsErrorObject[0];
        statsError[0]={
          errors:statsError[0].errors+entrada.errors,
          totalTyped:statsError[0].totalTyped+entrada.totalTyped,
          accuracy:((statsError[0].totalTyped-entrada.errors)/statsError[0].totalTyped)*100
        }
      };
      console.log("statsError", statsError);
      console.log("stats", stats);

      const alumnoId = localStorage.getItem('alumnoData');
      console.log("alumnoData:", alumnoId);
      if (alumnoId) {
        updateAlumnoStats(alumnoId, stats,statsError);
      }
    }
  }, [typed, codigo2, keyEvents]);

  useEffect(() => {
    getEjercicio();
    getAlumnoStats();
  }, []);

  const getAlumnoStats = async () => {
    try {
      const alumnoId = localStorage.getItem('alumnoData');
      console.log("alumnoData:", alumnoId);
      if (alumnoId) {
        const alumnoData = JSON.parse(alumnoId);
        const { id } = alumnoData;
        const response = await axios.get(`${endpoint}/alumnosShow/${id}`);
        const statsData = response.data.stats;
        const errorsData = response.data.errors;
        if (statsData !== null) {
          setAlumnoStats(statsData);
        } else {
          setAlumnoStats({});
        }
        if (errorsData !== null) {
          setStatsAlumnoError(errorsData);
        } else {
          setStatsAlumnoError({});
        }        
      }
    } catch (error) {
      console.error("Error al obtener stats del alumno:", error);
    }
  };

  const updateAlumnoStats = async (alumnoId, stats,statsError) => {
    try {
      const alumnoData = JSON.parse(alumnoId);
      const { id } = alumnoData;
      console.log("stats", stats);
      await axios.put(`${endpoint}/alumnosStats/${id}`, {
      stats: JSON.stringify(stats),
      errors: JSON.stringify(statsError)
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

export default HacerEjercicioNoBackSpace;
