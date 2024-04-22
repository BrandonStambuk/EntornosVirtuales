import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Navbar from './Navbar';
import MostrarEjercicios from './Components/MostrarEjercicios';
import AgregarEjercicio from './Components/AgregarEjercicio';
import Homepage from './Components/HomePage';
import HacerEjercicios from './Components/HacerEjercicio';
import Navbar from './Components/Navbar';
import Ejercicio from './Components/Ejercicio';
//import'./css/App.css';
const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/agregar' element={<AgregarEjercicio />} />
          <Route path='/mostrar' element={<MostrarEjercicios />} />
          <Route path='/mostrar/:id' element={<HacerEjercicios />} />
          <Route path='/ejercicio' element={<Ejercicio/>} />
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
