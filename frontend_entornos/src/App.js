import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MostrarEjercicios from './components/MostrarEjercicios';
import AgregarEjercicio from './components/AgregarEjercicio';
import Homepage from './components/HomePage';
import HacerEjercicios from './components/HacerEjercicio';
import Ejercicio from './components/Ejercicio';
import RegistrarAlumno from './components/RegistroAlumno';
import InicioSesion from './components/InicioSesion';
import AlumnoStats from './components/AlumnoStats';
import HacerEjercicioNoBackSpace from './components/HacerEjercicioNoBackSpace';
import MostrarEjerciciosProfesor from './components/MostrarEjerciciosProfesor';
import HacerEjerciciosProfesor from './components/HacerEjercicioProfesor';

const App = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')));
  }, []);

  const ProfesorProtectedRoute = ({ children }) => {
    if (userData.is_profesor) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  const StudentProtectedRoute = ({ children }) => {
    if (!userData.is_profesor) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/agregar' element={<ProfesorProtectedRoute><AgregarEjercicio /></ProfesorProtectedRoute>} />
          <Route path='/mostrar' element={<StudentProtectedRoute><MostrarEjercicios /></StudentProtectedRoute>} />
          <Route path='/mostrar/:id' element={<StudentProtectedRoute><HacerEjercicios /></StudentProtectedRoute>} />
          <Route path='/mostrar-NoBackspace/:id' element={<StudentProtectedRoute><HacerEjercicioNoBackSpace /></StudentProtectedRoute>} />
          <Route path='/registrar-alumno' element={<ProfesorProtectedRoute><RegistrarAlumno /></ProfesorProtectedRoute>} />
          <Route path='/inicio-sesion' element={<InicioSesion />} />
          <Route path='/stats' element={<AlumnoStats />} />
          <Route path='/mostrarEjercicio' element={<MostrarEjerciciosProfesor />} />
          <Route path='/mostrarEjercicio/:id' element={<HacerEjerciciosProfesor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
