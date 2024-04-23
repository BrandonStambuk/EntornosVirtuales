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
          <Route path='/ejercicio' element={<Ejercicio/>} />
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
