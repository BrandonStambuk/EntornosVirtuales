import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import Navbar from './Navbar';
import MostrarEjercicios from './components/MostrarEjercicios';
import AgregarEjercicio from './components/AgregarEjercicio';
import Homepage from './components/HomePage';
import HacerEjercicios from './components/HacerEjercicio';
import Navbar from './components/Navbar';
import Ejercicio from './components/Ejercicio';
import RegistrarAlumno from './components/RegistroAlumno';
import InicioSesion from './components/InicioSesion';
import AlumnoStats from './components/AlumnoStats';
import HacerEjercicioNoBackSpace from './components/HacerEjercicioNoBackSpace';
//import'./css/App.css';
const App = () => {
  const userData = JSON.parse(localStorage.getItem('is_profesor'));

  const ProfesorProtectedRoute = ({ children }) => {
    if (userData) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  const StudentProtectedRoute = ({ children }) => {
    if (!userData) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <div>
      <BrowserRouter>
       <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/agregar' element={<ProfesorProtectedRoute><AgregarEjercicio /></ProfesorProtectedRoute>} />
          <Route path='/mostrar' element={<StudentProtectedRoute><MostrarEjercicios /></StudentProtectedRoute>} />
          <Route path='/mostrar/:id' element={<StudentProtectedRoute><HacerEjercicios /></StudentProtectedRoute>} />
          <Route path='/mostrar-NoBackspace/:id' element={<StudentProtectedRoute><HacerEjercicioNoBackSpace /></StudentProtectedRoute>} />
          <Route path='/registrar-alumno'element={<ProfesorProtectedRoute><RegistrarAlumno/></ProfesorProtectedRoute>} />
          <Route path='/inicio-sesion' element={<InicioSesion/>}/>
          <Route path='/stats' element={<AlumnoStats/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
