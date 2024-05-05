import React, { useState, useEffect } from 'react';
import '../css/Timer.css';

const Timer = ({ startTimer }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;
    if (startTimer) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    // Limpieza del intervalo cuando el componente se desmonta o startTimer se vuelve false
    return () => clearInterval(intervalId);
  }, [startTimer]);

  const formatTime = (time) => {
    // Añadir un cero delante si el número es menor que 10 para mantener el formato MM:SS
    return time < 10 ? `0${time}` : time;
  };

  // Calcular minutos y segundos
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Formatear y mostrar el tiempo en MM:SS
  return (
    <div className="timer-container">
      <div className="timer">
        {formatTime(minutes)}:{formatTime(remainingSeconds)}
      </div>
    </div>
  );
};

export default Timer;