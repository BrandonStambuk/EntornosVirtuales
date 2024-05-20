import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Navbar from './Navbar';
import MostrarEjercicios from './components/MostrarEjercicios';
import AgregarEjercicio from './components/AgregarEjercicio';
import Homepage from './components/HomePage';
import HacerEjercicios from './components/HacerEjercicio';
import Navbar from './components/Navbar';
import Ejercicio from './components/Ejercicio';
import AgregarEjercicio2 from './components/AgregarEjercicio2';
import RegistrarAlumno from './components/RegistroAlumno';
import InicioSesion from './components/InicioSesion';
import AlumnoStats from './components/AlumnoStats';
import HacerEjercicioNoBackSpace from './components/HacerEjercicioNoBackSpace';
//import'./css/App.css';
const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/agregar' element={<AgregarEjercicio />} />
          <Route path='/agregar2' element={<AgregarEjercicio2 />} />
          <Route path='/mostrar' element={<MostrarEjercicios />} />
          <Route path='/mostrar/:id' element={<HacerEjercicios />} />
          <Route path='/mostrar-NoBackspace/:id' element={<HacerEjercicioNoBackSpace />} />
          <Route path='/ejercicio' element={<Ejercicio/>} />
          <Route path='/registrar-alumno'element={<RegistrarAlumno/>}/>
          <Route path='/inicio-sesion' element={<InicioSesion/>}/>
          <Route path='/stats' element={<AlumnoStats/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
