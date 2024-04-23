import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { URL_API } from './const';
import { useNavigate, useParams } from 'react-router-dom';

const endpoint = URL_API;

const Character = ({ actual, expected }) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

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
  const typedCharacters = userInput.split("");

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
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState(0);
  const totalTyped = useRef(0);
  const { id } = useParams();

  const isKeyboardCodeAllowed = (code) => {
    return (
      code.startsWith("Key") ||
      code.startsWith("Digit") ||
      code === "Backspace" ||
      code === "Space"
    );
  };

  const countErrors = (actual, expected) => {
    const expectedCharacters = expected.split("");

    return expectedCharacters.reduce((errors, expectedChar, i) => {
      const actualChar = actual[i];
      if (actualChar !== expectedChar) {
        errors++;
      }
      return errors;
    }, 0);
  };

  const calculateAccuracyPercentage = (errors, total) => {
    if (total > 0) {
      const corrects = total - errors;
      return (corrects / total) * 100;
    }

    return 0;
  };

  const formatPercentage = (percentage) => {
    return percentage.toFixed(0) + "%";
  };

  useEffect(() => {
    const keydownHandler = ({ key, code }) => {
      if (!isKeyboardCodeAllowed(code)) {
        return;
      }

      switch (key) {
        case "Backspace":
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

    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  useEffect(() => {
    getEjercicio();
  }, []);

  const getEjercicio = async () => {
    const response = await axios.get(`${endpoint}/ejercicios/${id}`);
    setTipo(response.data.tipo);
    setNombre(response.data.nombre);
    setCodigo(response.data.codigo);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = response.data.codigo;
    const plainText = tempDiv.innerText;

    setCodigo2(plainText);
  };

  const handleComenzar = () => {
    totalTyped.current = 0;
    setTyped("");
    setCursor(0);
  };

  return (
    <div className="container mt-5">
      <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleComenzar}>Comenzar</button>
      </div>
      <h1 className="text-center">{nombre}</h1>
      <h2 className="text-center">{tipo}</h2>
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          
          <div className="card">
            <div className="card-body">
              <div className="event-info-container">
                <p className="event-info-text left">
                  <strong>Codigo:</strong>
                </p>
                <div className="relative leading-relaxed break-all">          
                  <div dangerouslySetInnerHTML={{ __html: codigo }} />
                  <div className="absolute inset-0 d-flex align-items-center justify-content-center">
                    <UserTypings userInput={typed} words={codigo2} />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HacerEjercicio;
