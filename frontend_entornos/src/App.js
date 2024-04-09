import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Timer from './Timer';
import QuoteDisplay from './QuoteDisplay';
import QuoteInput from './QuoteInput';
import './App.css';
const App = () => {
  return (
    <div>
      <Timer />
      <div className="container">
        <QuoteDisplay quote="quote" />
        <QuoteInput />
      </div>
    </div>
  );
}

export default App;