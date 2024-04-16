import React from 'react';
import Timer from './Timer';
import QuoteDisplay from './QuoteDisplay';
import QuoteInput from './QuoteInput';

const Ejercicio = () => {
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

export default Ejercicio;
