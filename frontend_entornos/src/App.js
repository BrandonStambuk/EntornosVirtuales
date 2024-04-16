import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Timer from './Timer';
import QuoteDisplay from './QuoteDisplay';
import QuoteInput from './QuoteInput';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgregarEjercicio from './AgregarEjercicio';
import Homepage from './HomePage';
import Ejercicio from './Ejercicio';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/agregar' element={ <AgregarEjercicio/>} />
        <Route path='/' element={ <Homepage/>} />
        <Route path='/ejercicio' element={ <Ejercicio/>} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;