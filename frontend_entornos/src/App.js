import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Timer from './Timer';
import QuoteDisplay from './QuoteDisplay';
import QuoteInput from './QuoteInput';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MostrarEjercicios from './MostrarEjercicios';
import AgregarEjercicio from './AgregarEjercicio';
import HacerEjercicios from './HacerEjercicio';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/agregar' element={ <AgregarEjercicio/>} />
        <Route path='/mostrar' element={ <MostrarEjercicios/>} />
        <Route path='/mostrar/:id' element={ <HacerEjercicios/>} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;